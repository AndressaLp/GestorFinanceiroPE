using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Repository.Interfaces;
using Service.Interfaces;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IPasswordHasher<Usuario> _passwordHasher;
        private readonly IConfiguration _configuration;
        private static Dictionary<string, (string Codigo, DateTime ExpiraEm)> _codigos = new();
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UsuarioService(IUsuarioRepository usuarioRepository, IConfiguration configuration, IWebHostEnvironment webHostEnvironment, IPasswordHasher<Usuario> passwordHasher = null)
        {
            _usuarioRepository = usuarioRepository;
            _passwordHasher = passwordHasher ?? new PasswordHasher<Usuario>();
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
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

        public async Task<bool> EnviarCodRecuperacao(string email)
        {
            var usuario = await _usuarioRepository.ObterUsuarioEmail(email);
            if (usuario == null) return false;

            var codigo = new Random().Next(100000, 999999).ToString();
            _codigos[email] = (codigo, DateTime.UtcNow.AddMinutes(10));
            Console.WriteLine($"[CÓDIGO] Código para {email}: {codigo}");

            try
            {
                await EnviarEmailComCodigo(email, codigo);
                return true;
            } 
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message );
                return false;
            }
        }

        private async Task EnviarEmailComCodigo(string destinatarioEmail, string codigo)
        {
            var smtpServer = "smtp.gmail.com";
            var smtpPort = 587;
            var remetenteGmail = _configuration["Email:remetenteEmail"]!;
            var senhaGmail = _configuration["Email:senhaEmail"]!;

            using (var client = new SmtpClient(smtpServer, smtpPort))
            {
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(remetenteGmail, senhaGmail);

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(remetenteGmail, "Gestor de Serviços"),
                    Subject = "Código de Recuperação",
                    Body = $"Olá! Seu código de recuperação é: <b>{codigo}</b>.<br/><br/>Este código é válido por 10 minutos.<br/><br/>Atenciosamente,<br/>Equipe do suporte.",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(destinatarioEmail);

                await client.SendMailAsync(mailMessage);
                Console.WriteLine($"E-mail com código enviado para {destinatarioEmail} via Gmail.");
            }
        }

        public Task<bool> VerificarCodigo(string email, string codigo)
        {
            if(_codigos.TryGetValue(email, out var dadosCodigo))
            {
                if(DateTime.UtcNow <= dadosCodigo.ExpiraEm && dadosCodigo.Codigo == codigo)
                {
                    _codigos.Remove(email);
                    return Task.FromResult(true);
                }
            }
            return Task.FromResult(false);
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

        public async Task<string?> SalvarFotoPerfil(int id, IFormFile fotoPerfil)
        {
            if(fotoPerfil.Length > 2 * 1024 * 1024)
            {
                throw new Exception("O tamanho da imagem excede o limite permitido (2MB).");
            }
            var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var extensao = Path.GetExtension(fotoPerfil.FileName).ToLowerInvariant();
            if (!extensoesPermitidas.Contains(extensao))
            {
                throw new Exception("Formato de imagem não permitido. Use JPG, JPEG, PNG ou GIF.");
            }
            var nomeUnicoArquivo = $"{Guid.NewGuid()}{extensao}";

            var pastaUploads = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "perfil");

            if (!Directory.Exists(pastaUploads))
            {
                Directory.CreateDirectory(pastaUploads);
            }

            var caminhoCompletoArquivo = Path.Combine(pastaUploads, nomeUnicoArquivo);

            using (var stream = new FileStream(caminhoCompletoArquivo, FileMode.Create))
            {
                await fotoPerfil.CopyToAsync(stream);
            }

            string urlPublicaFoto = $"/uploads/perfil/{nomeUnicoArquivo}";

            var usuario = await _usuarioRepository.ObterUsuario(id);
            if (usuario == null)
            {
                System.IO.File.Delete(caminhoCompletoArquivo);
                return null;
            }

            if (!string.IsNullOrEmpty(usuario.Foto_perfil))
            {
                var caminhoFotoAntiga = Path.Combine(_webHostEnvironment.WebRootPath, usuario.Foto_perfil.TrimStart('/'));
                if (System.IO.File.Exists(caminhoFotoAntiga))
                {
                    try
                    {
                        System.IO.File.Delete(caminhoFotoAntiga);
                    }
                    catch (Exception ex) 
                    {
                        Console.WriteLine($"Erro ao deletar a foto antiga: {ex.Message}");
                    }
                }
            }

            usuario.Foto_perfil = urlPublicaFoto;

            await _usuarioRepository.AtualizarUsuario(usuario.Id_usuario, usuario);

            return urlPublicaFoto;
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
