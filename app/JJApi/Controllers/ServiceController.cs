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
    public class ServiceController : Controller
    {
        //  Service

        [HttpPost]
        [Route("/service/getDataService")]
        public string getServiceData([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            BL.queries.blService bService = new BL.queries.blService(Request.Headers["Authorization"].ToString());
            string result= bService.getServiceData(null, collection);
            return result;
        }


        [HttpPost]
        [Route("/service/getDataServiceTran")]
        public string getServiceTran([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            BL.queries.blService bService = new BL.queries.blService(Request.Headers["Authorization"].ToString());
            string result = bService.getServiceTran(null, collection);
            return result;
        }




        [HttpPost]
        [Route("/service/setData")]
        public string setDataServiceinfo([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            BL.queries.blService bService = new BL.queries.blService(Request.Headers["Authorization"].ToString());
            string result = bService.setDataServiceinfo(null, collection);
            return result;
        }

        // ------------------------  service end

    }
}
