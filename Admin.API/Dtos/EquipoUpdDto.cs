using System;

namespace Admin.API.Dtos
{
    public class EquipoUpdUserDto
    {
        public int Id { get; set; }

        // public string NombreEquipo { get; set; }

        // public string Ip { get; set; }

        // public string Caracteristicas { get; set; }

        // public Boolean Activo { get; set; }

        public int? UserId { get; set; }
    }

    public class EquipoUpdDto
    {
       
        public string NombreEquipo { get; set; }

        public string Ip { get; set; }

        public string Caracteristicas { get; set; }

        public Boolean Activo { get; set; }

       
    }

    
}