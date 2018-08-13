using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using IKP.Database;
using IKP.Logging;

namespace IKP.Controllers
{
    [Produces("application/json")]
    [Route("api/AdminService")]
    public class AdminServiceController : Controller
    {
        private Logger _adminServiceLogger = new Logger("AdminService", "logs");

        private JArray GetData(Func<string, DataSet> action, string company)
        {
            try
            {
                DataSet ds = action(company);
                if (ds != null)
                    return JArray.FromObject(ds.Tables[0]);
                else return new JArray();
            }
            catch (Exception ex)
            {
                _adminServiceLogger.Log($"GetData exception: {ex}");
                return new JArray();
            }
        }

        private JArray GetDataByCondition(Func<string, string, DataSet> action, string company, string condition)
        {
            try
            {
                DataSet ds = action(company, condition);
                if (ds != null)
                    return JArray.FromObject(ds.Tables[0]);
                else return new JArray();
            }
            catch (Exception ex)
            {
                _adminServiceLogger.Log($"GetDataByCondition exception: {ex}");
                return new JArray();
            }
        }

        private void UseResolver(JArray source, string shortProperty, string detailedProperty, Func<string, string, DataSet> resolver, string company)
        {
            try
            {
                foreach (JObject token in source)
                {
                    JObject resolved = JArray.FromObject(resolver(company, token[shortProperty].ToString()).Tables[0])[0] as JObject;
                    token.Add(detailedProperty, resolved);
                }
            }
            catch (Exception ex)
            {
                _adminServiceLogger.Log($"UseResolver exception: {ex}");
            }
        }

        [HttpGet("[action]")]
        public JArray LicenseKeys(string company)
        {
            return GetData(MySQLBridge.GetLicenseKeys, company);
        }

        [HttpGet("[action]")]
        public JArray Admins(string company)
        {
            return GetData(MySQLBridge.GetAdmins, company);
        }


        [HttpGet("[action]")]
        public JArray Stuff(string company)
        {
            return GetData(MySQLBridge.GetStuff, company);
        }


        [HttpGet("[action]")]
        public JArray Students(string company)
        {
            JArray temp = GetData(MySQLBridge.GetStudents, company);
            UseResolver(temp, "IDGroup", "Group", MySQLBridge.GetGroupByID, company);
            return temp;
        }

        [HttpGet("[action]")]
        public JArray Groups(string company, string lead_id)
        {
            if (!string.IsNullOrEmpty(lead_id))
            {
                return GetDataByCondition(MySQLBridge.GetMyGroups, company, $"IDLead = {lead_id}");
            }
            else
            {
                JArray temp = GetData(MySQLBridge.GetGroups, company);
                UseResolver(temp, "IDLead", "Lead", MySQLBridge.GetStuffByID, company);
                return temp;
            }
        }

        [HttpGet("[action]")]
        public JArray History(string company, string from, string to)
        {
            return GetData(MySQLBridge.GetHistory, company);
        }

        [HttpGet("[action]")]
        public JArray Results(string company, string stud_id)
        {
            JArray temp = !string.IsNullOrEmpty(stud_id) 
                ? GetDataByCondition(MySQLBridge.GetMyResults, company, $"IDUser = {stud_id}")
                : GetData(MySQLBridge.GetResults, company);
            UseResolver(temp, "IDProgram", "Program", MySQLBridge.GetProgramByID, company);
            UseResolver(temp, "IDBlock", "Block", MySQLBridge.GetBlockByID, company);
            UseResolver(temp, "IDUser", "User", MySQLBridge.GetUserByID, company);
            return temp;
        }

        [HttpGet("[action]")]
        public JArray AllResults(string company, string lead_id)
        {
            JArray temp = GetDataByCondition(MySQLBridge.GetMyResults, company, $"IDUser in (select ID from `Students` where (IDGroup in (select ID from `Groups` where IDLead = {lead_id}))");
            UseResolver(temp, "IDProgram", "Program", MySQLBridge.GetProgramByID, company);
            UseResolver(temp, "IDBlock", "Block", MySQLBridge.GetBlockByID, company);
            UseResolver(temp, "IDUser", "User", MySQLBridge.GetUserByID, company);
            return temp;
        }

        [HttpGet("[action]")]
        public JArray MyStudents(string company, string lead_id)
        {
            JArray temp = GetDataByCondition(MySQLBridge.GetStudentsConditional, company, $"IDGroup in (select ID from `Groups` where IDLead = {lead_id})");
            UseResolver(temp, "IDGroup", "Group", MySQLBridge.GetGroupByID, company);
            return temp;
        }

        [HttpGet("[action]")]
        public JArray Programs(string company)
        {
            JArray temp = GetData(MySQLBridge.GetPrograms, company);
            UseResolver(temp, "IDLicenseKey", "LicenseKey", MySQLBridge.GetLicenseKeyByID, company);
            return temp;
        }

        [HttpGet("[action]")]
        public JArray Descendants(string id, string parentType, string type, string company)
        {
            try
            {
                DataSet ds = MySQLBridge.GetDescendants(id, parentType, type, company);
                if (ds != null)
                    return JArray.FromObject(ds.Tables[0]);
                else return new JArray();
            }
            catch (Exception ex)
            {
                _adminServiceLogger.Log($"GetDescendants exception: {ex}");
                return new JArray();
            }
        }

        [HttpGet("[action]")]
        public JArray BlockData(string id, string blockType, string company)
        {
            try
            {
                DataSet ds1 = MySQLBridge.GetDescendants(id, blockType, "2", company);
                JArray result = JArray.FromObject(ds1.Tables[0]);
                foreach(JObject exersize in result)
                {
                    DataSet ds2 = MySQLBridge.GetDescendants(exersize["ID"].ToString(), "2", "3", company);
                    JArray questions = JArray.FromObject(ds2.Tables[0]);
                    foreach(JObject question in questions)
                    {
                        DataSet ds3 = MySQLBridge.GetDescendants(question["ID"].ToString(), "3", "4", company);
                        JArray resolvers = JArray.FromObject(ds3.Tables[0]);
                        foreach(JObject resolver in resolvers)
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
                    foreach(JObject conclusion in conclusions)
                    {
                        DataSet ds6 = MySQLBridge.GetDescendants(conclusion["ID"].ToString(), "6", "7", company);
                        JArray conclusionItems = JArray.FromObject(ds6.Tables[0]);
                        HandleRecursiveDescendants(conclusionItems, "7", "ConclusionItems", company);
                        conclusion.Add("ConclusionItems", conclusionItems);
                    }
                    exersize.Add("Conclusions", conclusions);
                }
                return result;
            }
            catch (Exception ex)
            {
                _adminServiceLogger.Log($"GetBlockData exception: {ex}");
                return new JArray();
            }
        }

        public static void HandleRecursiveDescendants(JArray source, string type, string propertyName, string company)
        {
            foreach (JObject descendant in source)
            {
                DataSet ds = MySQLBridge.GetDescendants(descendant["ID"].ToString(), type, type, company);
                JArray next = JArray.FromObject(ds.Tables[0]);
                descendant.Add(propertyName, next);
                HandleRecursiveDescendants(descendant[propertyName] as JArray, type, propertyName, company);
            }
        }
    }
}