using System;
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
                var conn = CreateConnectionByCompany(company);
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
                var conn = CreateConnectionByCompany(company);
                if (conn != null)
                {
                    DataSet ds = new DataSet();
                    var cmd = new MySqlCommand($"select * from Users where Login='{login}' and Password='{password}'", conn);
                    MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                    mySqlDataAdapter.Fill(ds);
                    return ds;
                }
                return null;
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
                var conn = CreateConnectionByCompany(company);
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
            catch (Exception ex)
            {
                _dbLogger.Log($"GetLicenseKeys exception: {ex}");
                return null;
            }
        }

        public static DataSet GetAdmins(string company)
        {
            try
            {
                var conn = CreateConnectionByCompany(company);
                if (conn != null)
                {
                    DataSet ds = new DataSet();
                    var cmd = new MySqlCommand($"select u.*, a.IsSA from Users u inner join Admins a on u.ID = a.ID", conn);
                    MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                    mySqlDataAdapter.Fill(ds);
                    return ds;
                }
                return null;
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
                var conn = CreateConnectionByCompany(company);
                if (conn != null)
                {
                    DataSet ds = new DataSet();
                    var cmd = new MySqlCommand($"select u.*, s.Position from Stuff s inner join Users u on u.ID = s.ID", conn);
                    MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                    mySqlDataAdapter.Fill(ds);
                    return ds;
                }
                return null;
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
                var conn = CreateConnectionByCompany(company);
                if (conn != null)
                {
                    DataSet ds = new DataSet();
                    var cmd = new MySqlCommand($"select u.*, s.Position from (select * from Stuff where ID={idStuff}) s inner join Users u on u.ID = s.ID", conn);
                    MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                    mySqlDataAdapter.Fill(ds);
                    return ds;
                }
                return null;
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
                var conn = CreateConnectionByCompany(company);
                if (conn != null)
                {
                    DataSet ds = new DataSet();
                    var cmd = new MySqlCommand($"select u.*, s.IDGroup from Students s inner join Users u on s.ID = u.ID", conn);
                    MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                    mySqlDataAdapter.Fill(ds);
                    return ds;
                }
                return null;
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
                var conn = CreateConnectionByCompany(company);
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
                var conn = CreateConnectionByCompany(company);
                if (conn != null)
                {
                    DataSet ds = new DataSet();
                    var cmd = new MySqlCommand($"select * from `Groups`", conn);
                    MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                    mySqlDataAdapter.Fill(ds);
                    return ds;
                }
                return null;
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
                var conn = CreateConnectionByCompany(company);
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
                var conn = CreateConnectionByCompany(company);
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
                var conn = CreateConnectionByCompany(company);
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
                var conn = CreateConnectionByCompany(company);
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
                var conn = CreateConnectionByCompany(company);
                if (conn != null)
                {
                    var cmd = new MySqlCommand(cmdText, conn);
                    cmd.ExecuteNonQuery();
                    return ActionErrorCode.OK;
                }
                else return ActionErrorCode.CompanyConnectionError;
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"PerformAction exception: {ex}");
                return ActionErrorCode.Other;
            }
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
                $"set FIO = '{fio}', Login = '{login}, Password = '{password}' " +
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
    }
}
