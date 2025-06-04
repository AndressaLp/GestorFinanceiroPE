using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    [Table("Clientes")]
    public class Cliente
    {
        [Key]
        public int Id_cliente { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [MaxLength(100, ErrorMessage = "O nome do cliente não pode ter mais de 100 caracteres.")]
        public required string Nome_cliente { get; set; }

        [Required(ErrorMessage = "O telefone é obrigatório.")]
        [MaxLength(20, ErrorMessage = "O telefone não pode ter mais de 20 caracteres.")]
        public required string Telefone { get; set; }

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "O e-mail informado não é válido.")]
        public required string Email_cliente { get; set; }

        [Required(ErrorMessage = "O endereço é obrigatório.")]
        [MaxLength(100, ErrorMessage = "O endereço não pode ter mais de 100 caracteres.")]
        public required string Endereco_rua { get; set; }

        [Required(ErrorMessage = "O bairro é obrigatório.")]
        [MaxLength(100, ErrorMessage = "O bairro não pode ter mais de 100 caracteres.")]
        public required string Bairro { get; set; }

        [Required(ErrorMessage = "O número é obrigatório.")]
        [MaxLength(10, ErrorMessage = "O número não pode ter mais de 10 caracteres.")]
        public required string Numero_residencia { get; set; }

        [Required(ErrorMessage = "A cidade é obrigatória.")]
        [MaxLength(100, ErrorMessage = "A cidade não pode ter mais de 100 caracteres.")]
        public required string Cidade { get; set; }

        [Required(ErrorMessage = "O estado é obrigatório.")]
        [MaxLength(25, ErrorMessage = "O estado não pode ter mais de 25 caracteres.")]
        public required string Estado { get; set; }

        public DateTime Data_cadastro { get; set; }
        public int Id_usuario { get; set; }
        public Usuario? Usuario { get; set; }
        [JsonIgnore]
        public ICollection<Servico>? Servicos { get; set; }
    }
}
