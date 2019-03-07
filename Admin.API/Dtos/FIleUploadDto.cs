using System;
using Microsoft.AspNetCore.Http;

namespace Admin.API.Dtos
{
    public class FIleUploadDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        // public string Descripcion { get; set; }
        // public DateTime FechaAlta { get; set; }
        public string PublicId { get; set; }

        // public FIleUploadDto()
        // {
        //     FechaAlta = DateTime.Now;
        // }
    }
}