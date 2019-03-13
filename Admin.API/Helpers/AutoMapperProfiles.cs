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
            CreateMap<FileUploadDto, User>();

        }
    }
}