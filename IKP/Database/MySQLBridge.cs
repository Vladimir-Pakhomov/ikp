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

        public static DataSet GetStudentsConditional(string company, string condition)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select u.*, s.IDGroup from (select * from Students where {condition}) s inner join (select * from Users where IsDeleted = 0) u on s.ID = u.ID", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetStudentsConditional exception: {ex}");
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

        public static DataSet GetProgramByID(string company, string idProgram)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from Programs where ID={idProgram};", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetProgramByID exception: {ex}");
                return null;
            }
        }

        public static DataSet GetBlockByID(string company, string idBlock)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from Blocks where ID={idBlock};", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetBlockByID exception: {ex}");
                return null;
            }
        }

        public static DataSet GetUserByID(string company, string idUser)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        DataSet ds = new DataSet();
                        var cmd = new MySqlCommand($"select * from `Users` where ID={idUser};", conn);
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(ds);
                        return ds;
                    }
                    return null;
                }
            }
            catch (Exception ex)
            {
                _dbLogger.Log($"GetUserByID exception: {ex}");
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

        public static DataSet GetVideoByID(string id, string company)
        {
            try
            {
                using (var conn = CreateConnectionByCompany(company))
                {
                    if (conn != null)
                    {
                        string cmdText = $"select * from `Videos` where ID={id}";
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
                _dbLogger.Log($"GetVideoUrl exception: {ex}");
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

        public static ActionErrorCode AddGroup(string company, string name, string idLead)
        {
            string cmd = $"insert into `Groups` (Name, IDLead) values ('{name}', {idLead});";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditGroup(string company, string name, string idLead, string id)
        {
            string cmd = $"update `Groups` set Name='{name}', IDLead={idLead} where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddProgram(string company, string name, string idLicenseKey)
        {
            string cmd = $"insert into `Programs` (Name, IDLicenseKey) values ('{name}', {idLicenseKey});";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditProgram(string company, string name, string idLicenseKey, string id)
        {
            string cmd = $"update `Programs` set Name='{name}', IDLicenseKey={idLicenseKey} where ID={id}";
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

        public static ActionErrorCode EditBlock(string name, string id, string company)
        {
            string cmd = $"update `Blocks` set Name='{name}' where ID={id}";
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

        public static ActionErrorCode EditExersize(string name, string generalQuestion, string id, string company)
        {
            string cmd = $"update `Exersizes` set Name='{name}', GeneralQuestion='{generalQuestion}' where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddQuestionAsDescendant(string idParent, string parentType, string content, string company)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `Questions` (Content) values ('{content}'); " +
                $"select @lastID := max(ID) from `Questions`;" +
                $"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values ({idParent}, {parentType}, @lastID, 3); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditQuestion(string content, string id, string company)
        {
            string cmd = $"update `Questions` set Content='{content}' where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddConclusionAsDescendant(string idParent, string parentType, string name, string company)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `Conclusions` (Name) values ('{name}'); " +
                $"select @lastID := max(ID) from `Conclusions`;" +
                $"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values ({idParent}, {parentType}, @lastID, 6); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditConclusion(string name, string id, string company)
        {
            string cmd = $"update `Conclusions` set Name='{name}' where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddConclusionItemAsDescendant(string idParent, string parentType, string content, string isBranch, string isCorrect, string company)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `ConclusionItems` (Content, IsBranch, IsCorrect) values ('{content}', {isBranch}, {isCorrect}); " +
                $"select @lastID := max(ID) from `ConclusionItems`;" +
                $"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values ({idParent}, {parentType}, @lastID, 7); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditConclusionItem(string content, string isBranch, string isCorrect, string id, string company)
        {
            string cmd = $"update `ConclusionItems` set Content='{content}', IsBranch={isBranch}, IsCorrect={isCorrect} where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddResolverAsDescendant(string idParent, string parentType, string type, string content, string company)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `Resolvers` (Type, Content) values ({type}, '{content}'); " +
                $"select @lastID := max(ID) from `Resolvers`;" +
                $"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values ({idParent}, {parentType}, @lastID, 4); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditResolver(string type, string content, string id, string company)
        {
            string cmd = $"update `Resolvers` set Type={type}, Content='{content}' where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode AddVideoAsDescendant(string idParent, string parentType, string content1, string content2, string isFirstCorrect, string playbackType, string company)
        {
            string cmd =
                $"start transaction; " +
                $"insert into `Videos` (Content1, Content2, IsFirstCorrect, PlaybackType) values ('{content1}', '{content2}', {isFirstCorrect}, {playbackType}); " +
                $"select @lastID := max(ID) from `Videos`;" +
                $"insert into `Links` (IDParent, ParentType, IDChild, ChildType) values ({idParent}, {parentType}, @lastID, 5); " +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode EditVideo(string content1, string content2, string isFirstCorrect, string playbackType, string id, string company)
        {
            string cmd = $"update `Videos` set Content1='{content1}', Content2='{content2}', IsFirstCorrect={isFirstCorrect}, PlaybackType={playbackType} where ID={id}";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode SendResult(string start, string end, string idProgram, string idBlock, string idUser, string correctness, string rationality,
            string totalPercentage, string company)
        {
            DateTime _start = DateTime.Parse(start);
            DateTime _end = DateTime.Parse(end);
            string cmd = $"insert into `Results` (Start, End, Elapsed, IDUser, IDProgram, IDBlock, Correctness, Rationality, TotalPercentage)" +
                $"values ('{start}', '{end}', {(int)((_end - _start).TotalMinutes)}, {idUser}, {idProgram}, {idBlock}, '{correctness}', '{rationality}', '{totalPercentage}');";
            return PerformAction(company, cmd);
        }

        /* Delete */
        private static ActionErrorCode DeleteByID(string tableName, string type, string id, string company)
        {
            string cmd =
                $"start transaction; " +
                $"delete from `{tableName}` where ID={id}; " +
                $"delete from `Links` where IDParent={id} and ParentType={type} or IDChild={id} and ChildType={type};" +
                $"commit;";
            return PerformAction(company, cmd);
        }

        public static ActionErrorCode DeleteVideo(string id, string company)
        {
            return DeleteByID("Videos", "7", id, company);
        }

        public static ActionErrorCode DeleteConclusionItem(string id, string company)
        {
            return DeleteByID("ConclusionItems", "6", id, company);
        }

        public static ActionErrorCode DeleteConclusion(string id, string company)
        {
            return DeleteByID("Conclusions", "5", id, company);
        }

        public static ActionErrorCode DeleteResolver(string id, string company)
        {
            return DeleteByID("Resolvers", "4", id, company);
        }

        public static ActionErrorCode DeleteQuestion(string id, string company)
        {
            return DeleteByID("Questions", "3", id, company);
        }

        public static ActionErrorCode DeleteExersize(string id, string company)
        {
            return DeleteByID("Exersizes", "2", id, company);
        }

        public static ActionErrorCode DeleteBlock(string id, string company)
        {
            return DeleteByID("Blocks", "1", id, company);
        }

        public static ActionErrorCode DeleteProgram(string id, string company)
        {
            return DeleteByID("Programs", "0", id, company);
        }
    }
}
