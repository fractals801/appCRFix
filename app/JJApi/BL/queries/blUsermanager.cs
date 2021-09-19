using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JJApi.BL.queries
{
    public class blUsermanager
    {
        // faltan cosas por completar
        string auth = "";
        public blUsermanager(string auth)
        {
            this.auth = auth;
        }

        public string filtersearch(Dictionary<string, string> datos)
        {
            BL.secToken sec = new BL.secToken();
            var xsec = sec.getUserInfo(this.auth);
            string email = xsec.uemail;
            blDB xDB = new blDB();
            DataTable dt = new DataTable();
            string sfield = "";
            if (String.IsNullOrEmpty(datos["filtersearch"]) | datos["filtersearch"] == null) { }
            else
            {
                sfield = datos["filtersearch"].ToString().Replace("'", "''").Replace("*", "")+"*";
            }

            if (String.IsNullOrEmpty(sfield))

            {
                dt = xDB.getDT("select * from tblcompanyname limit 200");
            }
            else
            {
                dt = xDB.getDT(@$"SELECT * FROM tblcompanyname WHERE MATCH(companyname, contactname,ContactLastname,email,city,city_Mail)
                                        AGAINST('{sfield}' IN boolean mode)  and id={xsec.uciaid}");
            }

            string result = JsonConvert.SerializeObject(dt);
            return result;
        }
        public string getDataUsermanager(IFormFile file, Dictionary<string, string> datos)
        {
            BL.secToken sec = new BL.secToken();
            var xsec = sec.getUserInfo(this.auth);
            string email = xsec.uemail;
            blDB xDB = new blDB();
            DataTable dt = xDB.getDT(@$"select * from tbluser where idrelatedwithcompany={xsec.uciaid} limit 200");
            string result = JsonConvert.SerializeObject(dt);
            return result;
        }


        public string getDataUserInfo(IFormFile file, Dictionary<string, string> datos)
        {
            BL.secToken sec = new BL.secToken();
            var xsec = sec.getUserInfo(this.auth);
            string email = xsec.uemail;
            blDB xDB = new blDB();
            DataTable dt = xDB.getDT(@$"select * from tbluser where idrelatedwithcompany={xsec.uciaid} and id={datos["id"].ToString()} limit 200");
            string resultXprofiles = "\"xprofiles\":[],";
            if (dt.Rows.Count > 0)
            {
                resultXprofiles = "\"xprofiles\":" + getProfilesList(dt.Rows[0]["idrelatedwithcompany"].ToString(), dt.Rows[0]["masteruser"].ToString()) + ",";
            }



            string result = "{" + resultXprofiles + "\"uinfo\":" + JsonConvert.SerializeObject(dt) +"}";
            return result;
        }



        public string getProfilesListForNewUser(IFormFile file, Dictionary<string, string> datos)
        {
            BL.secToken sec = new BL.secToken();
            var xsec = sec.getUserInfo(this.auth);
            string email = xsec.uemail;
            blDB xDB = new blDB();

            DataTable dt = null;
            
                dt = xDB.getDT(@$"select * from tbldefaulttemplates where idtblcompany={xsec.uciaid}  or idtblcompany=-2 limit 200");
            
            string result = JsonConvert.SerializeObject(dt);
            return result;
        }


        string getProfilesList(string ciaid,string masteruser)
        {
           
            blDB xDB = new blDB();

            DataTable dt = null;
            if (masteruser == "1")
            {
                dt = xDB.getDT(@$"select * from tbldefaulttemplates where idtblcompany={ciaid} or idtblcompany=-1 limit 200");
            }
            else
            {
                dt = xDB.getDT(@$"select * from tbldefaulttemplates where idtblcompany={ciaid}  or idtblcompany=-2 limit 200");
            }
            string result = JsonConvert.SerializeObject(dt);
            return result;
        }




        public string setDataUserInfo(IFormFile file, Dictionary<string, string> collection)
        {
            string result = "{\"result\":\"successful\"}";
            blDB xDB = new blDB();
            BL.secToken sec = new BL.secToken();
            var xsec = sec.getUserInfo(this.auth);
            int xid = -1;

            CustomCommandBuilderObjDataAdapter cb = null;

            Boolean ready = true;
            xDB.cnOpen();
            MySqlConnector.MySqlTransaction trans = xDB.mysqlCN.BeginTransaction();
            try
            {
                if (collection["id"].ToString() == "-1")
                {
                    cb = xDB.getCustomCBDS(@$"select * from tbluser where 1=0 and id={xsec.uciaid}");
                    //cb.dt.Rows.Add(cb.dt.NewRow());
                    cb.ds.Tables[0].Rows.Add(cb.ds.Tables[0].NewRow());
                }
                else
                {
                    xid = Convert.ToInt32(collection["id"]);
                    cb = xDB.getCustomCBDS(@$"select * from tbluser where id= {xid} and  idrelatedwithcompany={xsec.uciaid}");
                    if (cb.ds.Tables[0].Rows.Count != 1)
                    {
                        ready = false;
                        result = "{\"result\":\"fail\"}";
                    }
                }

                if (ready)
                {
                    foreach (var item in collection)
                    {
                        if (item.Key != "passconfirm")
                        {
                            if (item.Key == "idrelatedwithcompany") {
                                cb.ds.Tables[0].Rows[0][item.Key] = xsec.uciaid;
                            }
                            else
                            {
                                cb.ds.Tables[0].Rows[0][item.Key] = collection[item.Key].ToString();
                            }
                        }
                    }
                    cb.executeUpdate();
                }
                trans.Commit();
            }
            catch (Exception ex)
            {
                string errmsg = "Fail: " + ex.Message;
                // result = "{" + @$"result"":""{errmsg}" + "}";
                result = errmsg;
                trans.Rollback();
                //xDB.cnClose();
                //throw new Exception(errmsg);
            }
            xDB.cnClose();
            //result = JsonConvert.SerializeObject(dt);
            //result = "{\"nada\":\"qloco\"}";
            return result;
        }



    }
}
