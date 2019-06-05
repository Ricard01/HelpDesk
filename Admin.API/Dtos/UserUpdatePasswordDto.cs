using System.ComponentModel.DataAnnotations;

namespace Admin.API.Dtos
{
    public class UserUpdatePasswordDto
    {

public int Id { get; set; }
        [Required]
        [StringLength(12, MinimumLength = 6, ErrorMessage = "La contraseña no cumple con los requisitos de complejidad")]
        public string Password { get; set; }

    }
}