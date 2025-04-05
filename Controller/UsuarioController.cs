using Domain;
using Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
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
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> ObterUsuario(int id)
        {
            var usuario = await _usuarioService.ObterUsuario(id);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarUsuario(int id, Usuario usuarioAtualizado)
        {
            var usuario = await _usuarioService.AtualizarUsuario(id, usuarioAtualizado);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [Authorize]
        [HttpPut("{id}/senha_usuario")]
        public async Task<IActionResult> AtualizarSenha(int id, string senhaAtualizada)
        {
            var usuario = await _usuarioService.AtualizarSenha(id, senhaAtualizada);
            if (usuario == null) return NotFound();
            return Ok(usuario);
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