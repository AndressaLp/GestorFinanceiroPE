using Domain;
using Repository.Interfaces;
using Service.Interfaces;

namespace Service
{
    public class ServicoService : IServicoService
    {
        private readonly IServicoRepository _servicoRepository;

        public ServicoService(IServicoRepository servicoRepository)
        {
            _servicoRepository = servicoRepository;
        }

        public async Task<Servico> CriarServico(Servico servico)
        {
            servico.Status_pagamento = true;

            if(servico.Data_servico.Date > DateTime.Now.Date)
            {
                throw new ArgumentException("Cadastre apenas serviços que já foram feitos");
            }
            return await _servicoRepository.CriarServico(servico);
        }

        public async Task<Servico?> ObterServicoId(int id)
        {
            return await _servicoRepository.ObterServicoId(id);
        }

        public async Task<List<Servico>> ObterServicos(int usuarioId)
        {
            return await _servicoRepository.ObterServicos(usuarioId);
        }

        public async Task<Servico?> EditarServico(int id, Servico servicoAtualizado)
        {
            return await _servicoRepository.EditarServico(id, servicoAtualizado);
        }

        public async Task<bool> DeletarServico(int id, int usuarioId)
        {
            return await _servicoRepository.DeletarServico(id, usuarioId);
        }
    }
}
