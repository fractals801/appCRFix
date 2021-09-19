using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JJApi.BL.queries
{
    public class blUaccess
    {

        string auth = "";
        public blUaccess(string auth)
        {
            this.auth = auth;
        }


        public DataTable getSectionsbyScreen(string screenname) {
            blDB xDB = new blDB();
            string sql1 = @$"SELECT * FROM jjcreditcandy.tblsectemplate
                            where screenname='{screenname}'";

            DataTable dt = xDB.getDT(sql1);
            return dt;
        }

        public DataTable getUserSec(string ciaInfo)
        {
            
            BL.secToken sec = new BL.secToken();
            var objUinfo = sec.getUserInfo(this.auth);
            blDB xDB = new blDB();

            // busco el username y la compania
            //objUinfo.uciaid
            //objUinfo.uname     vas a buscar en tblusers para coseguir  ciaInfo y uId

            string sql1 = @$"SELECT id,iddefaulttemplate FROM jjcreditcandy.tbluser
                            where uname = '{objUinfo.uname}' and idrelatedwithcompany = {objUinfo.uciaid}";

            


            //string ciaInfo = objUinfo.ciaInfo;
            int udefaulttemplate = Convert.ToInt32(xDB.getDT(sql1).Rows[0]["iddefaulttemplate"]);

            //string sql2 = @$"SELECT a.id,a.disablescreen,b.screenname,a.hidesection,a.disablesection,b.sectionname,
            //                        c.fieldname,c.hidefield,c.disablefield FROM tblusersec a
            //                    inner join tblsectemplate b on b.id=a.idtblsectemplate
            //                    left join tblsecfields c on c.idsectemplate=b.id
            //                    where a.userid={uId} and b.screenname='{ciaInfo}'
            //                    and 
            //                     EXISTS(
            //                    SELECT * FROM tblusersec a
            //                    inner join tblsectemplate b on b.id=a.idtblsectemplate
            //                    where a.userid={uId} and b.screenname='{ciaInfo}' and a.hidescreen=0 limit 1);";


             string sql2 = @$"call jjcreditcandy.View_userAcccess({udefaulttemplate},'{ciaInfo}' )";


            var xsec = sec.getUserInfo(this.auth);
            string email = xsec.uemail;
            
            DataTable dt = xDB.getDT(sql2);
            return dt;
        }


    }
}
