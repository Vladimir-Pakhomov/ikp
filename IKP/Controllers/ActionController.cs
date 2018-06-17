using System;
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
                _actionLogger.Log($"AddVideoAsDescendant exception: {ex}");
                result.Add("error", (int)ActionErrorCode.Other);
            }
            return result;
        }
    }
}