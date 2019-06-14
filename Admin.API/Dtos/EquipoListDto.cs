using System;
using Admin.API.Models;

namespace Admin.API.Dtos
{
    public class EquipoListDto
    {
        public int Id { get; set; }

        public string NombreEquipo { get; set; }

        public string Ip { get; set; }

        public string Caracteristicas { get; set; }

        public Boolean Activo { get; set; }

        public int IdUser { get; set; }
        

        // public User UserEquipo { get; set; }

    }
}