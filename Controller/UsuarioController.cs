using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Service.Interfaces;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;

namespace Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Usuario>> CriarUsuario(Usuario usuario)
        {
            var novoUsuario = await _usuarioService.CriarUsuario(usuario);
            return CreatedAtAction(nameof(CriarUsuario), new { id = novoUsuario.Id_usuario }, novoUsuario);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLogin login)
        {
            var usuario = await _usuarioService.ObterUsuarioEmail(login.Email_usuario);
            if (usuario == null || !await _usuarioService.VerificarSenha(usuario.Id_usuario, login.Senha_usuario))
            {
                return Unauthorized(new { mensagem = "Credenciais inválidas." });
            }

            var token = _usuarioService.GerarToken(usuario);
            return Ok(new { token });
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Usuario>> ObterUsuario()
        {
            var usuarioId = int.Parse(User.FindFirst("id")!.Value);
            var usuario = await _usuarioService.ObterUsuario(usuarioId);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> AtualizarUsuario([FromBody] Usuario usuarioAtualizado)
        {
            var usuarioId = int.Parse(User.FindFirst("id")!.Value);
            var usuario = await _usuarioService.AtualizarUsuario(usuarioId, usuarioAtualizado);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [AllowAnonymous]
        [HttpPost("recuperar-senha/email")]
        public async Task<IActionResult> EnviarCodigo([FromBody] EmailRequest request)
        {
            if(string.IsNullOrEmpty(request.Email_usuario)) return NotFound();
            var enviado = await _usuarioService.EnviarCodRecuperacao(request.Email_usuario);
            if (!enviado) return NotFound(new { mensagem = "Se o e-mail estiver registrado, um código foi enviado." });
            return Ok(new { mensagem = "Se o e-mail estiver registrado, um código foi enviado." });
        }

        [AllowAnonymous]
        [HttpPost("recuperar-senha/verificar-codigo")]
        public async Task<IActionResult> VerificarCodigo([FromBody] JsonElement codigoData)
        {
            string email = codigoData.GetProperty("email_usuario").GetString()!;
            string codigo = codigoData.GetProperty("codigo_usuario").GetString()!;

            var valido = await _usuarioService.VerificarCodigo(email, codigo);
            if(!valido) return BadRequest(new { mensagem = "Código inválido ou expirado."});
            var usuario = await _usuarioService.ObterUsuarioEmail(email);
            return Ok(new {mensagem = "Código correto.", id_usuario = usuario!.Id_usuario});
        }

        [AllowAnonymous]
        [HttpPut("{id}/senha_usuario")]
        public async Task<IActionResult> AtualizarSenha(int id, [FromBody] JsonElement data)
        {
            string? novaSenha = data.GetProperty("senha_usuario").GetString()!;
            string? confirmarSenha = data.GetProperty("confirmarSenha").GetString()!;
            if(string.IsNullOrEmpty(novaSenha) || string.IsNullOrEmpty(confirmarSenha))
            {
                return BadRequest(new { mensagem = "Nova senha e confirmação são obrigatórias." });
            }
            if(novaSenha != confirmarSenha)
            {
                return BadRequest(new { mensagem = "As senhas não coincidem." });
            }
            var usuario = await _usuarioService.AtualizarSenha(id, novaSenha);
            if (usuario == null) return NotFound(new {mensagem = "Usuário não encontrado."});
            return Ok(new {mensagem = "Senha atualizada com sucesso."});
        }

        [Authorize]
        [HttpPut("alterar-senha-logado")]
        public async Task<IActionResult> AlterarSenhaLogado([FromBody] JsonElement data)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int usuarioLogadoId))
            {
                return Unauthorized(new { mensagem = "Usuário não autenticado ou ID inválido no token." });
            }
            string? senhaAtual = data.GetProperty("senhaAtual").GetString()!;
            string? novaSenha = data.GetProperty("senha_usuario").GetString()!;
            string? confirmarSenha = data.GetProperty("confirmarSenha").GetString()!;

            if (string.IsNullOrEmpty(senhaAtual) || string.IsNullOrEmpty(novaSenha) || string.IsNullOrEmpty(confirmarSenha))
            {
                return BadRequest(new { mensagem = "Todos os campos de senha são obrigatórios." });
            }
            if (novaSenha != confirmarSenha)
            {
                return BadRequest(new { mensagem = "A nova senha e a confirmação não coincidem." });
            }

            var senhaCorreta = await _usuarioService.VerificarSenha(usuarioLogadoId, senhaAtual);
            if (!senhaCorreta)
            {
                return Unauthorized(new { mensagem = "Senha atual incorreta." });
            }

            var usuarioAtualizado = await _usuarioService.AtualizarSenha(usuarioLogadoId, novaSenha);
            if(usuarioAtualizado == null)
            {
                return StatusCode(500, new { mensagem = "Erro ao atualizar a senha. Usuário não encontrado ou problema interno." });
            }
            return Ok(new { mensagem = "Senha alterada com sucesso." });
        }

        [Authorize]
        [HttpPost("upload-foto-perfil")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AlterarFotoPerfil(IFormFile fotoPerfil)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int id))
            {
                return Unauthorized(new { mensagem = "Usuário não autenticado." });
            }

            if (fotoPerfil == null || fotoPerfil.Length == 0)
            {
                return BadRequest(new { mensagem = "Nenhum arquivo de imagem enviado." });
            }

            try
            {
                var urlFoto = await _usuarioService.SalvarFotoPerfil(id, fotoPerfil);
                if (string.IsNullOrEmpty(urlFoto))
                {
                    return StatusCode(500, new { mensagem = "Falha ao salvar foto de perfil." });
                }
                return Ok(new { mensagem = "Foto de perfil atualizada com sucesso!", url = urlFoto });
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { mensagem = $"Erro interno ao processar o upload: {ex.Message}" });
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarUsuario(int id)
        {
            var deletado = await _usuarioService.DeletarUsuario(id);
            if (!deletado) return NotFound();
            return NoContent();
        }
    }
}