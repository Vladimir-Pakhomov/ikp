using System;
using System.Data;
using System.IO;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using MenuTreeComponent;
using IKP.Logging;

namespace IKP.Controllers
{
    [Produces("application/json")]
    [Route("api/FileService")]
    public class FileServiceController : Controller
    {
        private Logger _fileServiceLogger = new Logger("FileService", "logs");

        [HttpPost("[action]")]
        public void UploadFile(IFormFile uploadedFile, string folder, string company)
        {
            try
            {
                if (uploadedFile != null)
                {
                    string ext = uploadedFile.FileName.Substring(uploadedFile.FileName.LastIndexOf('.'));
                    string fileName = folder == "videos" ? Guid.NewGuid().ToString() + ext : uploadedFile.FileName;
                    string path = $"assets/{company}/{folder}/{fileName}";
                    _fileServiceLogger.Log($"Uploading file {path}");
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        uploadedFile.CopyTo(fileStream);
                    }
                }
                else
                {
                    _fileServiceLogger.Log($"Uploading file: uploadedFile is null");
                }
            }
            catch(Exception ex)
            {
                _fileServiceLogger.Log($"UploadFile Exception: {ex}");
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetFile(string link, string folder, string company)
        {
            try
            {
                byte[] buffer = System.IO.File.ReadAllBytes($"assets/{company}/{folder}/{link}");
                var content = new MemoryStream(buffer);
                var contentType = "APPLICATION/octet-stream";
                return File(content, contentType, link);
            }
            catch (Exception ex)
            {
                _fileServiceLogger.Log($"GetFile Exception: {ex}");
                return null;
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetSwfFile(string link, string folder, string company)
        {
            try
            {
                Stream s = System.IO.File.OpenRead($"assets/{company}/{folder}/{link}");
                return File(s, "application/x-shockwave-flash");
            }
            catch (Exception ex)
            {
                _fileServiceLogger.Log($"GetSwfFile Exception: {ex}");
                return null;
            }
        }

        [HttpGet("[action]")]
        public JArray GetFiles(string folder, string company)
        {
            try
            {
                return JArray.FromObject(Directory.EnumerateFiles($"assets/{company}/{folder}")
                    .OrderByDescending(x => new FileInfo(x).LastWriteTime)
                    .Select(x => new FileInfo(x).Name));
            }
            catch (Exception ex)
            {
                _fileServiceLogger.Log($"GetFiles Exception: {ex}");
                return null;
            }
        }

        private void addBlocksRecurse(Node input, StringBuilder sb)
        {
            sb.AppendLine($"insert into `Blocks` (Name) values ('{input.Name}');");
            sb.AppendLine($"select @lastBlockParentID := max(ID) from `Blocks`;");
            if (input.ChildNodes != null)
            {
                foreach(var block in input.ChildNodes)
                {
                    if(block.ChildNodes != null)
                    {
                        sb.AppendLine($"insert into `Blocks` (Name) values ('{block.Name}');");
                        sb.AppendLine($"select @lastBlockChildID := max(ID) from `Blocks`;");
                        sb.AppendLine($"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values (@lastBlockParentID, 1, @lastBlockChildID, 1);");
                    }
                    addBlocksRecurse(block, sb);
                }
            }
            else return;
        }

        [HttpGet("[action]")]
        public JObject Import(string company)
        {
            JObject result = new JObject();
            StringBuilder sb = new StringBuilder();
            try
            {
                DataContractSerializer formatter = new DataContractSerializer(typeof(Project));
                Project project;
                using (FileStream fs = System.IO.File.OpenRead($"assets/{company}/import.cfg"))
                {
                    project = formatter.ReadObject(fs) as Project;
                }
                if(project != null)
                {
                    string path = $"assets/{company}/import.sql";
                    sb.AppendLine($"start transaction;");
                    /*
                    foreach(var program in project.Root.ChildNodes)
                    {
                        sb.AppendLine($"insert into `Programs`(Name, IDLicenseKey) values ('{program.Name}', 1);");
                        sb.AppendLine($"select @lastProgramID := max(ID) from `Programs`;");
                        foreach(var block in program.ChildNodes)
                        {
                            sb.AppendLine($"insert into `Blocks` (Name) values ('{block.Name}');");
                            sb.AppendLine($"select @lastBlockID := max(ID) from `Blocks`;");
                            sb.AppendLine($"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values (@lastProgramID, 0, @lastBlockID, 1);");
                            if (block.ChildNodes != null)
                            {
                                foreach (var childBlock in block.ChildNodes)
                                {
                                    addBlocksRecurse(childBlock, sb);
                                }
                            }
                        }
                    }
                    */
                    foreach(var exersize in project.Topics)
                    {
                        sb.AppendLine($"insert into `Exersizes`(Name, GeneralQuestion) values ('{exersize.Name}', '{exersize.GeneralQuestion}');");
                        sb.AppendLine($"select @lastExersizeID := max(ID) from `Exersizes`;");
                        foreach(var question in exersize.Questions)
                        {
                            sb.AppendLine($"insert into `Questions` (Content) values ('{question.Name}');");
                            sb.AppendLine($"select @lastQuestionID := max(ID) from `Questions`;");
                            sb.AppendLine($"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values (@lastExersizeID, 2, @lastQuestionID, 3);");
                            foreach(var resolver in question.Resolvers)
                            {
                                int resolverType = resolver is TextResolver ? 0 : 1;
                                string content = resolver is TextResolver ? (resolver as TextResolver).Content : Uri.UnescapeDataString((resolver as ImageResolver).ImageSrc);
                                sb.AppendLine($"insert into `Resolvers` (Type, Content) values ({resolverType}, '{content}');");
                                sb.AppendLine($"select @lastResolverID := max(ID) from `Resolvers`;");
                                sb.AppendLine($"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values (@lastQuestionID, 3, @lastResolverID, 4);");

                                Random r = new Random();
                                bool isFirstCorrect = r.Next(0, 2) == 1;
                                string content1 =
                                    resolver.VisualContent is SingleVideo ? (resolver.VisualContent as SingleVideo).Src :
                                    resolver.VisualContent is VideoPair ?
                                    isFirstCorrect ? (resolver.VisualContent as VideoPair).correctSrc : (resolver.VisualContent as VideoPair).incorrectSrc : string.Empty;

                                string content2 =
                                    resolver.VisualContent is SingleVideo ? string.Empty :
                                    resolver.VisualContent is VideoPair ?
                                    isFirstCorrect ? (resolver.VisualContent as VideoPair).incorrectSrc : (resolver.VisualContent as VideoPair).correctSrc : string.Empty;

                                int first = resolver.VisualContent is SingleVideo ? (resolver.VisualContent as SingleVideo).IsNormal ? 1 : 0
                                    : resolver.VisualContent is VideoPair ? isFirstCorrect ? 1 : 0 : 0;

                                sb.AppendLine($"insert into `Videos` (Content1, Content2, IsFirstCorrect, PlaybackType) values ('{content1}', '{content2}', {first}, 0);");
                                sb.AppendLine($"select @lastVideoID := max(ID) from `Videos`;");
                                sb.AppendLine($"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values (@lastResolverID, 4, @lastVideoID, 5);");
                            }
                        }
                    }
                    sb.AppendLine("commit;");
                    System.IO.File.WriteAllText(path, sb.ToString());
                }       
                result.Add("error", 0);
            }
            catch (Exception ex)
            {
                _fileServiceLogger.Log($"Import Exception: {ex}");
                result.Add("error", 30);
            }
            return result;
        }
    }
}