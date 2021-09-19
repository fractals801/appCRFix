using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JJApi.BL.queries
{
    public class blLogin
    {



        public object setLogin(IFormFile file,string strjwtkey,string tokentimeexpire, Dictionary<string, string> collection)
        {
           
            string xresult = "fail";
            string token = "";
            blDB db = new blDB();
            string uname = collection["uname"].Replace("'", "''");
            string pass = collection["pass"].Replace("'", "''");

            DataTable dt = db.getDT(@$"select * from tbluser where uname='{uname}' and pass='{pass}'");
            if (dt.Rows.Count > 0)
            {
                string trol = dt.Rows[0]["role"] == DBNull.Value ? "" : dt.Rows[0]["role"].ToString();
                BL.secToken st = new BL.secToken();
                //token = st.GenerateJSONWebToken("carde,pagan",strjwtkey);
                // cuando genere el token segun el nivel q te devuela la db , eso sera 
                // lo q acceses en lo q pongas en los auth de las clases
                token = st.GenerateJSONWebToken(trol, uname,
                    dt.Rows[0]["useremail"].ToString(),
                    dt.Rows[0]["fullname"].ToString(), dt.Rows[0]["idrelatedwithcompany"].ToString(),
                     dt.Rows[0]["iddefaulttemplate"].ToString(),
                     dt.Rows[0]["masteruser"].ToString(),
                    strjwtkey, Convert.ToInt32(tokentimeexpire));
                xresult = "successful";

               
            }

            return new
            {
                result = xresult,
                tk = token
            };
        }


    }
}
