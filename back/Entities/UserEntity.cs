using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_renault.Entities
{
    [Table("usuario")]
    public class UserEntity
    {
        [Key]
        public int Id { get; set; }

        public string matricula { get; set; }
    }
}
