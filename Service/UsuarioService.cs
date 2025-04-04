using Domain;
using Repository;

namespace Service
{
    public class UsuarioService
    {
        private readonly UsuarioRepository _usuarioRepository;

        public UsuarioService(UsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario> CriarUsuario(Usuario usuario)
        {
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

        public async Task<Usuario?> AtualizarSenha(int id, Usuario senhaAtualizada)
        {
            return await _usuarioRepository.AtualizarSenha(id, senhaAtualizada);
        }

        public async Task<bool> DeletarUsuario(int id)
        {
            return await _usuarioRepository.DeletarUsuario(id);
        }
    }
}
