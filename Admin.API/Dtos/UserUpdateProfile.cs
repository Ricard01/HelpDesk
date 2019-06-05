using System;
using System.ComponentModel.DataAnnotations;

namespace Admin.API.Dtos
{
    public class UserUpdateProfile
    {

        public string Email { get; set; }
        public string Puesto { get; set; }
        
        [Required]
        public Boolean Activo { get; set; }
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Celular")]
        [RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "El numero de telefono no contiene un formato valido")]
        public string PhoneNumber { get; set; }

    }
}