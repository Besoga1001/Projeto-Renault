using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_renault.Models;

namespace project_renault.Controllers
{
    [Route("/risco")]
    [ApiController]
    public class RiskController : Controller
    {
        private readonly DBSettings _context;

        public RiskController(DBSettings context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RiskModel>>> GetAllRisk()
        {
            return await _context.Risk.ToListAsync();
        }
    }
}
