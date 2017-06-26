using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Reversi.Startup))]
namespace Reversi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
