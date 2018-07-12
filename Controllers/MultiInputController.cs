using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace React_Training.Controllers
{
    [Route("api/[controller]")]
    public class MultiInputController : Controller
    {
        private static object[] multiInputData = new[]
        {
           "Cream-colored ponies", "crisp apple strudels", "Doorbells","sleigh bells","schnitzel with noodles"
        };

        [HttpGet("[action]")]
        public IEnumerable<object> GetMultiInputData()
        {
            return multiInputData;
        }

        [HttpPost("[action]")]
        public void PostMultiInputData([FromBody]InputField[] data)
        {
            foreach (var item in data)
                Console.WriteLine(data.ToString());
        }

        public class InputField
        {
            public string Key { get; set; }
            public int Type { get; set; }
            public object Value { get; set; }

            public override string ToString()
            {
                return $"key:{Key}, value: {Value}, type: {Type}";
            }
        }
    }
}
