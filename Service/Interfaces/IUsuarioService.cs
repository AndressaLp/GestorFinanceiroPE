using Domain;

namespace Service.Interfaces
{
    public interface IUsuarioService
    {
        Task<Usuario> CriarUsuario(Usuario usuario);
        Task<Usuario?> ObterUsuario(int id);
        Task<Usuario?> ObterUsuarioEmail(string email);
        Task<Usuario?> AtualizarUsuario(int id, Usuario usuarioAtualizado);
        Task<Usuario?> AtualizarSenha(int id, string senhaAtualizada);
        Task<bool> VerificarSenha(int id, string senhaDigitada);
        Task<bool> DeletarUsuario(int id);
        string GerarToken(Usuario usuario);
    }
}
