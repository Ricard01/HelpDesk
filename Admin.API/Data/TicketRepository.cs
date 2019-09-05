/*

========================= START USER IS IN ROLE = X =========================
    User.IsInRole("rolename");
========================= END USER IS IN ROLE = X =========================






 */



    
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin.API.Helpers;
using Admin.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Admin.API.Data
{
    public class TicketRepository : ITicketRepository
    {
        private readonly DataContext _context;

        public TicketRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Ticket> GetTicket(int id)
        {
            var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == id);

            return ticket;
        }

        public async Task<List<Ticket>> GetMyTickets(int idUser)
        {

            var tickets =    from t in _context.Tickets.Include( u => u.User)
            join ta in _context.TicketsAsignados on t.Id equals ta.TicketId
            where
              ta.UserId == idUser
            select t;
           
       
          
                // var tickets1 = await _context.Tickets.Include(ta => ta.TicketsAsignados.All(t => t.UserId == idUser)).ToListAsync();
            // tickets = tickets.Where(tickets.TicketsAsignados.UserId == idUser);
            return await tickets.ToListAsync() ;
        }

        public async Task<PagedList<Ticket>> GetTickets(UserParams userParams)
        {
            var tickets = _context.Tickets.Include(u => u.User).OrderBy(u => u.Id).AsQueryable();

            // tickets = tickets.Where(u => u.UserId == userParams.UserId);

            // if (userParams.Estatus > 0)
            // {
            //     tickets = tickets.Where(t => t.Status == userParams.Estatus);
            // }

            // if (userParams.FechaIni != null && userParams.FechaFin != null)
            // {


            //     tickets = tickets.Where(t => t.FechaAlta >= userParams.FechaIni && t.FechaAlta <= userParams.FechaFin);
            // }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "Id":
                        tickets = tickets.OrderBy(u => u.Id);
                        break;

                    case "Estatus":
                        tickets = tickets.OrderBy(u => u.Estatus);
                        break;

                    case "estatus":
                        tickets = tickets.OrderByDescending(u => u.Estatus);
                        break;

                    case "Fecha":
                        tickets = tickets.OrderBy(u => u.FechaAlta);
                        break;

                    case "fecha":
                        tickets = tickets.OrderByDescending(u => u.FechaAlta);
                        break;

                    case "Prioridad":
                        tickets = tickets.OrderBy(u => u.Prioridad);
                        break;

                    case "prioridad":
                        tickets = tickets.OrderByDescending(u => u.Prioridad);
                        break;

                    case "Usuario":
                        tickets = tickets.OrderBy(u => u.User.UserName);
                        break;

                    case "usuario":
                        tickets = tickets.OrderByDescending(u => u.User.UserName);
                        break;


                    default:
                        tickets = tickets.OrderByDescending(u => u.Id);
                        break;
                }
            }

            return await PagedList<Ticket>.CreateAsync(tickets, userParams.NumPagina, userParams.ItemsxPagina);
        }

    }
}