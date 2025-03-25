using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Servico
    {
        public int IdServico { get; set; }
        public string NomeServico { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public bool StatusPagamento { get; set; }
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }
    }
}
