using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace JJApi.Controllers
{
    public class LoginController : Controller
    {
        public IConfiguration config { get; }

        public LoginController(IConfiguration pconfig)
        {
            config = pconfig;
        }

        [HttpPost]
        [Route("/Login/valid")]
        //public string setData([FromBody] dynamic tdata)
        //public string setData([FromBody] Dictionary<string, string> collection)
        public object setLogin([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            string ip = Response.HttpContext.Connection.RemoteIpAddress.ToString();
            string strjwtkey = this.config["Jwt:key"];
            string jwttimeexpire = this.config["jwttimeexpireinminutes"];

            BL.queries.blLogin bLogin = new BL.queries.blLogin();
            object result = "";
            result=bLogin.setLogin(null, strjwtkey,jwttimeexpire, collection);
            return result;
        }


       


    }
}
