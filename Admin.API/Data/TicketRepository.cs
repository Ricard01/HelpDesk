using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin.API.Persistence;
using Admin.API.Helpers;
using Admin.API.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Admin.API.Data
{
    public class TicketRepository : ITicketRepository
    {
        private readonly AdminContext _context;
        private readonly IMapper _mapper;

        public TicketRepository(AdminContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<Ticket> GetTicket(int id)
        {
            var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == id);

            return ticket;
        }

        public async Task<object> GetTicketAsignadoById(int ticketId)
        {

            var ticket = await (from t in _context.Tickets.TagWith("GetTicketAsignadoById") where t.Id == ticketId

                                select new
                                {
                                    Id = t.Id,
                                    Titulo = t.Titulo,
                                    Mensaje = t.Mensaje,
                                    FechaAlta = t.FechaAlta,
                                    Prioridad = t.Prioridad,
                                    UserName = t.User.UserName,
                                    UserFotoUrl = t.User.FotoUrl,
                                    Adjuntos = from adjt in _context.AdjuntosTicket where adjt.TicketId == ticketId select adjt,

                                    TicketRespuestas = from resp in _context.TicketsRespuestas
                                                       where resp.TicketId == ticketId
                                                       orderby resp.Id
                                                       select new { resp.Id, resp.Respuesta, resp.Fecha, resp.Estatus, resp.User.UserName, resp.User.FotoUrl, resp.AdjuntosRespuesta }
                                                       //    adjResp = (from adjr in _context.AdjuntosRespuestas where adjr.TicketRespuestaId == resp.Id select adjr )},

                                }).FirstOrDefaultAsync();

            return ticket;
        }

        public async Task<List<Ticket>> GetMisTicketsAsignados(int idUser)
        {
            // Este quedo "perfecto"
            var tickets = from t in _context.Tickets.Include(u => u.User)
                          join ta in _context.TicketsAsignados on t.Id equals ta.TicketId
                          where
                            ta.UserId == idUser
                          select t;

            return await tickets.ToListAsync();
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