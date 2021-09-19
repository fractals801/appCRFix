using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JJApi.BL.queries
{
    public class blCustomer
    {
        string auth = "";
        public blCustomer(string auth)
        {
            this.auth = auth;
        }

        public string getDataCustomerInfo(IFormFile file, Dictionary<string, string> datos)
        {

            string result = "";
            blDB xDB = new blDB();
            BL.secToken sec = new BL.secToken();
            var objUinfo = sec.getUserInfo(this.auth);

            DataTable dt = xDB.getDT(@$"select * from tblcustomerinfo where belongtocia={objUinfo.uciaid}  limit 200");
            result = JsonConvert.SerializeObject(dt);
            return result;
        }

        public string getAllCutomersData(IFormFile file, Dictionary<string, string> collection)
        {
            blDB xDB = new blDB();
            BL.secToken sec = new BL.secToken();
            var objUinfo = sec.getUserInfo(this.auth);
            DataSet ds = xDB.getDataSet(@$"select * from tblcustomerinfo where belongtocia={objUinfo.uciaid} limit 200");
            string result = JsonConvert.SerializeObject(ds.Tables[0]);
            return result;
        }



        public string setDataCustomerinfo(IFormFile file, Dictionary<string, string> collection)
        {
            string result = "{\"result\":\"successful\"}";
            BL.secToken sec = new BL.secToken();
            var objUinfo = sec.getUserInfo(this.auth);

            blDB xDB = new blDB();
            int xid = -1;
            List<Dictionary<string, string>> GenericList = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(collection["gridfollows"].ToString());

            ///BL.ListtoDataTable lt = new BL.ListtoDataTable();
            //DataTable dtfollows = lt.ToDataTable(GenericList);

            //  CustomCommandBuilderObjDataTable cb = null;



            CustomCommandBuilderObjDataAdapter cb = null;

            Boolean ready = true;
            xDB.cnOpen();
            MySqlConnector.MySqlTransaction trans = xDB.mysqlCN.BeginTransaction();
            try
            {
                if (collection["id"].ToString() == "-1")
                {
                    cb = xDB.getCustomCBDS(@$"select * from tblcustomerinfo where 1=0 and belongtocia={objUinfo.uciaid};");
                    //cb.dt.Rows.Add(cb.dt.NewRow());
                    cb.ds.Tables[0].Rows.Add(cb.ds.Tables[0].NewRow());
                    // belong to  cia.
                    cb.ds.Tables[0].Rows[0]["belongtocia"] = objUinfo.uciaid;
                    cb.ds.Tables[0].Rows[0]["Createduname"] = objUinfo.uname;
                }
                else
                {
                    xid = Convert.ToInt32(collection["id"]);
                    cb = xDB.getCustomCBDS(@$"select * from tblcustomerinfo where id= {xid} and belongtocia={objUinfo.uciaid}");
                    if (cb.ds.Tables[0].Rows.Count != 1)
                    {
                        ready = false;
                        result = "{\"result\":\"fail\"}";
                    }
                }

                if (ready)
                {

                    // cb.dt.Rows[0]["customername"] = collection["customername"].ToString();
                    foreach (var item in collection)
                    {
                        if (!item.Key.Contains("grid"))
                        {
                            if (item.Key != "tmpservicetrandatechk")
                            {
                                cb.ds.Tables[0].Rows[0][item.Key] = collection[item.Key].ToString();
                            }
                        }
                    }

                    if (collection.ContainsKey("tmpservicetrandatechk"))
                    {
                        if (collection["tmpservicetrandatechk"].ToString() == "true")
                        {
                            if (cb.ds.Tables[0].Rows[0]["servicetrandate"] == DBNull.Value)
                            {
                                cb.ds.Tables[0].Rows[0]["servicetrandate"] = DateTime.Now.ToString("yyyy-MM-dd");
                            }
                        }

                    }
                    else
                    {
                        cb.ds.Tables[0].Rows[0]["servicetrandate"] = DBNull.Value;
                    }

                    cb.executeUpdate();
                    if (collection["id"].ToString() == "-1")
                    {
                        DataTable dtlastid = xDB.getDT("SELECT LAST_INSERT_ID() lastid");

                        if (dtlastid.Rows.Count == 1)
                        {
                            xid = Convert.ToInt32(dtlastid.Rows[0]["lastid"]);
                        }
                    }
                }





                // save gridfollows data ------------
                // en el grid debo de poner el user 

                // aqui borro todos lo record en la db

                if (GenericList.Count > 0)
                {

                    string[] aColumnsName = xDB.getDictionaryKeystoArray(GenericList[0]);


                    MySqlConnector.MySqlCommand cmdDelete = new MySqlConnector.MySqlCommand();
                    cmdDelete.CommandText = $"delete from tblfollows where idcustomer= {xid}";
                    cmdDelete.Connection = xDB.mysqlCN;
                    cmdDelete.ExecuteNonQuery();
                    //

                    cb = xDB.getCustomCBDS("select * from tblfollows where 1=0");
                    // int ccount = dtfollows.Columns.Count;
                    int ccount = GenericList[0].Count();
                    int rcount = GenericList.Count;

                    //for (int q = 0; q < dtfollows.Rows.Count; q++)
                    // each row
                    for (int q = 0; q < rcount; q++)
                    {

                        //if (dtfollows.Rows[q]["id"].ToString() == "-1")
                        //{
                        //cb = xDB.getCustomCBDT("select * from tblfollows where 1=0");
                        cb.ds.Tables[0].Rows.Add(cb.ds.Tables[0].NewRow());
                        // }
                        // else
                        // {
                        //     int xid = Convert.ToInt32(collection["id"]);
                        //     cb = xDB.getCustomCBDT($"select * from tblfollows where id= {dtfollows.Rows[q]["id"].ToString()}");
                        // }



                        // each field
                        string cname = "";
                        for (int x = 0; x < ccount; x++)
                        {
                            // cname = dtfollows.Columns[x].ColumnName;
                            cname = aColumnsName[x];
                            if (cname != "xchanged")  // only use to know if some chang in grid, this field is not include in database table.
                            {
                                if (cname.ToLower() == "idcustomer")
                                {
                                    cb.ds.Tables[0].Rows[q][cname] = xid;
                                }
                                else
                                {
                                    //cb.ds.Tables[0].Rows[q][cname] = dtfollows.Rows[q][cname];
                                    if (GenericList[q][cname] == null)
                                    {
                                        cb.ds.Tables[0].Rows[q][cname] = DBNull.Value;
                                        if (cname.ToLower() == "createddate" || cname.ToLower() == "lastupdatedate")
                                        {
                                            // if doesnt have value, I assign date value.
                                            cb.ds.Tables[0].Rows[q][cname] = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
                                        }
                                    }
                                    else
                                    {
                                        if (cname.ToLower() == "lastupdatedate" && Convert.ToInt32(GenericList[q]["xchanged"]) == 1)
                                        {
                                            cb.ds.Tables[0].Rows[q][cname] = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
                                        }
                                        else
                                        {
                                            cb.ds.Tables[0].Rows[q][cname] = GenericList[q][cname];
                                        }
                                        //if (cname.ToLower() == "lastupdatedate")
                                        //{
                                        //      cb.ds.Tables[0].Rows[q][cname] = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
                                        //string hh = "";
                                        // }
                                    }

                                }
                            }
                        }

                        //cb.executeUpdate();


                    }
                }
                else {
                  
                    MySqlConnector.MySqlCommand cmdDelete = new MySqlConnector.MySqlCommand();
                    cmdDelete.CommandText = $"delete from tblfollows where idcustomer= {collection["id"].ToString()}";
                    cmdDelete.Connection = xDB.mysqlCN;
                    cmdDelete.ExecuteNonQuery();
                }
                cb.executeUpdate();
                trans.Commit();
            }
            catch (Exception ex)
            {
                string errmsg = "Fail: " + ex.Message;
                // result = "{"+@$"result"":""{errmsg}"+"}";
                result = errmsg;
                trans.Rollback();
            }
            xDB.cnClose();
            //result = JsonConvert.SerializeObject(dt);
            //result = "{\"nada\":\"qloco\"}";
            return result;
        }

        public string getAllCutomersDataSubTables(IFormFile file, Dictionary<string, string> collection)
        {
            string custId = collection["custid"].ToString();
            blDB xDB = new blDB();
            DataSet ds = xDB.getDataSet($"select *,0 as xchanged from tblfollows where idcustomer={custId}");
            string result = JsonConvert.SerializeObject(ds.Tables[0]);
            return result;
        }

    }
}
