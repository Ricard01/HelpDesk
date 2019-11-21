using System.Collections.Generic;
using System.Linq;
using Admin.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Admin.API.Data
{
    public class Seed
    {
        #region ctor
        private readonly UserManager<User> _userManager;

        private readonly RoleManager<Role> _roleManager;

        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }
        #endregion

        public void SeedUsers()
        {
            if (!_userManager.Users.Any())
            {

                var roles = new List<Role>
                {
                    new Role{Name = "Admin"},
                    new Role{Name = "User"},
                    new Role{Name = "Otro"},
                    new Role{Name = "VIP"},
                };

                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                var adminUser = new User
                {
                    UserName = "Admin",
                    Activo = true
                };

                IdentityResult result = _userManager.CreateAsync(adminUser, "nolose").Result;

                if (result.Succeeded)
                {
                    var admin = _userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRolesAsync(admin, new[] { "Admin" }).Wait();
                }
            }
        }

    }
}