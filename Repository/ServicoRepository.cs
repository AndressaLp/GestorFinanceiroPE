using Domain;
using Infradb;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;

namespace Repository
{
    public class ServicoRepository : IServicoRepository
    {
        private readonly AppDbContext _context;

        public ServicoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Servico> CriarServico(Servico servico)
        {
            _context.Servicos.Add(servico);
            await _context.SaveChangesAsync();
            return servico;
        }

        public async Task<Servico?> ObterServicoId(int id)
        {
            return await _context.Servicos.Include(s => s.Cliente).FirstOrDefaultAsync(s => s.Id_servico == id);
        }

        public async Task<List<Servico>> ObterServicos(int usuarioId)
        {
            return await _context.Servicos.Where(c => c.Id_usuario == usuarioId).Include(s => s.Cliente).ToListAsync();
        }

        public async Task<Servico?> EditarServico(int id, Servico servicoAtualizado)
        {
            var servico = await _context.Servicos.FindAsync(id);
            if (servico == null || servico.Id_usuario != servicoAtualizado.Id_usuario) return null;

            servico.Nome_servico = servicoAtualizado.Nome_servico;
            servico.Descricao = servicoAtualizado.Descricao;
            servico.Data_servico = servicoAtualizado.Data_servico;
            servico.Valor_servico = servicoAtualizado.Valor_servico;
            servico.Status_pagamento = servicoAtualizado.Status_pagamento;
            servico.Id_cliente = servicoAtualizado.Id_cliente;

            await _context.SaveChangesAsync();
            return servico;
        }

        public async Task<bool> DeletarServico(int id, int usuarioId)
        {
            var servico = await _context.Servicos.FirstOrDefaultAsync(s => s.Id_servico == id && s.Id_usuario == usuarioId);
            if(servico == null || servico.Id_usuario != usuarioId) return false;

            _context.Servicos.Remove(servico);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
