using Domain;
using Microsoft.AspNetCore.Http;

namespace Service.Interfaces
{
    public interface IUsuarioService
    {
        Task<Usuario> CriarUsuario(Usuario usuario);
        Task<Usuario?> ObterUsuario(int id);
        Task<Usuario?> ObterUsuarioEmail(string email);
        Task<Usuario?> AtualizarUsuario(int id, Usuario usuarioAtualizado);
        Task<bool> EnviarCodRecuperacao(string email);
        Task<bool> VerificarCodigo(string email, string codigo);
        Task<Usuario?> AtualizarSenha(int id, string senhaAtualizada);
        Task<bool> VerificarSenha(int id, string senhaDigitada);
        Task<string?> SalvarFotoPerfil(int id, IFormFile fotoPerfil);
        Task<bool> DeletarUsuario(int id);
        string GerarToken(Usuario usuario);
    }
}
