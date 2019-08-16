namespace Admin.API.Helpers
{
    public class UserParams
    {
        private const int MaxItemsPagina = 50;
        public int NumPagina { get; set; } = 1;
        private int itemsxPagina = 10;
        public int ItemsxPagina
        {
            get { return itemsxPagina;}
            set { itemsxPagina = (value > MaxItemsPagina) ? MaxItemsPagina : value;}
        }

        public int UserId { get; set; }
        public string OrderBy { get; set; }
      
    }
}