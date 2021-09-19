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
    public class CompanyProfileController : Controller
    {


        [HttpPost]
        [Route("/Companyprofile/getData")]
        public string getDataCompanyprofile([FromForm] IFormFile file, Dictionary<string, string> datos)
        {
            BL.queries.blCompany bCompany = new BL.queries.blCompany(Request.Headers["Authorization"].ToString());
            string result = bCompany.getDataCompanyprofile(null, datos);
            return result;
        }

        [HttpPost]
        [Route("/Companyprofile/getDataSearch")]
        public string getDataCompanyFilter([FromForm] IFormFile file, Dictionary<string, string> datos)
        {
            BL.queries.blCompany bCompany = new BL.queries.blCompany(Request.Headers["Authorization"].ToString());
            string result = bCompany.filtersearch( datos);
            return result;
        }

        [HttpPost]
        [Route("/Companyprofile/setData")]
        public string setDataCompanyprofile([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            BL.queries.blCompany bCompany = new BL.queries.blCompany(Request.Headers["Authorization"].ToString());
            string result = bCompany.setDataCompanyprofile(null, collection);
            return result;
        }




    }
}
