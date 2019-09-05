using Admin.API.Models;

namespace Admin.API.Dtos
{
    public class TicketsAsignadosDto
    {
        public int TicketId { get; set; }

        public int UserId { get; set; }

        public UserDto UserDto { get; set; }

        public Ticket Ticket { get; set; }
    }
}