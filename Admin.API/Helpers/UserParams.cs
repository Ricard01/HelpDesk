using System;

namespace Admin.API.Helpers
{
    public class UserParams
    {
        private const int MaxItemsPagina = 100;
        public int NumPagina { get; set; } = 1;
        private int itemsxPagina = 10;
        public int ItemsxPagina
        {
            get { return itemsxPagina; }
            set { itemsxPagina = (value > MaxItemsPagina) ? MaxItemsPagina : value; }
        }

        public int UserId { get; set; }

        public int? Estatus { get; set; }

        public DateTime? FechaIni { get; set; }  

        public DateTime? FechaFin { get; set; }
        public string OrderBy { get; set; }

    }
}