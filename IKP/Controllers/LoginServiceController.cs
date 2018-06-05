using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IKP.Logging;
using IKP.Database;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IKP.Controllers
{
    [Produces("application/json")]
    [Route("api/LoginService")]
    public class LoginServiceController : Controller
    {
        private Logger _loginServiceLogger = new Logger("LoginService", "logs");

        [HttpGet("[action]")]
        public JArray Login(string company, string login, string password)
        {
            try
            {
                _loginServiceLogger.Log($"Login attempt: company={company} login={login} password={password}");
                DataSet ds = MySQLBridge.Login(company, login, password);
                if (ds != null)
                {
                    _loginServiceLogger.Log($"Login successful");
                    return JArray.FromObject(ds.Tables[0]);
                }
                else
                {
                    _loginServiceLogger.Log("Login failed");
                    return new JArray();
                }
            }
            catch(Exception ex)
            {
                _loginServiceLogger.Log($"Login exception: {ex}");
                return new JArray();
            }
        }
    }
}