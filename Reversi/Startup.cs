using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Reversi.Startup))]
namespace Reversi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
