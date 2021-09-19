using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JJApi.BL.queries
{
    public class blRegister
    {

        //string auth = "";
        //public blRegister(string auth)
        //{
        //    this.auth = auth;
        //}

        public string setDataCompanyprofile(IFormFile file, Dictionary<string, string> collection)
        {

            string result = "{\"result\":\"successful\"}";
            blDB xDB = new blDB();
            int xid = -1;
            //List<Dictionary<string, string>> GenericList = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(collection["gridfollows"].ToString());



            CustomCommandBuilderObjDataAdapter cb = null;
            CustomCommandBuilderObjDataTable cb2 = null;

            Boolean ready = true;
            xDB.cnOpen();
            MySqlConnector.MySqlTransaction trans = xDB.mysqlCN.BeginTransaction();
            try
            {
                string uname = collection["uname"].ToString();
                string useremail = collection["useremail"].ToString();
                string email = collection["email"].ToString();
                DataSet dsverify = xDB.getDataSet(@$"select useremail from tbluser where useremail='{useremail.Replace("'", "''")}';
                                                     select email from tblcompanyname where email='{email.Replace("'", "''")}'; ");


                if (dsverify.Tables[0].Rows.Count != 0 ||
                    dsverify.Tables[1].Rows.Count != 0)
                {
                    string result2 = "";
                    if (dsverify.Tables[0].Rows.Count != 0)
                    {
                        result2 = "User email already exist. ";
                    }

                    if (dsverify.Tables[1].Rows.Count != 0)
                    {
                        result2 += "Company email already exist.";
                    }

                    var jvar = new { result = "Fail:" + result2 };

                    //return JsonConvert.SerializeObject(jvar);
                    throw new Exception(result2);
                }
                // verifico primero si existe



                // si no existe la compania y el usuario

                if (collection["id"].ToString() == "-1")
                {
                    cb = xDB.getCustomCBDS("select * from tblcompanyname where 1=0");
                    cb2 = xDB.getCustomCBDT("Select * from tblUser where 1 = 0");
                    //cb.dt.Rows.Add(cb.dt.NewRow());
                    cb.ds.Tables[0].Rows.Add(cb.ds.Tables[0].NewRow());
                    cb2.dt.Rows.Add(cb2.dt.NewRow());
                }


                if (ready)
                {
                    string tmpcolname = "";

                    foreach (var item in collection)
                    {
                        tmpcolname = item.Key;
                        if (tmpcolname.ToLower() != "uname" && tmpcolname.ToLower() != "pass"
                            && tmpcolname.ToLower() != "passconfirm"
                            && tmpcolname.ToLower() != "fullname"
                            && tmpcolname.ToLower() != "useremail")
                        {
                            cb.ds.Tables[0].Rows[0][item.Key] = collection[item.Key].ToString();
                        }
                        else
                        {

                            if (tmpcolname.ToLower() != "passconfirm")
                            {
                                cb2.dt.Rows[0][item.Key] = collection[item.Key].ToString();

                            }
                        }
                    }



                    cb.executeUpdate();

                    DataTable dtlastid = xDB.getDT("SELECT LAST_INSERT_ID() lastid");

                    if (dtlastid.Rows.Count == 1)
                    {
                        xid = Convert.ToInt32(dtlastid.Rows[0]["lastid"]);
                        cb2.dt.Rows[0]["role"] = "level2";
                        cb2.dt.Rows[0]["idrelatedwithcompany"] = xid;
                        cb2.dt.Rows[0]["masteruser"] = 1;
                        cb2.executeUpdate();
                    }



                }
                trans.Commit();
            }
            catch (Exception ex)
            {
                string errmsg = "Fail: " + ex.Message;
                //result = "{" + @$"result"":""{errmsg}" + "}";
                result = errmsg;
                trans.Rollback();
            }
            xDB.cnClose();
            //result = JsonConvert.SerializeObject(dt);
            //result = "{\"nada\":\"qloco\"}";
            return result;
        }

    }
}
