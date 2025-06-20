using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    [Table("Servicos")]
    public class Servico
    {
        [Key]
        public int Id_servico { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [MaxLength(100, ErrorMessage = "O nome do serviço não pode ter mais de 100 caracteres.")]
        public required string Nome_servico { get; set; }

        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [MaxLength(100, ErrorMessage = "A descrição não pode ter mais de 100 caracteres.")]
        public required string Descricao { get; set; }

        [Required(ErrorMessage = "A data é obrigatória.")]
        public DateTime Data_servico { get; set; }

        [Required(ErrorMessage = "O status do pagamento é obrigatório.")]
        public bool Status_pagamento { get; set; }

        [Required(ErrorMessage = "O valor do serviço é obrigatório.")]
        public required decimal Valor_servico { get; set; }

        public int Id_cliente { get; set; }
        public Cliente? Cliente { get; set; }
        public int Id_usuario { get; set; }
        public Usuario? Usuario { get; set; }
    }
}
