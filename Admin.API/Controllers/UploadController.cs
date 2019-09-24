using System.Security.Claims;
using System.Threading.Tasks;
using Admin.API.Data;
using Admin.API.Dtos;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Admin.API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Admin.API.Controllers
{
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class UploadController : ControllerBase
    {

        private readonly IAdminRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public UploadController(IAdminRepository repo, IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<FileReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,
          [FromForm]FileUploadDto fileUploadDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId, true);

            if (userFromRepo.PublicId != null)
            {
                DeleteFile(userFromRepo.PublicId);
            }

            var file = fileUploadDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Folder = "User",
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face"),
                        Overwrite = true,
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            fileUploadDto.FotoUrl = uploadResult.Uri.ToString();
            fileUploadDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map(fileUploadDto, userFromRepo);

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<UserForDetailedDto>(userFromRepo);
                return CreatedAtRoute("GetPhoto", new { id = userId }, photoToReturn);
            }

            return BadRequest("No se pudo agregar la foto");
        }
      
        // TODO log si no logro eliminar la foto .
        [HttpGet("{publicId}", Name = "DeleteFile")]
        public void DeleteFile(string publicId)
        {

            if (publicId != null)
            {
                var deleteParams = new DeletionParams(publicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                {
                    publicId = "";
                }
            }

        }

    }

}