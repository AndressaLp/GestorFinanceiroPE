using Domain;
using Infradb;
using Microsoft.AspNetCore.Mvc;
using Service;
using System.Threading.Tasks;

namespace Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteService _clienteService;

        public ClienteController(ClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpPost]
        public async Task<ActionResult<Cliente>> CriarCliente([FromBody] Cliente cliente)
        {
            var novoCliente = await _clienteService.CriarCliente(cliente);
            return CreatedAtAction(nameof(CriarCliente), new { id = novoCliente.ClienteId }, novoCliente);
        }

        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> ObterClientes()
        {
            var clientes = await _clienteService.ObterClientes();
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
            var cliente = await _clienteService.AtualizarCliente(id, clienteAtualizado);
            if(cliente == null) return NotFound();
            return Ok(cliente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarCliente(int id)
        {
            var deletado = await _clienteService.DeletarCliente(id);
            if(!deletado) return NotFound();
            return NoContent();
        }
    }
}