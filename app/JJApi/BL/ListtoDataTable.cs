using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace JJApi.BL
{
    public class ListtoDataTable
    {
        public DataTable ToDataTable<T>(List<Dictionary<string, T>> list)
        {
            DataTable dataTable = new DataTable();

            if (list == null || !list.Any()) return dataTable;

            foreach (var column in list.First().Select(c => new DataColumn(c.Key, typeof(T))))
            {
                dataTable.Columns.Add(column);
            }

            foreach (var row in list.Select(
                r =>
                {
                    var dataRow = dataTable.NewRow();
                    r.ToList().ForEach(c => { 
                        try 
                        { 
                            dataRow.SetField(c.Key, c.Value); 
                        } catch(Exception ex) 
                        { 
                        
                        }  
                    }
                    );

                    return dataRow;
                }))
            {
                dataTable.Rows.Add(row);
            }

            return dataTable;
        }
    }

}
