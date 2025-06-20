using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System.Security.Claims;

namespace Controller
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicoController : ControllerBase
    {
        private readonly IServicoService _servicoService;

        public ServicoController(IServicoService servicoService)
        {
            _servicoService = servicoService;
        }

        [HttpPost]
        public async Task<ActionResult<Servico>> CriarServico([FromBody] Servico servico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            servico.Id_usuario = usuarioId;

            try
            {
                var novoServico = await _servicoService.CriarServico(servico);
                return CreatedAtAction(nameof(CriarServico), new { id = novoServico.Id_servico }, novoServico);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(new { ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Servico>> ObterServicoId(int id)
        {
            var servico = await _servicoService.ObterServicoId(id);
            if(servico == null) return NotFound();
            return Ok(servico);
        }

        [HttpGet]
        public async Task<ActionResult<List<Servico>>> ObterServicos()
        {
            int usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var servicos = await _servicoService.ObterServicos(usuarioId);
            if(servicos == null) return NotFound();
            return Ok(servicos);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarServico(int id, [FromBody] Servico servicoAtualizado)
        {
            int usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            servicoAtualizado.Id_usuario = usuarioId;
            var servico = await _servicoService.EditarServico(id, servicoAtualizado);
            if (servico == null || servico.Id_usuario != usuarioId) return NotFound();
            return Ok(servico);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarServico(int id)
        {
            int usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var deletado = await _servicoService.DeletarServico(id, usuarioId);
            if(!deletado) return NotFound();
            return NoContent();
        }
    }
}
