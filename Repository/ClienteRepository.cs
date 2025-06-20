using Domain;
using Infradb;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;

namespace Repository
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly AppDbContext _context;

        public ClienteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Cliente> CriarCliente(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return cliente;
        }

        public async Task<List<Cliente>> ObterClientes(int usuarioId)
        {
            return await _context.Clientes.Where(c => c.Id_usuario == usuarioId).ToListAsync();
        }

        public async Task<Cliente?> ObterClienteId(int id)
        {
            return await _context.Clientes.FindAsync(id);
        }

        public async Task<Cliente?> AtualizarCliente(int id, Cliente clienteAtualizado)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if(cliente == null || cliente.Id_usuario != clienteAtualizado.Id_usuario) return null;

            cliente.Nome_cliente = clienteAtualizado.Nome_cliente;
            cliente.Telefone = clienteAtualizado.Telefone;
            cliente.Email_cliente = clienteAtualizado.Email_cliente;
            cliente.Endereco_rua = clienteAtualizado.Endereco_rua;
            cliente.Numero_residencia = clienteAtualizado.Numero_residencia;
            cliente.Bairro = clienteAtualizado.Bairro;
            cliente.Cidade = clienteAtualizado.Cidade;
            cliente.Estado = clienteAtualizado.Estado;

            await _context.SaveChangesAsync();
            return cliente;
        }

        public async Task<bool> DeletarCliente(int id, int usuarioId)
        {
            var cliente = await _context.Clientes.FirstOrDefaultAsync(s => s.Id_cliente == id && s.Id_usuario == usuarioId);
            if(cliente == null || cliente.Id_usuario != usuarioId) return false;

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
