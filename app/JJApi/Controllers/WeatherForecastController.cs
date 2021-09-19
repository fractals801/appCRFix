using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using Newtonsoft.Json;

namespace JJApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
  
    public class WeatherForecastController : ControllerBase
    {
        IConfiguration _config;
        

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IConfiguration iconfig)
        {
            _logger = logger;
            this._config = iconfig;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }


        [HttpGet]
        //[EnableCors("JJPolicy")]
        [Route("/api/qloco")]
        public List<string> tst1()
        {
            List<string> li = new List<string>();

            li.Add("richard");
            li.Add("pagan");

            return li;
        }


        [HttpGet]
        //[EnableCors("JJPolicy")]
        [Route("/api/qloco3")]
        public DataTable tst3()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("col1");
            dt.Rows.Add(dt.NewRow());
            dt.Rows[0][0] = "esto es una prueba";
            return dt;
        }


        [HttpGet]
        //[EnableCors("JJPolicy")]
        [Route("/api/qloco2")]
        //[Produces("application/json")]
        public string tst2()
        {
            DataSet ds = new DataSet();
            string sqlstm = "SELECT * FROM rambutan.tblusers;";
            MySqlDataAdapter da = new MySqlDataAdapter(sqlstm, _config.GetConnectionString("ConnectionStr"));
            da.Fill(ds);

            //DataTable dt = new DataTable();
            //dt.Columns.Add("col1");
            //dt.Rows.Add(dt.NewRow());
            //dt.Rows[0][0] = "fdafdsafdsa";

            //return ds.Tables[0];

            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(ds);
            return JSONString;


        }

    }
}
