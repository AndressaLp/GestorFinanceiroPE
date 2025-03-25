using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    [Table("Usuario")]
    public class Usuario
    {
        [Key]
        public int Id_usuario { get; set; }
        public required string Nome_usuario { get; set; }
        public required string Nome_empresa { get; set; }
        public required string Area_profissional { get; set; }
        [EmailAddress]
        public required string Email_usuario { get; set; }
        public required string Senha_usuario { get; set; }

        public ICollection<Cliente> Clientes { get; set; }
    }
}
