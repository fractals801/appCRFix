using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace JJApi.Controllers
{

    //[Produces("application/json")]
    public class DBController : Controller
    {
        // GET: DBController


     

        [HttpPost, DisableRequestSizeLimit]
        [Route("/upfile")]
        //public string setData([FromBody] dynamic tdata)
        public string uploadFile([FromForm] IFormFile file, Dictionary<string, string> datos)
        {
            try
            {
                //var file =  Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream("d://" + fileName, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    //  return "";
                }
                else
                {
                    //  return "";
                }
            }
            catch (Exception ex)
            {
                return "";
            }
            return "";
        }





    }



    public class FileModel
    {
        public string prueba1 { get; set; }
        public IFormFile file { get; set; }

    }

}
