using Domain;
using Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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
    
        [HttpPost]
        public async Task<ActionResult<Usuario>> CriarUsuario(Usuario usuario)
        {
            var novoUsuario = await _usuarioService.CriarUsuario(usuario);
            return CreatedAtAction(nameof(CriarUsuario), new { id = novoUsuario.Id_usuario }, novoUsuario);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> ObterUsuario(int id)
        {
            var usuario = await _usuarioService.ObterUsuario(id);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarUsuario(int id, Usuario usuarioAtualizado)
        {
            var usuario = await _usuarioService.AtualizarUsuario(id, usuarioAtualizado);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [HttpPut("{id}/senha_usuario")]
        public async Task<IActionResult> AtualizarSenha(int id, Usuario senhaAtualizada)
        {
            var usuario = await _usuarioService.AtualizarSenha(id, senhaAtualizada);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarUsuario(int id)
        {
            var deletado = await _usuarioService.DeletarUsuario(id);
            if (!deletado) return NotFound();
            return NoContent();
        }
    }
}