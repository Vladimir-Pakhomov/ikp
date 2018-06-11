﻿using System;
using System.Data;
using MySql.Data.MySqlClient;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IKP.Logging;

namespace IKP.Database
{
    public enum ActionErrorCode { OK = 0, CompanyConnectionError = 1, Other = 99 };

    public static class MySQLBridge
    {
        private static Logger _dbLogger = new Logger("Database", "logs");

        private static MySqlConnection CreateConnection(string connectionString)
        {
            try
            {
                var conn = new MySqlConnection(connectionString);
                conn.Open();
                return conn;
            }
            catch(Exception ex)
            {
                _dbLogger.Log($"CreateConnection exception: {ex}");
                return null;
            }
        }

        private static MySqlConnection CreateConnectionByCompany(string company)
        {
            string connString = GetCompanyConnectionString(company);
            if (connString != null)
                return CreateConnection(GetCompanyConnectionString(company));
            else return null;
        }

        private static string GetCompanyConnectionString(string company)
        {
            try
            {
                string[] companiesData = File.ReadAllLines("companies.txt");
                foreach (string cd in companiesData)
                {
                    if (string.Equals(cd.Split("|")[0], company))
                    {
                        return cd.Split("|")[1];
                    }
                }
                _dbLogger.Log($"GetCompanyConnectionString: No database connection settings for company {company}");
                return null;
            }
            catch(Exception ex)
            {
                _dbLogger.Log($"GetCompanyConnectionString exception: {ex}");
                return null;
            }
        }

