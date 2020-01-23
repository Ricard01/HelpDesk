using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Admin.API.Dtos;
using Microsoft.AspNetCore.Identity;
using Admin.API.Models;
using Microsoft.Extensions.Options;
using Admin.API.Helpers;
using CloudinaryDotNet;
using System.Collections.Generic;
using Admin.API.Persistence;

namespace Admin.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {

        #region Ctor
        private readonly AdminContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public AdminController(
            AdminContext context,
            UserManager<User> userManager,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _userManager = userManager;
            _cloudinaryConfig = cloudinaryConfig;
            _context = context;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        #endregion

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("GetRoles/{id}")]
        public async Task<IActionResult> GetRoles(int id)
        {
             var roles = await _context.UserRoles.Where( r => r.UserId == id).ToListAsync();

            return Ok(roles);
            
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("userWithRoles/{id}")]
        public async Task<IActionResult> GetUsersWithRoles(int id)
        {
            var usersWithRoles = await (from user in _context.Users
                                  orderby user.UserName
                                  select new
                                  {
                                      Id = user.Id,
                                      Username = user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList()
                                  }).FirstOrDefaultAsync( u => u.Id == id);
            return Ok(usersWithRoles);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{username}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest("Ocurrion un fallo al agregar los roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest("Ocurrion un fallo al eliminar los roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }
    }
}