using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using IKP.Logging;
using IKP.Database;

namespace IKP.Controllers
{
    [Produces("application/json")]
    [Route("api/Action")]
    public class ActionController : Controller
    {
        private Logger _actionLogger = new Logger("Action", "logs");

        [HttpGet("[action]")]
        public JObject GenerateKey(string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.GenerateKey(company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"GenerateKey exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddGroup(string name, string lead_id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddGroup(company, name, lead_id);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddGroup exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditGroup(string name, string lead_id, string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditGroup(company, name, lead_id, id);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditGroup exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddProgram(string name, string idLicenseKey, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddProgram(company, name, idLicenseKey);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddProgram exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditProgram(string name, string lk_id, string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditProgram(company, name, lk_id, id);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditProgram exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddAdmin(string company, string fio, string login, string password, string isSA)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddAdmin(company, fio, login, password,
                    int.TryParse(isSA, out int is_sa) ? is_sa : 0);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddAdmin exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddStuff(string company, string fio, string login, string password, string position)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddStuff(company, fio, login, password, position);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddStuff exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddStudent(string company, string fio, string login, string password, string idGroup)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddStudent(company, fio, login, password, 
                    int.TryParse(idGroup, out int idg) ? idg : 0);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddStudent exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditUser(string id, string company, string fio, string login, string password)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditUser(id, company, fio, login, password);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditUser exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject DeleteUser(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.DeleteUser(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteUser exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AssignSA(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AssignSA(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AssignSA exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditPosition(string id, string company, string position)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditPosition(id, company, position);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditPosition exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditGroup(string id, string company, string idGroup)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditGroup(id, company, 
                    int.TryParse(idGroup, out int idg) ? idg : 0);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditGroup exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject DeleteGroup(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.DeleteGroup(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteGroup exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddBlockAsDescendant(string idParent, string parentType, string name, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddBlockAsDescendant(idParent, parentType, name, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddBlockAsDescendant exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditBlock(string name, string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditBlock(name, id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditBlock exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddExersizeAsDescendant(string idParent, string parentType, string name, string generalQuestion, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddExersizeAsDescendant(idParent, parentType, name, generalQuestion, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddExersizeAsDescendant exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditExersize(string name, string generalQuestion, string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditExersize(name, generalQuestion, id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditExersize exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddQuestionAsDescendant(string idParent, string parentType, string content, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddQuestionAsDescendant(idParent, parentType, content, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddQuestionAsDescendant exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditQuestion(string content, string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditQuestion(content, id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditQuestion exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddConclusionAsDescendant(string idParent, string parentType, string name, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddConclusionAsDescendant(idParent, parentType, name, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddConclusionAsDescendant exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditConclusion(string name, string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditConclusion(name, id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditConclusion exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddConclusionItemAsDescendant(string idParent, string parentType, string content, string isBranch, string isCorrect, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddConclusionItemAsDescendant(idParent, parentType, content, isBranch, isCorrect, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddConclusionItemAsDescendant exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditConclusionItem(string content, string isBranch, string isCorrect, string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditConclusionItem(content, isBranch, isCorrect, id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditConclusionItem exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject AddResolverAsDescendant(string idParent, string parentType, string type, string content, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddResolverAsDescendant(idParent, parentType, type, content, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddResolverAsDescendant exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditResolver(string type, string content, string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditResolver(type, content, id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditResolver exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }


        [HttpGet("[action]")]
        public JObject AddVideoAsDescendant(string idParent, string parentType, string content1, string content2, string isFirstCorrect, string playbackType, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.AddVideoAsDescendant(idParent, parentType, content1, content2, isFirstCorrect, playbackType, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"AddVideoAsDescendant exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject EditVideo(string content1, string content2, string isFirstCorrect, string playbackType, string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.EditVideo(content1, content2, isFirstCorrect, playbackType, id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"EditVideo exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject DeleteVideo(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.DeleteVideo(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteVideo exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        private void DeleteDescendants(string id, string type, string childrenType, string company, 
            Func<string, string, JObject> executor)
        {
            DataSet ds = MySQLBridge.GetDescendants(id, type, childrenType, company);
            JArray descendants = JArray.FromObject(ds.Tables[0]);
            foreach(JToken token in descendants)
            {
                executor(token["ID"].ToString(), company);
            }
        }

        [HttpGet("[action]")]
        public JObject DeleteConclusionItem(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                DeleteDescendants(id, "6", "6", company, DeleteConclusionItem);
                ActionErrorCode error = MySQLBridge.DeleteConclusionItem(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteConclusionItem exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject DeleteConclusion(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                DeleteDescendants(id, "5", "6", company, DeleteConclusionItem);
                ActionErrorCode error = MySQLBridge.DeleteConclusion(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteConclusion exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject DeleteResolver(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                DeleteDescendants(id, "4", "7", company, DeleteVideo);
                ActionErrorCode error = MySQLBridge.DeleteResolver(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteResolver exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject DeleteQuestion(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                DeleteDescendants(id, "3", "4", company, DeleteResolver);
                ActionErrorCode error = MySQLBridge.DeleteQuestion(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteQuestion exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject DeleteExersize(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                DeleteDescendants(id, "2", "3", company, DeleteQuestion);
                DeleteDescendants(id, "2", "5", company, DeleteConclusion);
                ActionErrorCode error = MySQLBridge.DeleteExersize(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteExersize exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject DeleteBlock(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                DeleteDescendants(id, "1", "1", company, DeleteBlock);
                DeleteDescendants(id, "1", "2", company, DeleteExersize);
                ActionErrorCode error = MySQLBridge.DeleteBlock(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteBlock exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject DeleteProgram(string id, string company)
        {
            JObject result = new JObject();
            try
            {
                DeleteDescendants(id, "0", "1", company, DeleteBlock);
                DeleteDescendants(id, "0", "2", company, DeleteExersize);
                ActionErrorCode error = MySQLBridge.DeleteProgram(id, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"DeleteProgram exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject SendResult(string start, string end, string idProgram, string idBlock, string idUser, string correctness, string rationality,
            string totalPercentage, string company)
        {
            JObject result = new JObject();
            try
            {
                ActionErrorCode error = MySQLBridge.SendResult(start, end, idProgram, idBlock, idUser, correctness, rationality,
                    totalPercentage, company);
                result.Add("error", (int)error);
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"SendResult exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }

        [HttpGet("[action]")]
        public JObject PasteExersize(string idtargetblock, string blocktype, string idsource, string company)
        {
            JObject result = new JObject();
            try
            {
                DataSet ds = MySQLBridge.GetExersizeByID(company, idsource);
                JObject exersize = JArray.FromObject(ds.Tables[0])[0] as JObject;
                DataSet ds2 = MySQLBridge.GetDescendants(exersize["ID"].ToString(), "2", "3", company);
                JArray questions = JArray.FromObject(ds2.Tables[0]);
                foreach (JObject question in questions)
                {
                    DataSet ds3 = MySQLBridge.GetDescendants(question["ID"].ToString(), "3", "4", company);
                    JArray resolvers = JArray.FromObject(ds3.Tables[0]);
                    foreach (JObject resolver in resolvers)
                    {
                        DataSet ds4 = MySQLBridge.GetDescendants(resolver["ID"].ToString(), "4", "5", company);
                        JArray videos = JArray.FromObject(ds4.Tables[0]);
                        resolver.Add("Videos", videos);
                    }
                    question.Add("Resolvers", resolvers);
                }
                exersize.Add("Questions", questions);
                DataSet ds5 = MySQLBridge.GetDescendants(exersize["ID"].ToString(), "2", "6", company);
                JArray conclusions = JArray.FromObject(ds5.Tables[0]);
                foreach (JObject conclusion in conclusions)
                {
                    DataSet ds6 = MySQLBridge.GetDescendants(conclusion["ID"].ToString(), "6", "7", company);
                    JArray conclusionItems = JArray.FromObject(ds6.Tables[0]);
                    AdminServiceController.HandleRecursiveDescendants(conclusionItems, "7", "ConclusionItems", company);
                    conclusion.Add("ConclusionItems", conclusionItems);
                }
                exersize.Add("Conclusions", conclusions);

                _actionLogger.Log($"Pasting exersize full data: targetBlock={idtargetblock}, blockType={blocktype}");
                ActionErrorCode error = MySQLBridge.PasteExersize(exersize, idtargetblock, blocktype, company);
                result.Add("error", (int)error);
                _actionLogger.Log($"Paste exersize result: {(int)error}");
            }
            catch (Exception ex)
            {
                _actionLogger.Log($"PasteExersize exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }
    }
}