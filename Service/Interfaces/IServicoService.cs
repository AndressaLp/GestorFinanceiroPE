using Domain;

namespace Service.Interfaces
{
    public interface IServicoService
    {
        Task<Servico> CriarServico(Servico servico);
        Task<Servico?> ObterServicoId(int id);
        Task<List<Servico>> ObterServicos(int usuarioId);
        Task<Servico?> EditarServico(int id, Servico servicoAtualizado);
        Task<bool> DeletarServico(int id, int usuarioId);
    }
}
