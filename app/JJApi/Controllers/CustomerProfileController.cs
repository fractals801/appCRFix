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
    [Authorize(Roles = "level1,level2")]
    public class CustomerProfileController : Controller
    {
        [HttpGet]
        [Route("/Customerinfo/getData")]
        public string getDataCustomerInfo([FromForm] IFormFile file, Dictionary<string, string> datos)
        {
            BL.queries.blCustomer bCustomer = new BL.queries.blCustomer(Request.Headers["Authorization"].ToString());
            string result = bCustomer.getDataCustomerInfo(null, datos);
            return result;
        }


        [HttpPost]
        [Route("/allCustomers/getData")]
        public string getAllCutomersData([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            BL.queries.blCustomer bCustomer = new BL.queries.blCustomer(Request.Headers["Authorization"].ToString());
            string result = bCustomer.getAllCutomersData(null, collection);
            return result;
        }

        [HttpPost]
        [Route("/allCustomers/getDataSubTables")]
        public string getAllCutomersDataSubTables([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            BL.queries.blCustomer bCustomer = new BL.queries.blCustomer(Request.Headers["Authorization"].ToString());
            string result = bCustomer.getAllCutomersDataSubTables(null, collection);
            return result;
        }


        [HttpPost]
        [Route("/Customerinfo/setData")]
        //public string setData([FromBody] dynamic tdata)
        //public string setData([FromBody] Dictionary<string, string> collection)
        public string setDataCustomerinfo([FromForm] IFormFile file, Dictionary<string, string> collection)
        {
            BL.queries.blCustomer bCustomer = new BL.queries.blCustomer(Request.Headers["Authorization"].ToString());
            string result = bCustomer.setDataCustomerinfo(null, collection);
            return result;
        }
    }
}
