using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Admin.API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int PaginaActual { get; set; }
        public int TotalPaginas { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public PagedList(List<T> items, int count, int numPagina, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            PaginaActual = numPagina;
            TotalPaginas = (int)Math.Ceiling(count / (double)pageSize);
            this.AddRange(items);
        }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, 
            int numPagina, int pageSize)
        {
            var count = await source.CountAsync();
            // items puede ser usuarios, productos servicios etc, 
            // pageSize =5 , si esta en la (pagina 2 -1 ) * 5)= 5 ,  omite los primeros 5 y muestra los siguiente 5 
            var items = await source.Skip((numPagina - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, numPagina, pageSize);
        }
    }
}