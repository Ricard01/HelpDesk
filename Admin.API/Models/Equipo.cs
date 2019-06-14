using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Admin.API.Models
{
    public class Equipo
    {
        public int Id { get; set; }

        public string NombreEquipo { get; set; }

        public string Ip { get; set; }

        public string Caracteristicas { get; set; }

        public Boolean Activo { get; set; }
        public int?  IdUser { get; set; }

    }
}