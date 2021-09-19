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

    public class RegisterController : Controller
    {



        [HttpPost]
        [Route("/Register/setData")]
        public string setDataCompanyprofile([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            BL.queries.blRegister bRegister = new BL.queries.blRegister();
            string result = bRegister.setDataCompanyprofile(null,collection);
            return result;
        }


    }
}
