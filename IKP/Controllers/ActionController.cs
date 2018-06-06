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

    }
}