using Domain;
using Microsoft.AspNetCore.Identity;
using Repository;

namespace Service
{
    public class UsuarioService
    {
        private readonly UsuarioRepository _usuarioRepository;
        private readonly PasswordHasher<Usuario> _passwordHasher;

        public UsuarioService(UsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
            _passwordHasher = new PasswordHasher<Usuario>();
        }

        public async Task<Usuario> CriarUsuario(Usuario usuario)
        {
            usuario.Senha_usuario = _passwordHasher.HashPassword(usuario, usuario.Senha_usuario);
            return await _usuarioRepository.CriarUsuario(usuario);
        }

        public async Task<Usuario?> ObterUsuario(int id)
        {
            return await _usuarioRepository.ObterUsuario(id);
        }

        public async Task<Usuario?> AtualizarUsuario(int id, Usuario usuarioAtualizado)
        {
            return await _usuarioRepository.AtualizarUsuario(id, usuarioAtualizado);
        }

        public async Task<Usuario?> AtualizarSenha(int id, string senhaAtualizada)
        {
            var usuario = await _usuarioRepository.ObterUsuario(id);
            if (usuario == null) return null;

            usuario.Senha_usuario = _passwordHasher.HashPassword(usuario, senhaAtualizada);
            return await _usuarioRepository.AtualizarSenha(id, usuario);
        }

        public async Task<bool> VerificarSenha(int id, string senhaDigitada)
        {
            var usuario = await _usuarioRepository.ObterUsuario(id);
            if (usuario ==  null) return false;

            var verificacao = _passwordHasher.VerifyHashedPassword(usuario, usuario.Senha_usuario, senhaDigitada);
            return verificacao == PasswordVerificationResult.Success;
        }

        public async Task<bool> DeletarUsuario(int id)
        {
            return await _usuarioRepository.DeletarUsuario(id);
        }
    }
}
