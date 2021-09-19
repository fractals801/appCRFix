using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using MySqlConnector;


public class blDB
    {
        IConfiguration _config = new ConfigurationBuilder()
              .SetBasePath(System.IO.Directory.GetCurrentDirectory())
              .AddJsonFile("appSettings.json", optional: true, reloadOnChange: true).Build();

       public MySqlConnection mysqlCN = null;

        public blDB() {

            mysqlCN =new MySqlConnection( _config.GetConnectionString("ConnectionStr"));
        }

    public string[] getDictionaryKeystoArray(Dictionary<string, string> dic) {
        List<string> tmplist = new List<string>();
        foreach (string key  in dic.Keys) {
            tmplist.Add(key);
        }

        return tmplist.ToArray();
    }
        public DataSet getDataSet(string sqlstm) {
            DataSet ds = new DataSet();
            MySqlDataAdapter da = new MySqlDataAdapter(sqlstm,this.mysqlCN);
            da.Fill(ds);
            return ds;
        }

    public void cnOpen() {
        if (mysqlCN.State != ConnectionState.Open)
        {
            mysqlCN.Open();
        }
    }

    public void cnClose()
    {
        if (mysqlCN.State == ConnectionState.Open || mysqlCN.State==ConnectionState.Broken)
        {
            mysqlCN.Close();
        }
    }

    public DataTable getDT(string sqlstm)
        {
            DataTable dt = new DataTable();
            MySqlDataAdapter da = new MySqlDataAdapter(sqlstm, this.mysqlCN);
            da.Fill(dt);
            
            return dt;
        }


        public CustomCommandBuilderObjDataAdapter getCustomCBDS(string sqlstm)
        {   
            DataSet ds = new DataSet();
            MySqlDataAdapter da = new MySqlDataAdapter(sqlstm, this.mysqlCN);
            MySqlCommandBuilder cb = new MySqlCommandBuilder(da);
            da.Fill(ds);
            CustomCommandBuilderObjDataAdapter ccb = new CustomCommandBuilderObjDataAdapter(ds,da);
            return ccb;
        }



        public CustomCommandBuilderObjDataTable getCustomCBDT(string sqlstm)
        {
            DataTable dt = new DataTable();
            MySqlDataAdapter da = new MySqlDataAdapter(sqlstm, this.mysqlCN);
            MySqlCommandBuilder cb = new MySqlCommandBuilder(da);
            da.Fill(dt);
            CustomCommandBuilderObjDataTable ccb = new CustomCommandBuilderObjDataTable(dt, da);

            return ccb;
        }


   


    }









    public class CustomCommandBuilderObjDataAdapter {
       public DataSet ds = null;
       public MySqlDataAdapter da = null;

        public CustomCommandBuilderObjDataAdapter(DataSet pds,MySqlDataAdapter pda) {
            this.ds = pds;
            this.da = pda;
        }
        public void executeUpdate() {
            this.da.Update(this.ds);
        }
    }


    public class CustomCommandBuilderObjDataTable
    {
        public DataTable  dt = null;
        public MySqlDataAdapter da = null;

        public CustomCommandBuilderObjDataTable(DataTable pdt, MySqlDataAdapter pda)
        {
            this.dt = pdt;
            this.da = pda;
        }
        public void executeUpdate()
        {
            this.da.Update(this.dt);
        }
    }



