using Admin.API.Models;

namespace Admin.API.Dtos
{
    public class TicketsAsignadosDto
    {
        public int TicketId { get; set; }
        public int Id { get; set; }


        // Se comentaron porque en teoria no deberian estar aqui ademas de que no tienen relacion

         public UserDto User { get; set; }

        // public Ticket Ticket { get; set; }
    }
}