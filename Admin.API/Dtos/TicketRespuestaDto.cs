using System;

namespace Admin.API.Dtos
{
    public class TicketRespuestaDto
    {
        public int Id { get; set; }

        public int TicketId { get; set; }

        public int UserId { get; set; }

        public string Respuesta { get; set; }

        public byte Estatus { get; set; }

        public DateTime Fecha { get; set; }

        public UserDto User { get; set; }


    }
}