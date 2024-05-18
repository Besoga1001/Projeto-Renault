using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace project_renault.Controllers
{
    [Route("/user")]
    [ApiController]
    public class UserController : Controller
    {
        [HttpGet]
        public string getTest() {
            return "Matheus está programando o front end";
        }
    }
}
