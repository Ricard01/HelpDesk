using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Admin.API.Data;
using Admin.API.Dtos;
using Admin.API.Helpers;
using Admin.API.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

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
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;


        public TicketsController(IAdminRepository repo, ITicketRepository repot, IMapper mapper,
        DataContext context, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _context = context;
            _repot = repot;
            _repo = repo;

            Account acc = new Account(
              _cloudinaryConfig.Value.CloudName,
              _cloudinaryConfig.Value.ApiKey,
              _cloudinaryConfig.Value.ApiSecret
          );

            _cloudinary = new Cloudinary(acc);

        }

        [HttpGet("{ticketId}")]
        public async Task<IActionResult> GetTicketById(int ticketId)
        {
            var ticket = await _repot.GetTicket(ticketId);
            return Ok(ticket);
        }

        /// <summary>Crea una lista de Tickets para el usuario logeado.
        /// <para>TicketsAsignados.</para>
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
            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok(ticketToCreate.Id);
            }
            throw new Exception("Ocurrio un error al crear el ticket");
        }

        [HttpPost("Adjuntar/{ticketId}")]
        public async Task<IActionResult> AdjuntosTicket(int ticketId, [FromForm]AdjuntosTicketDto fileUploadDto)
        {
            // //valida que la peticion sea del usuario logeado
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var file = fileUploadDto.File;

            var uploadResult = new RawUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {

                    var uploadParams = new RawUploadParams()
                    {
                        // especifico los parametros para guardar el archivo
                        File = new FileDescription(file.FileName, stream),
                        UseFilename = true,
                        UniqueFilename = true,
                        Folder = "TicketsAdjuntos"
                    };

                    // Guarda el archivo en la nube 
                    uploadResult = _cloudinary.Upload(uploadParams);

                }


            }
            if (uploadResult.StatusCode.ToString() == "OK")
            {
                // mapeo los resultados devueltos 
                fileUploadDto.ArchivoUrl = uploadResult.Uri.ToString();
                fileUploadDto.PublicId = uploadResult.PublicId;
                fileUploadDto.TicketId = ticketId;
            }
            // mapeo el dto con la clase
            var adTicket = _mapper.Map<AdjuntosTicket>(fileUploadDto);
            _context.Add(adTicket);


            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok();
            }
            throw new Exception("Ocurrio un error al crear el ticket");
        }

       
    }
}