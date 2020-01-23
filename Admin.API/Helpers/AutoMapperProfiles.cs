using System.Linq;
using AutoMapper;
using Admin.API.Dtos;
using Admin.API.Models;

namespace Admin.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Source, 
            // Origen , Destino 
            CreateMap<User, UserDto>();
            
            CreateMap<User, UserForDetailedDto>();
            CreateMap<User, UserDetDto>();
            CreateMap<User, UserForReturnDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserUpdatePasswordDto, User>();
            CreateMap<UserUpdateProfileDto, User>();
            CreateMap<FileUploadDto, User>();
            CreateMap<Equipo, EquipoDto>();
            CreateMap<Equipo, EquipoListDto>();
            CreateMap<EquipoListDto, Equipo>();
            CreateMap<EquipoUpdDto, Equipo>();


            // Maps GetTicketsAsignadosById
            CreateMap<Ticket, TicketDto>();
            CreateMap<AdjuntosTicket, AdjuntosTicketDetalleDto>();
            CreateMap<TicketsAsignados, TicketsAsignadosDto>();

            CreateMap<TicketNewDto, Ticket>();
            CreateMap<Ticket, TicketListDto>();
            // CreateMap<TicketListDto, UserDto>();
            CreateMap<TicketsAsignados, TicketsAsignadosDto>()
            .ForMember(dest => dest.Id, opt =>
          {
              opt.MapFrom(d => d.UserId);
          }); ;
            CreateMap<TicketsAsignadosDto, TicketsAsignados>()
             .ForMember(dest => dest.UserId, opt =>
             {
                 opt.MapFrom(d => d.Id);
             });
            CreateMap<AdjuntosTicketDto, AdjuntosTicket>();
            CreateMap<AdjuntosRespuestaDto, AdjuntosRespuesta>();

            // CreateMap<TicketRespuesta, TicketRespuestaDto>();

            // update respuesta 
            CreateMap<TicketRespuestaDto, TicketRespuesta>();
            // CreateMap<TicketNewDto, UserDto>();
            // CreateMap<TicketNewDto, TicketsAsignadosDto>();


        }
    }
}