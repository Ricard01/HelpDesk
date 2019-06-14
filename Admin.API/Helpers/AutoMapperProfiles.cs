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

            CreateMap<User, UserForDetailedDto>();
            CreateMap<User, UserForReturnDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserUpdatePasswordDto, User>();
            CreateMap<UserUpdateProfileDto, User>();
            CreateMap<FileUploadDto, User>();
            CreateMap<Equipo, EquipoListDto>();
            CreateMap<EquipoListDto, Equipo>();
            CreateMap<EquipoUpdDto, Equipo>();

        }
    }
}