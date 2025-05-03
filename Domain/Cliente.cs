using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    [Table("Clientes")]
    public class Cliente
    {
        public int ClienteId { get; set; }
        public required string NomeCliente { get; set; }
        public required string Telefone { get; set; }
        public required string EmailCliente { get; set; }
        public required string EnderecoRua { get; set; }
        public required string Bairro { get; set; }
        public required string NumeroResidencia { get; set; }
        public required string Cidade { get; set; }
        public required string Estado { get; set; }
        public int UsuarioId { get; set; }
        public required Usuario Usuario { get; set; }
        //public required ICollection<Servico> Servicos { get; set; }
    }
}
