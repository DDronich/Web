using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebApp4.Data;
using WebApp4.Models;

namespace WebApp4.Controllers
{

    public class HomeController : Controller
    {

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        private readonly IDistributedCache _distributedCache;

       

        ApplicationDbContext db;
        public HomeController(ApplicationDbContext context, IDistributedCache distributedCache)
        {
            db = context;
            _distributedCache = distributedCache;
        }

        public IActionResult Privacy()
        {
            return View(db.Films.ToList());
        }


        public class Currency
        {
            [JsonProperty("base")]
            public string Name { get; set; }
            [JsonProperty("rates")]
            public Dictionary<string, decimal> Rates { get; set; }
        }


        public class user_data
        {
            public string start_val { get; set; }
            public string conver_val { get; set; }
            public int amount { get; set; }

        }

        public class index_data
        {
            public user_data data { get; set; }
            public Currency curr { get; set; }
        }


        
         public async Task<IActionResult> Index()
         {
            return View(new index_data() { curr = new Currency() { Rates = new Dictionary<string, decimal>() } });


         }


        [HttpPost]
        public async Task<IActionResult> Index(index_data all_index)
        {

            string cacheKey = "currency";
            var content = _distributedCache.GetString(cacheKey);
            

            if (string.IsNullOrEmpty(content))
            {
                var client = new HttpClient();
                var content_inside = await client.GetAsync($"https://api.exchangerate-api.com/v4/latest/{all_index.data.start_val}");
                content = await content_inside.Content.ReadAsStringAsync();
                _distributedCache.SetString(cacheKey, content);

            }

            
            
            var currency = JsonConvert.DeserializeObject<Currency>(content);
            all_index.curr = currency;

            
            if (all_index.curr.Rates == null)
            {
                Dictionary<string, decimal> koef = new Dictionary<string, decimal>();
                koef.Add($"{all_index.data.start_val}", 0);
                all_index.curr.Rates = koef;
            }
            return View(all_index);

            
        }


        public class Trailer_class
        {
            public Trailer_link trailer { get; set; }

        }
        public class Trailer_link
        {
            public string link { get; set; }
        }
        public async Task<IActionResult> Trailer_linkage(string? id)
        {
            var client = new HttpClient();
            if (id == null) return RedirectToAction("Index");
            var request = new HttpRequestMessage
            
            {
                RequestUri = new Uri($"https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/{id}"),
                Headers =
                        {
                            { "x-rapidapi-key", "4392e6d2f3mshfd837834a27a0f8p1ff8dajsnf492f77333b5" },
                             { "x-rapidapi-host", "imdb-internet-movie-database-unofficial.p.rapidapi.com" },
                        },
            };

            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var whole_data = await response.Content.ReadAsStringAsync();
                var ssilka = JsonConvert.DeserializeObject<Trailer_class>(whole_data);

                return Redirect(ssilka.trailer.link);
            }
        }

    }
}
