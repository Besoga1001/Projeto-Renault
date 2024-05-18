using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using project_renault.Entities;

namespace project_renault
{
    public class DBSettings : DbContext
    {
        private IConfiguration _configuration;

        public DBSettings(IConfiguration configuration, DbContextOptions options) { 
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public DbSet<UserEntity> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("MySql");
            optionsBuilder.UseMySQL(connectionString);
        }
    }
}
