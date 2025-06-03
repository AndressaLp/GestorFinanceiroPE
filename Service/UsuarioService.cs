using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Repository.Interfaces;
using Service.Interfaces;

namespace Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IPasswordHasher<Usuario> _passwordHasher;
        private readonly IConfiguration _configuration;

        public UsuarioService(IUsuarioRepository usuarioRepository, IConfiguration configuration, IPasswordHasher<Usuario> passwordHasher = null)
        {
            _usuarioRepository = usuarioRepository;
            _passwordHasher = passwordHasher ?? new PasswordHasher<Usuario>();
            _configuration = configuration;
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

        public async Task<Usuario?> ObterUsuarioEmail(string email)
        {
            return await _usuarioRepository.ObterUsuarioEmail(email);
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

        public string GerarToken(Usuario usuario)
        {
            var chave = _configuration["Jwt:Key"];
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            var chaveSecreta = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chave));
            var credenciais = new SigningCredentials(chaveSecreta, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", usuario.Id_usuario.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Id_usuario.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, usuario.Email_usuario),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credenciais
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
