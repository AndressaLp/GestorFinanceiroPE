using Domain;
using Infradb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class ClienteRepository
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

        public async Task<List<Cliente>> ObterClientes()
        {
            return await _context.Clientes.ToListAsync();
        }

        public async Task<Cliente?> ObterClienteId(int id)
        {
            return await _context.Clientes.FindAsync(id);
        }

        public async Task<Cliente?> AtualizarCliente(int id, Cliente clienteAtualizado)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if(cliente == null) return null;

            cliente.Nome_cliente = clienteAtualizado.NomeCliente;
            cliente.Telefone = clienteAtualizado.Telefone;
            cliente.Email_cliente = clienteAtualizado.EmailCliente;
            cliente.Endereco_rua = clienteAtualizado.EnderecoRua;
            cliente.Numero_residencia = clienteAtualizado.NumeroResidencia;
            cliente.Bairro = clienteAtualizado.Bairro;
            cliente.Cidade = clienteAtualizado.Cidade;
            cliente.Estado = clienteAtualizado.Estado;

            await _context.SaveChangesAsync();
            return cliente;
        }

        public async Task<bool> DeletarCliente(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if(cliente == null) return false;

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
