using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using IKP.Logging;

namespace IKP.Controllers
{
    [Produces("application/json")]
    [Route("api/FileService")]
    public class FileServiceController : Controller
    {
        private Logger _fileServiceLogger = new Logger("FileService", "logs");

        [HttpPost("[action]")]
        public JObject Upload(string company)
        {
            var result = new JObject();
            try
            {
                var uploadedFiles = HttpContext.Request.Body as IFormFileCollection;
                _fileServiceLogger.Log($"Upload: company={company}, file={uploadedFiles}");
                if (!Directory.Exists("assets"))
                    Directory.CreateDirectory("assets");
                if (!Directory.Exists("assets/" + company))
                    Directory.CreateDirectory("assets/" + company);
                string name = Guid.NewGuid().ToString();
                string path = $"assets/{company}/{name}";
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    uploadedFiles[0].CopyTo(fileStream);
                }
                _fileServiceLogger.Log($"Upload result: {path}");
                result.Add("imagerSrc", path);
            }
            catch(Exception ex)
            {
                _fileServiceLogger.Log($"Upload Exception: {ex}");
                result.Add("error", 30);
            }
            return result;
        }
    }
}