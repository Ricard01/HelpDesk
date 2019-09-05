namespace Admin.API.Models
{
    public class AdjuntosTicket
    {
        public int Id { get; set; }

        public int TicketId { get; set; }

        public string FotoUrl { get; set; }

        public string PublicId { get; set; }

        public virtual Ticket Ticket { get; set; }


    }
}