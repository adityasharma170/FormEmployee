using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FormApi.Models;

namespace FormApi.Controllers
{
    //Imagining, employee details giving by a particular product.Hence, name used Product Controller.
    public class ProductController : ApiController
    {
       Entities db = new Entities();

        public string Post(Product product)
        {
            db.Products.Add(product);
            db.SaveChanges();
            return "employee added";
        }

        public IEnumerable<Product> Get()
        {
            return db.Products.ToList();
        }

        
    }
}
