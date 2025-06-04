using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Service.Interfaces;
using System.Security.Claims;

namespace Controller
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClienteController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpPost]
        public async Task<ActionResult<Cliente>> CriarCliente([FromBody] Cliente cliente)
        {
            int usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            cliente.Id_usuario = usuarioId;
            cliente.Data_cadastro = DateTime.Now.Date;

            var novoCliente = await _clienteService.CriarCliente(cliente);
            return CreatedAtAction(nameof(CriarCliente), new { id = novoCliente.Id_cliente }, novoCliente);
        }

        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> ObterClientes()
        {
            int usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var clientes = await _clienteService.ObterClientes(usuarioId);
            if (clientes == null) return NotFound();
            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> ObterClienteId(int id)
        {
            var cliente = await _clienteService.ObterClienteId(id);
            if(cliente == null) return NotFound();
            return Ok(cliente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarCliente(int id, [FromBody] Cliente clienteAtualizado)
        {
            int usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            clienteAtualizado.Id_usuario = usuarioId;
            var cliente = await _clienteService.AtualizarCliente(id, clienteAtualizado);
            if(cliente == null || cliente.Id_usuario != usuarioId) return NotFound();
            return Ok(cliente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarCliente(int id)
        {
            int usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var deletado = await _clienteService.DeletarCliente(id, usuarioId);
            if(!deletado) return NotFound();
            return NoContent();
        }
    }
}