using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace IKP.Logging
{
    public class Logger
    {
        private string _logName;
        private string _logPath;

        public Logger(string logName, string logPath)
        {
            this._logName = logName;
            this._logPath = logPath;
        }

        public void Log(string message)
        {
            if (!Directory.Exists(this._logPath))
                Directory.CreateDirectory(this._logPath);
            File.AppendAllText($"{this._logPath}/{this._logName}_{DateTime.Now.ToString("dd-MM-yyyy")}.log",
                    $"{DateTime.Now.ToString("HH:mm:ss.fff")} (THRD={Thread.CurrentThread.ManagedThreadId}) :: {message}{Environment.NewLine}"
                );
        }
    }
}
