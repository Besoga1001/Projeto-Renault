using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_renault.Models
{
    public class RiskModel
    {
        [Key]
        public int Id { get; set; }
        public string? DescricaoRisco { get; set; } 
        public string? Tipo { get; set; }
        public string? Probabilidade { get; set; }
        public string? AreaResponsavel { get; set; }
        public string? ClassificacaoRisco { get; set; }
        public string? Projeto { get; set; }
        public DateTime DataEntradaRisco { get; set; }
        public string? Impacto { get; set; }
        public string? ImpactoRenault { get; set; }
        public string? Consequencias { get; set; }
        public string? JalonAfetado { get; set; }
        public string? Metier { get; set; } 
        public int Status { get; set; }
      
    }
}
