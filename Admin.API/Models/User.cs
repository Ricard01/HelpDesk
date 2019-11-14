using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Admin.API.Models
{
    // int para que no reciba string
    public class User : IdentityUser<int>
    {
        public User()
        {
            // TicketsAsignados = new HashSet<TicketsAsignados>();
        }
        public string Puesto { get; set; }

        public DateTime FechaAlta { get; set; }
        public Boolean? Activo { get; set; }
        public string FotoUrl { get; set; }

        public string PublicId { get; set; }

        public Equipo Equipo { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }

        public ICollection<TicketsAsignados> TicketsAsignados { get; set; }

    }
}