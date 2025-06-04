using Domain;

namespace Repository.Interfaces
{
    public interface IClienteRepository
    {
        Task<Cliente> CriarCliente(Cliente cliente);
        Task<List<Cliente>> ObterClientes(int usuarioId);
        Task<Cliente?> ObterClienteId(int id);
        Task<Cliente?> AtualizarCliente(int id, Cliente clienteAtualizado);
        Task<bool> DeletarCliente(int id, int usuarioId);
    }
}
