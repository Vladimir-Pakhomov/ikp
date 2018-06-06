﻿using System;
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
            return !string.IsNullOrEmpty(stud_id) 
                ? GetDataByCondition(MySQLBridge.GetMyResults, company, $"IDStudent = {stud_id}")
                : GetData(MySQLBridge.GetResults, company);
        }

        [HttpGet("[action]")]
        public JArray Programs(string company)
        {
            return GetData(MySQLBridge.GetPrograms, company);
        }
    }
}