        public static DataSet Select(string tableName, string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from {tableName}", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    else return null;
                }
            }
            catch(Exception ex)
            {
                _dbLogger.Log($"Select exception: {ex}");
                return null;
            }
        }

        public static DataSet Login(string company, string login, string password)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from Users where IsDeleted = 0 and Login='{login}' and Password='{password}'", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"Login exception: {ex}");
                return null;
            }
        }

        public static DataSet GetLicenseKeys(string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from `Keys`", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetLicenseKeys exception: {ex}");
                return null;
            }
        }

        public static DataSet GetLicenseKeyByID(string company, string idLicenseKey)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from `Keys` where ID={idLicenseKey}", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetLicenseKeyByID exception: {ex}");
                return null;
            }
        }

        public static DataSet GetAdmins(string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select u.*, a.IsSA from (select * from Users where IsDeleted = 0) u inner join Admins a on u.ID = a.ID", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetAdmins exception: {ex}");
                return null;
            }
        }

        public static DataSet GetStuff(string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select u.*, s.Position from Stuff s inner join (select * from Users where IsDeleted = 0) u on u.ID = s.ID", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetStuff exception: {ex}");
                return null;
            }
        }

        public static DataSet GetStuffByID(string company, string idStuff)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select u.*, s.Position from (select * from Stuff where ID={idStuff}) s inner join select * from Users u on u.ID = s.ID", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetStuff exception: {ex}");
                return null;
            }
        }

        public static DataSet GetStudents(string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select u.*, s.IDGroup from Students s inner join (select * from Users where IsDeleted = 0) u on s.ID = u.ID", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetStudents exception: {ex}");
                return null;
            }
        }

        public static DataSet GetPrograms(string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from Programs", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetPrograms exception: {ex}");
                return null;
            }
        }

        public static DataSet GetGroups(string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from `Groups` where IsDeleted = 0", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetGroups exception: {ex}");
                return null;
            }
        }

        public static DataSet GetGroupByID(string company, string idGroup)
        {
            return GetMyGroups(company, $"ID = {idGroup}");
        }

        public static DataSet GetMyGroups(string company, string condition)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from `Groups` where {condition}", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetMyGroups exception: {ex}");
                return null;
            }
        }

        public static DataSet GetResults(string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from Results", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetResults exception: {ex}");
                return null;
            }
        }

        public static DataSet GetMyResults(string company, string condition)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from Results where {condition}", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetMyResults exception: {ex}");
                return null;
            }
        }

        public static DataSet GetHistory(string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from History", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetHistory exception: {ex}");
                return null;
            }
        }

        private static Dictionary<string, string> nodeTypes = new Dictionary<string, string>()
        {
            { "0", "Programs" },
            { "1", "Blocks" },
            { "2", "Exersizes" },
            { "3", "Questions" },
            { "4", "Resolvers" },
            { "5", "Videos" },
            { "6", "Conclusions" },
            { "7", "ConclusionItems" }
        };

        public static DataSet GetDescendants(string id, string parentType, string type, string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        string cmdText = $"select * from `{nodeTypes[type]}` where ID in " +
                            $"(select IDChild from Links where IDParent={id} and ParentType={parentType} and ChildType={type});";
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand(cmdText, conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetHistory exception: {ex}");
                return null;
            }
        }

        /* Actions Execution Commands */
        private static ActionErrorCode PerformAction(string company, string cmdText)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        var cmd = new MySqlCommand(cmdText, conn);
                        cmd.ExecuteNonQuery();
                        return ActionErrorCode.OK;
                    }
                    else return ActionErrorCode.CompanyConnectionError;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"PerformAction exception: {ex}");
                return ActionErrorCode.Other;
            }
        }

        public static ActionErrorCode AddProgram(string company, string name, string idLicenseKey)
        {
            string cmd = $"insert into `Programs` (Name, IDLicenseKey) values ('{name}', {idLicenseKey});";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode GenerateKey(string company)
        {
            string cmd = $"insert into `Keys` " +
                $"(Status, Guid, Admins, Stuff, Students, GivenDate, Duration, StartDate, ExpiryDate, Company)" +
                $"values(0, '{Guid.NewGuid().ToString()}', 2, 5, 10, '{DateTime.Now.ToString("dd.MM.yyyy")}', " +
                $"30, null, null, '{company}');";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddAdmin(string company, string fio, string login, string password, int isSA)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `Users` (FIO, Login, Password, Company, Role) " +
                $"values ('{fio}', '{login}', '{password}', '{company}', 0); " +
                $"select @lastID := max(ID) from `Users`; " +
                $"insert into `Admins` (ID, IsSA) values (@lastID, {isSA}); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddStuff(string company, string fio, string login, string password, string position)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `Users` (FIO, Login, Password, Company, Role) " +
                $"values ('{fio}', '{login}', '{password}', '{company}', 0); " +
                $"select @lastID := max(ID) from `Users`; " +
                $"insert into `Stuff` (ID, Position) values (@lastID, '{position}'); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddStudent(string company, string fio, string login, string password, int idGroup)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `Users` (FIO, Login, Password, Company, Role) " +
                $"values ('{fio}', '{login}', '{password}', '{company}', 0); " +
                $"select @lastID := max(ID) from `Users`; " +
                $"insert into `Students` (ID, IDGroup) values (@lastID, {idGroup}); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditUser(string id, string company, string fio, string login, string password)
        {
            string cmd =
                $"update `Users` " +
                $"set FIO = '{fio}', Login = '{login}', Password = '{password}' " +
                $"where ID = {id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AssignSA(string id, string company)
        {
            string cmd =
                $"start transaction; " +
                $"update `Admins` set IsSA = 0 where IsSA = 1; " +
                $"update `Admins` set IsSA = 1 where ID={id}; " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditPosition(string id, string company, string position)
        {
            string cmd = $"update `Stuff` set Position='{position}' where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditGroup(string id, string company, int idGroup)
        {
            string cmd = $"update `Students` set IDGroup={idGroup} where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode DeleteUser(string id, string company)
        {
            string cmd = $"update `Users` set IsDeleted=1 where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode DeleteGroup(string id, string company)
        {
            string cmd = $"update `Groups` set IsDeleted=1 where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddBlockAsDescendant(string idParent, string parentType, string name, string company)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `Blocks` (Name) values ('{name}'); " +
                $"select @lastID := max(ID) from `Blocks`;" +
                $"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values ({idParent}, {parentType}, @lastID, 1); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddExersizeAsDescendant(string idParent, string parentType, string name, string generalQuestion, string company)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `Exersizes` (Name, GeneralQuestion) values ('{name}', '{generalQuestion}'); " +
                $"select @lastID := max(ID) from `Exersizes`;" +
                $"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values ({idParent}, {parentType}, @lastID, 2); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

    }
}
