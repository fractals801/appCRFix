using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JJApi.BL.queries
{
    public class blUprofile
    {

        string auth = "";
        public blUprofile(string auth)
        {
            this.auth = auth;
        }


        public dynamic getUserInfo()
        {
            BL.secToken sec = new BL.secToken();
            return sec.getUserInfo(this.auth);
        }


    }
}
