using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JJApi.BL.queries
{
    public class blTemplates
    {

        string auth = "";
        public blTemplates(string auth)
        {
            this.auth = auth;
        }


        public string getTemplatesData(IFormFile file, Dictionary<string, string> collection)
        {
            blDB xDB = new blDB();
            BL.secToken sec = new BL.secToken();
            var objUinfo = sec.getUserInfo(this.auth);
            DataSet ds = xDB.getDataSet(@$"SELECT * FROM jjcreditcandy.tbldefaulttemplates a where id>0");

            string result = JsonConvert.SerializeObject(ds.Tables[0]);
            return result;

        }


    }
}
