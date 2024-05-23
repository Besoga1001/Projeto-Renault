using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_renault.Models
{
    [Table("risco")]
    public class RiskModel
    {
        [Key]
        public int id_Risco { get; set; }
        public string descricao_risco { get; set; }
        public string tipo_Risco { get; set; }
        public string probabilidade { get; set; }
        public string area_Responsavel { get; set; }
        public string classificacao_risco { get; set; }
        public string projeto { get; set; }
        public DateTime data_Entrada_Risco { get; set; }
        public string impacto { get; set; }
        public string impacto_Renault { get; set; }
        public string? consequencias { get; set; }
        public string? jalon_Afetado { get; set; }
        public string? metier { get; set; } 
        public int status { get; set; }
      
    }
}
