using Tizen.Applications;
using Uno.UI.Runtime.Skia;

namespace DMS.Skia.Tizen
{
    class Program
    {
        static void Main(string[] args)
        {
            var host = new TizenHost(() => new DMS.App(), args);
            host.Run();
        }
    }
}
