using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp4.Models;

namespace WebApp4.Data.Entity
{
    public class Some_data
    {
        public static void Initialize(ApplicationDbContext context)
        {
            if (!context.Films.Any())
            {
                context.Films.AddRange(
                    new Film
                    {
                        Title = "Interstellar",
                        Rating = 8.6,
                        Id = "tt0816692"
                    },
                    new Film
                    {
                        Title = "Dumb and Dumber",
                        Rating = 7.3,
                        Id = "tt0109686"
                    },
                    new Film
                    {
                        Title = "Warcraft",
                        Rating = 6.8,
                        Id = "tt0803096"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
