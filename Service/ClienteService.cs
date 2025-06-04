using Domain;
using Repository;
using Repository.Interfaces;
using Service.Interfaces;

namespace Service
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _clienteRepository;

        public ClienteService(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        public async Task<Cliente> CriarCliente(Cliente cliente)
        {
            return await _clienteRepository.CriarCliente(cliente);
        }

        public async Task<List<Cliente>> ObterClientes(int usuarioId)
        {
            return await _clienteRepository.ObterClientes(usuarioId);
        }

        public async Task<Cliente?> ObterClienteId(int id)
        {
            return await _clienteRepository.ObterClienteId(id);
        }

        public async Task<Cliente?> AtualizarCliente(int id, Cliente clienteAtualizado)
        {
            return await _clienteRepository.AtualizarCliente(id, clienteAtualizado);
        }

        public async Task<bool> DeletarCliente(int id, int usuarioId)
        {
            return await _clienteRepository.DeletarCliente(id, usuarioId);
        }
    }
}
