using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Admin.API.Data;
using Admin.API.Dtos;
using Admin.API.Helpers;
using Admin.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Admin.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private const string V = "titulo";
        private readonly IAdminRepository _repo;
        private readonly ITicketRepository _repot;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public TicketsController(IAdminRepository repo, ITicketRepository repot, IMapper mapper,
        DataContext context)
        {
            _mapper = mapper;
            _context = context;
            _repot = repot;
            _repo = repo;

        }

        [HttpGet("{ticketId}")]
        public async Task<IActionResult> GetTicket(int ticketId)
        {
            // var ticketA = Ticket.TicketAsignados.UserId;
            var ticket = await _repot.GetTicket(ticketId);
            return Ok(ticket);
        }

        /// <summary>Crea la lista de Tickets para el usuario logeado.
        /// <para>TicketsASginados.</para>
        /// </summary>  
        [HttpGet("My")]
        public async Task<IActionResult> GetMyTickets()
        {
            var currentUserID = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserID);

            if (userFromRepo == null)
            {
                return NoContent();
            }

            var tickets = await _repot.GetMyTickets(userFromRepo.Id);

            var ticketsReturn = _mapper.Map<IEnumerable<TicketListDto>>(tickets);

            return Ok(ticketsReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetTickets([FromQuery]UserParams userParams)
        {

            var currentUserID = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserID);

            userParams.UserId = userFromRepo.Id;


            var tickets = await _repot.GetTickets(userParams);

            var ticketsReturn = _mapper.Map<IEnumerable<TicketListDto>>(tickets);

            Response.AddPagination(tickets.PaginaActual, tickets.PageSize,
            tickets.TotalCount, tickets.TotalPaginas);

            return Ok(ticketsReturn);
        }


        [HttpPost]
        public async Task<IActionResult> CreateTicket(TicketNewDto ticketDto)
        {
            var ticketToCreate = _mapper.Map<Ticket>(ticketDto);
            _context.Add(ticketToCreate);

            if (await _repo.SaveAll())
            {

                return Ok();
            }


            throw new Exception("Ocurrio un error al crear el ticket");


        }
    }
}