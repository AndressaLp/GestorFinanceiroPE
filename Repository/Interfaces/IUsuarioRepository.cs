using Domain;

namespace Repository.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario> CriarUsuario(Usuario usuario);
        Task<Usuario?> ObterUsuario(int id);
        Task<Usuario?> ObterUsuarioEmail(string email);
        Task<Usuario?> AtualizarUsuario(int id, Usuario usuarioAtualizado);
        Task<Usuario?> AtualizarSenha(int id, Usuario senhaAtualizada);
        Task<bool> DeletarUsuario(int id);
    }
}
