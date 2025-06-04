using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infradb
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Servico> Servicos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Servico>().HasOne(s => s.Cliente).WithMany(c => c.Servicos).HasForeignKey(s => s.Id_cliente);
            modelBuilder.Entity<Cliente>().HasOne(c => c.Usuario).WithMany(u => u.Clientes).HasForeignKey(c => c.Id_usuario);
            modelBuilder.Entity<Servico>().HasOne(s => s.Usuario).WithMany(u => u.Servicos).HasForeignKey(s => s.Id_usuario);
        }
    }
}
