using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Cliente
    {
        public int IdCliente { get; set; }
        public string NomeCliente { get; set; }
        public string Telefone { get; set; }
        public string EmailCliente { get; set; }
        public string EnderecoRua { get; set; }
        public string Bairro { get; set; }
        public string NumeroResidencia { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public ICollection<Servico> Servicos { get; set; }
    }
}
