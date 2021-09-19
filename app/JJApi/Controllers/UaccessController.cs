using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace JJApi.Controllers
{
    [Authorize(Roles = "level1,level2")]
    public class UaccessController : Controller
    {


        [HttpPost]
        [Route("/usec/getData")]
        public string getUserSec(Dictionary<string, string> datos)
        {
            BL.queries.blUaccess bAccess = new BL.queries.blUaccess(Request.Headers["Authorization"].ToString());
            DataTable dt = bAccess.getUserSec(datos["screenname"].ToString());
            string result= JsonConvert.SerializeObject(dt);
            return result;
        }


        [HttpPost]
        [Route("/usec/getSectionsbyScreen")]
        public string getSectionsbyScreen(Dictionary<string, string> datos)
        {
            BL.queries.blUaccess bAccess = new BL.queries.blUaccess(Request.Headers["Authorization"].ToString());
            DataTable dt = bAccess.getSectionsbyScreen(datos["screenname"].ToString());
            string result = JsonConvert.SerializeObject(dt);
            return result;
        }
        



    }
}
