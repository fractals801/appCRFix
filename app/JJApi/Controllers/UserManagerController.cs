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
    public class UserManagerController : Controller
    {


        [HttpPost]
        [Route("/usermanagement/getData")]
        public string getDataUsermanager([FromForm] IFormFile file, Dictionary<string, string> datos)
        {
            BL.queries.blUsermanager bUsermanager = new BL.queries.blUsermanager(Request.Headers["Authorization"].ToString());
            string result = bUsermanager.getDataUsermanager(null, datos);
            return result;
        }

        [HttpPost]
        [Route("/usermanagement/getProfilesForNewUser")]
        public string getProfilesList([FromForm] IFormFile file, Dictionary<string, string> datos)
        {
            BL.queries.blUsermanager bUsermanager = new BL.queries.blUsermanager(Request.Headers["Authorization"].ToString());
            string result = bUsermanager.getProfilesListForNewUser(null, datos);
            return result;
        }

        [HttpPost]
        [Route("/usermanagement/getDataUserInfo")]
        public string setDataCompanyprofile([FromForm] IFormFile file, Dictionary<string, string> datos)
        {
            BL.queries.blUsermanager bUsermanager = new BL.queries.blUsermanager(Request.Headers["Authorization"].ToString());
            string result = bUsermanager.getDataUserInfo(null, datos);
            return result;
        }


        [HttpPost]
        [Route("/usermanagement/setDataUserInfo")]
        public string setDataUserInfo([FromForm] IFormFile file, Dictionary<string, string> datos)
        {
            BL.queries.blUsermanager bUsermanager = new BL.queries.blUsermanager(Request.Headers["Authorization"].ToString());
            string result = bUsermanager.setDataUserInfo(null, datos);
            return result;
        }


    }
}
