using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JJApi.BL.queries
{
    public class blService
    {

        string auth = "";
        public blService(string auth)
        {
            this.auth = auth;
        }



        public string getServiceData(IFormFile file, Dictionary<string, string> collection)
        {
            blDB xDB = new blDB();
            BL.secToken sec = new BL.secToken();
            var objUinfo = sec.getUserInfo(this.auth);
            DataSet ds = xDB.getDataSet(@$"select b.id,b.Dob,b.refereddate,b.CustomerName, b.CustomerLastname, b.email, b.phone1, b.phone2,
b.servicetrandate from  tblcustomerinfo b  where b.servicetrandate is not null and b.processtrandate is null and b.belongtocia={objUinfo.uciaid} limit 200");

            string result = JsonConvert.SerializeObject(ds.Tables[0]);
            return result;
        }



        public string getServiceTran(IFormFile file, Dictionary<string, string> collection)
        {
            string custId = collection["custid"].ToString();
            blDB xDB = new blDB();
            BL.secToken sec = new BL.secToken();
            var objUinfo = sec.getUserInfo(this.auth);
            DataSet ds = xDB.getDataSet(@$"select a.*,0 as xchanged from tblservicetran a where a.idcustomer={custId}  limit 200");

            string result = JsonConvert.SerializeObject(ds.Tables[0]);
            return result;
        }


        public string setDataServiceinfo(IFormFile file, Dictionary<string, string> collection)
        {
            string result = "{\"result\":\"successful\"}";
            blDB xDB = new blDB();
            BL.secToken sec = new BL.secToken();
            var objUinfo = sec.getUserInfo(this.auth);
            int xid = -1;
            List<Dictionary<string, string>> GenericList = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(collection["gridservice"].ToString());

            //  BL.ListtoDataTable lt = new BL.ListtoDataTable();
            //    DataTable dtservice = lt.ToDataTable(GenericList);

            CustomCommandBuilderObjDataAdapter cb1 = null;
            CustomCommandBuilderObjDataAdapter cb2 = null;
            xDB.cnOpen();
            MySqlConnector.MySqlTransaction trans = xDB.mysqlCN.BeginTransaction();

            xid = Convert.ToInt32(collection["id"]);
            cb1 = xDB.getCustomCBDS(@$"select * from tblcustomerinfo where id= {xid} and belongtocia={objUinfo.uciaid}");
            
            if (cb1.ds.Tables[0].Rows.Count > 0)
            {
                if (collection["tmpprocesstrandatechk"].ToString() == "true")
                {
                    if (cb1.ds.Tables[0].Rows[0]["processtrandate"] == DBNull.Value)
                    {
                        cb1.ds.Tables[0].Rows[0]["processtrandate"] = DateTime.Now.ToString("yyyy-MM-dd");
                    }
                }


                if (GenericList.Count == 0)  // si no cumple hace el commit mas abajo.
                {
                    cb1.executeUpdate();
                    trans.Commit();
                
                }
            }




            if (GenericList.Count > 0)
            {

                string[] aColumnsName = xDB.getDictionaryKeystoArray(GenericList[0]);



                ////CustomCommandBuilderObjDataAdapter cb = null;
                ////xDB.cnOpen();
                ////MySqlConnector.MySqlTransaction trans = xDB.mysqlCN.BeginTransaction();
                try
                {
                    xid = Convert.ToInt32(collection["id"]);

                    // save gridfollows data ------------
                    // en el grid debo de poner el user 

                    // aqui borro todos lo record en la db

                    MySqlConnector.MySqlCommand cmdDelete = new MySqlConnector.MySqlCommand();
                    cmdDelete.CommandText = $"delete from tblservicetran where idcustomer= {xid}";
                    cmdDelete.Connection = xDB.mysqlCN;
                    cmdDelete.ExecuteNonQuery();
                    //

                    cb2 = xDB.getCustomCBDS("select * from tblservicetran where 1=0");
                    //int ccount = dtservice.Columns.Count;
                    int ccount = GenericList[0].Count();
                    int rcount = GenericList.Count;
                    //for (int q = 0; q < dtservice.Rows.Count; q++)
                    for (int q = 0; q < rcount; q++)
                    {
                        cb2.ds.Tables[0].Rows.Add(cb2.ds.Tables[0].NewRow());

                        string cname = "";

                        for (int x = 0; x < ccount; x++)
                        {
                            //cname = dtservice.Columns[x].ColumnName;
                            cname = aColumnsName[x];


                            if (cname != "xchanged")  // only use to know if some chang in grid, this field is not include in database table.
                            {


                                if (cname.ToLower() == "idcustomer")
                                {
                                    cb2.ds.Tables[0].Rows[q][cname] = xid;
                                }

                                else
                                {



                                    // part 2
                                    if (GenericList[q][cname] == null)
                                    {
                                        cb2.ds.Tables[0].Rows[q][cname] = DBNull.Value;
                                        if (cname.ToLower() == "createddate") 
                                           // || cname.ToLower() == "lastupdatedate")
                                        {
                                            // if doesnt have value, I assign date value.
                                            cb2.ds.Tables[0].Rows[q][cname] = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
                                            cb2.ds.Tables[0].Rows[q]["Createduname"] = objUinfo.uname;
                                        }
                                    }
                                    else
                                    {
                                        if (cname.ToLower() == "lastupdatedate" && Convert.ToInt32(GenericList[q]["xchanged"]) == 1)
                                        {
                                            cb2.ds.Tables[0].Rows[q][cname] = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
                                        }
                                        else
                                        {
                                            cb2.ds.Tables[0].Rows[q][cname] = GenericList[q][cname];
                                        }

                                    }


                                }

                            }
                        }

                    }

                    cb2.executeUpdate();
                    cb1.executeUpdate();
                    trans.Commit();
                }
                catch (Exception ex)
                {

                    string errmsg = "Fail: " + ex.Message;
                    result = "{" + @$"result"":""{errmsg}" + "}";
                    trans.Rollback();
                }
            }
            else {
             
                xDB.cnOpen();
                MySqlConnector.MySqlCommand cmdDelete = new MySqlConnector.MySqlCommand();
                cmdDelete.CommandText = $"delete from tblservicetran where idcustomer= {collection["id"].ToString()}";
                cmdDelete.Connection = xDB.mysqlCN;
                cmdDelete.ExecuteNonQuery();
             
            }
            xDB.cnClose();
            //result = JsonConvert.SerializeObject(dt);
            //result = "{\"nada\":\"qloco\"}";
            return result;
        }





    }
}
