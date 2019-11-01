using Microsoft.AspNetCore.Http;

namespace Admin.API.Helpers
{
    public class AdjuntosRespuestaDto
    {
        public int TicketRespuestaId { get; set; }

        public string Nombre { get; set; }

        public string ArchivoUrl { get; set; }
        public IFormFile File { get; set; }
        // public string Descripcion { get; set; }

        public string PublicId { get; set; }


    }


}