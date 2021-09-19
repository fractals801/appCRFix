using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace JJApi.Controllers
{
    [Authorize(Roles = "level2")]
    public class TemplatesController : Controller
    {
        //  Process

        [HttpPost]
        [Route("/templates/getTemplates")]
        public string getTemplatesData([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            BL.queries.blTemplates bTemplates = new BL.queries.blTemplates(Request.Headers["Authorization"].ToString());
            string result= bTemplates.getTemplatesData(null, collection);
            return result;
        }


        //[HttpPost]
        //[Route("/process/getDataProcessTran")]
        //public string getProcessTran([FromForm] IFormFile file, Dictionary<string, string> collection)
        //{
        //    BL.queries.blProcess bProcess = new BL.queries.blProcess(Request.Headers["Authorization"].ToString());
        //    string result = bProcess.getProcessTran(null, collection);
        //    return result;
        //}




        //[HttpPost]
        //[Route("/process/setData")]
        //public string setDataProcessinfo([FromForm] IFormFile file, Dictionary<string, string> collection)
        //{
        //    BL.queries.blProcess bProcess = new BL.queries.blProcess(Request.Headers["Authorization"].ToString());
        //    string result = bProcess.setDataProcessinfo(null, collection);
        //    return result;
        //}

        // ------------------------  process end

    }
}
