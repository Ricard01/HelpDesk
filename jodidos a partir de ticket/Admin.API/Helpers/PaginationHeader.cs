namespace Admin.API.Helpers
{
    public class PaginationHeader
    {
        public int PaginaActual { get; set; }
        public int ItemsxPagina { get; set; }
        public int TotalItems { get; set; }
        public int TotalPaginas { get; set; }

        public PaginationHeader(int paginaActual, int itemsxPagina, int totalItems, int totalPaginas)
        {
            this.PaginaActual = paginaActual;
            this.ItemsxPagina = itemsxPagina;
            this.TotalItems = totalItems;
            this.TotalPaginas = totalPaginas;
        }
    }
}