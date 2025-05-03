using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    [Table("Usuario")]
    public class Usuario
    {
        [Key]
        public int Id_usuario { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [MaxLength(100, ErrorMessage = "O nome de usuário não pode ter mais de 100 caracteres.")]
        public required string Nome_usuario { get; set; }

        [Required(ErrorMessage = "O nome da empresa é obrigatório.")]
        [MaxLength(100, ErrorMessage = "O nome da empresa não pode ter mais de 100 caracteres.")]
        public required string Nome_empresa { get; set; }

        [Required(ErrorMessage = "A área profissional é obrigatória.")]
        [MaxLength(100, ErrorMessage = "A área profissional não pode ter mais de 100 caracteres.")]
        public required string Area_profissional { get; set; }

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "O e-mail informado não é válido.")]
        public required string Email_usuario { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [MinLength(8, ErrorMessage = "A senha deve ter pelo menos 8 caracteres.")]
        public required string Senha_usuario { get; set; }

        public ICollection<Cliente>? Clientes { get; set; }
    }
}
