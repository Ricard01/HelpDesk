using System;

namespace Admin.API.Dtos
{
    public class FileReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaAlta { get; set; }
        // public bool IsMain { get; set; }
        public string PublicId { get; set; }
      
    }
}