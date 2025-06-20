using Domain;

namespace Repository.Interfaces
{
    public interface IServicoRepository
    {
        Task<Servico> CriarServico(Servico servico);
        Task<Servico?> ObterServicoId(int id);
        Task<List<Servico>> ObterServicos(int usuarioId);
        Task<Servico?> EditarServico(int id, Servico servicoAtualizado);
        Task<bool> DeletarServico(int id, int usuarioId);
    }
}
