using Domain;
using Infradb;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class UsuarioRepository
    {
        private readonly AppDbContext _context;
        
        public UsuarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario> CriarUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario?> ObterUsuario(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<Usuario?> ObterUsuarioEmail(string email)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Email_usuario == email);
        }

        public async Task<Usuario?> AtualizarUsuario(int id, Usuario usuarioAtualizado)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return null;

            usuario.Nome_usuario = usuarioAtualizado.Nome_usuario;
            usuario.Nome_empresa = usuarioAtualizado.Nome_empresa;
            usuario.Area_profissional = usuarioAtualizado.Area_profissional;
            usuario.Email_usuario = usuarioAtualizado.Email_usuario;

            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario?> AtualizarSenha(int id, Usuario senhaAtualizada)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return null;

            usuario.Senha_usuario = senhaAtualizada.Senha_usuario;

            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<bool> DeletarUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return false;

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
