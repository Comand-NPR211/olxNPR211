using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data.Entities;
using WebAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ads
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdEntity>>> GetAds()
        {
            var ads = await _context.Ads.ToListAsync();
            return Ok(ads);
        }

        // GET: api/ads/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdEntity>> GetAd(int id)
        {
            var ad = await _context.Ads.FindAsync(id);

            if (ad == null)
            {
                return NotFound();
            }

            return Ok(ad);
        }
    }
}
