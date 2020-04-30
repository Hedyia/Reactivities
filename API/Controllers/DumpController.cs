
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class DumpController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<string>> GetDumpValues()
    {
        return new string[] { "Dump1", "Dump2" };
    }
}