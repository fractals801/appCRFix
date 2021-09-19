using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JJApi.BL
{
    public class secToken:Page
    {
       
        public string GenerateJSONWebToken(string prole,
            string uname,string uemail,string ufullname,string uciaId,string udefaulttemplate,string umasteruser,
            string jwtkey,int jwttimeexpireinminutes= 5)
        {

            // NEW VERSION 
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(jwtkey);



            string[] aroles = prole.Split(',');
            List<Claim> Claims = new List<Claim>();
            foreach (string rol in aroles)
            {
                Claims.Add(new Claim("role", rol));
            }
            Claims.Add(new Claim("uname", uname));
            Claims.Add(new Claim("uemail", uemail));
            Claims.Add(new Claim("ufullname", ufullname));
            Claims.Add(new Claim("uciaid", uciaId));
            Claims.Add(new Claim("udefaulttemplate", udefaulttemplate));
            Claims.Add(new Claim("umasteruser", umasteruser));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //Subject = new ClaimsIdentity(new[] { new Claim("role", prole) , new Claim("role", "carde") }),
                Subject = new ClaimsIdentity(Claims),
                Expires = DateTime.UtcNow.AddMinutes(jwttimeexpireinminutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);


        }

        public override Task ExecuteAsync()
        {
            throw new NotImplementedException();
        }

        public string readJWTToken(string authHeader,string searchField) {
           // string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = jsonToken as JwtSecurityToken;
            var result = tokenS.Claims.First(claim => claim.Type == searchField).Value;
            return result;
        }


       
        public dynamic getUserInfo(string pAuth)
        {

            BL.secToken sc = new BL.secToken();
            //string pAuth = Request.Headers["Authorization"].ToString();
            return new
            {
                uname = sc.readJWTToken(pAuth, "uname"),
                role = sc.readJWTToken(pAuth, "role"),
                uemail = sc.readJWTToken(pAuth, "uemail"),
                ufullname= sc.readJWTToken(pAuth, "ufullname"),
                uciaid=sc.readJWTToken(pAuth,"uciaid"),
                umasteruser=sc.readJWTToken(pAuth,"umasteruser"),
                udefaulttemplate = sc.readJWTToken(pAuth, "udefaulttemplate")
            };
        }



    }
}
