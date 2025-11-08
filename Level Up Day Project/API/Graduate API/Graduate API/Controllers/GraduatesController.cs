using Graduate_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Graduate_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraduatesController : ControllerBase
    {
        private GraduateDatabaseContext _context;

        public GraduatesController(GraduateDatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("/getGrads")]
        public async Task<Object> GetGrads()
        {
            var grads = await _context.Graduates.ToListAsync();
            return Ok(grads);
        }

        [HttpGet]
        [Route("/getGrad/{id}")]
        public async Task<Object> GetGradById(int id)
        {
            var grads = await _context.Graduates.ToListAsync();

            if (grads.Count > 0)
            {
                var grad = grads.Find(g => g.Guid == id);
                if(grad == null)
                {
                    return NotFound("Graduate with id: " + id + " is not found");
                }
                else
                {
                    return Ok(grad);
                }
            }
            else
            {
                return NotFound("No graduates have been added");
            }
        }

        [HttpPost]
        [Route("/createGrad")]
        public async Task<Object> CreateGrad(Graduate grad)
        {
            var grads = await _context.Graduates.ToListAsync();
            var lastId = 0;

            if(grads.Count > 0)
            {
                lastId = grads.ElementAt(grads.Count - 1).Guid + 1;
            }

            grad.Guid = lastId;

            int age = DateTime.Now.Year - grad.DateOfBirth.Year;
            
            if(age >= 18)
            {
                grad.IsDeleted = false;
                _context.Graduates.Update(grad);
                _context.Graduates.Add(grad);
                await _context.SaveChangesAsync();

                return Ok("Graduate has been added");
            }
            else
            {
                return BadRequest("The following graduate is not 18 years or older");
            }           
        }

        [HttpPut]
        [Route("/updateGrad")]
        public async Task<Object> UpdateGraduate(Graduate grad)
        {
            int age = DateTime.Now.Year - grad.DateOfBirth.Year;
            
            if (age >= 18)
            {
                var grads = await _context.Graduates.ToListAsync();
                var updategrad = grads.Find(g => g.Guid == grad.Guid);

                if (updategrad != null)
                {
                    updategrad.FirstName = grad.FirstName;
                    updategrad.LastName = grad.LastName;
                    updategrad.EmailAddress = grad.EmailAddress;
                    updategrad.PhoneNumber = grad.PhoneNumber;
                    updategrad.DateOfBirth = grad.DateOfBirth;
                    updategrad.DateEdited = grad.DateEdited;
                    updategrad.IsDeleted = grad.IsDeleted;

                    _context.Graduates.Update(updategrad);
                    await _context.SaveChangesAsync();

                    return Ok("Graduate has been updated");
                }
                else
                {
                    return NotFound("This graduate does not exist");
                }
            }
            else
            {
                return BadRequest("The following graduate is not 18 years or older");
            }
        }

        [HttpDelete]
        [Route("/deleteGrad/{id}")]
        public async Task<Object> Delete(int id)
        {
            var grads = await _context.Graduates.ToListAsync();

            if(grads.Count > 0)
            {
                var grad = grads.Find(g => g.Guid == id);

                if (grad != null)
                {
                    grad.IsDeleted = true;
                    _context.Graduates.Update(grad);
                    await _context.SaveChangesAsync();

                    return Ok("Graduate has been deleted");
                }
                else
                {
                    return NotFound("Graduate with id: " + id + " is not found");
                }
            }
            else
            {
                return NotFound("No graduates have been added");
            }
        }
    }
}
