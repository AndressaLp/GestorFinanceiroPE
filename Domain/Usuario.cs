namespace Domain
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string NomeUsuario { get; set; }
        public string NomeEmpresa { get; set; }
        public string AreaProfissional { get; set; }
        public string EmailUsuario { get; set; }
        public string SenhaUsuario { get; set; }

        public ICollection<Cliente> Clientes { get; set; }
    }
}
