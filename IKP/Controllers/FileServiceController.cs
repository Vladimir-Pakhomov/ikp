using System;
using System.Data;
using System.IO;
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
    [Route("api/FileService")]
    public class FileServiceController : Controller
    {
        private Logger _fileServiceLogger = new Logger("FileService", "logs");

        [HttpGet("[action]")]
        public IActionResult GetVideo(string link, string company)
        {
            try
            {
                byte[] buffer = System.IO.File.ReadAllBytes($"assets/{company}/videos/{link}");
                var content = new MemoryStream(buffer);
                var contentType = "APPLICATION/octet-stream";
                return File(content, contentType, link);
            }
            catch (Exception ex)
            {
                _fileServiceLogger.Log($"GetVideo Exception: {ex}");
                return null;
            }
        }
    }
}