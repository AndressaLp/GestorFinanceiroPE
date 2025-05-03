using Domain;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class ClienteService
    {
        private readonly ClienteRepository _clienteRepository;

        public ClienteService(ClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        public async Task<Cliente> CriarCliente(Cliente cliente)
        {
            return await _clienteRepository.CriarCliente(cliente);
        }

        public async Task<List<Cliente>> ObterClientes()
        {
            return await _clienteRepository.ObterClientes();
        }

        public async Task<Cliente?> ObterClienteId(int id)
        {
            return await _clienteRepository.ObterClienteId(id);
        }

        public async Task<Cliente?> AtualizarCliente(int id, Cliente clienteAtualizado)
        {
            return await _clienteRepository.AtualizarCliente(id, clienteAtualizado);
        }

        public async Task<bool> DeletarCliente(int id)
        {
            return await _clienteRepository.DeletarCliente(id);
        }
    }
}
