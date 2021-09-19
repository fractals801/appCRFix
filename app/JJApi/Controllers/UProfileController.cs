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
    public class UProfileController : Controller
    {

        [HttpPost]
        [Route("/uprofile/getData")]
        public dynamic getUserInfo()
        {
            BL.queries.blUprofile bUprofile = new BL.queries.blUprofile(Request.Headers["Authorization"].ToString());
            return bUprofile.getUserInfo();
        }



    }
}
