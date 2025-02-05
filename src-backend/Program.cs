using Microsoft.AspNetCore.Authentication.Negotiate;

namespace coruscant_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.Configure<RouteOptions>(options =>
            {
                options.LowercaseUrls = true;
                options.AppendTrailingSlash = true;
                options.LowercaseQueryStrings = true;
            });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddOpenApiDocument(options =>
            {
                options.Version = "v1";
                options.DocumentName = "v1";
                options.Title = "Coruscant Backend API";
                options.UseControllerSummaryAsTagDescription = true;
                options.SchemaSettings.ResolveExternalXmlDocumentation = true;
                options.SchemaSettings.UseXmlDocumentation = true;
            });
            builder.Services.AddProblemDetails();
            builder.Services.AddHealthChecks();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();

            /*
            builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
                .AddNegotiate();

            builder.Services.AddAuthorization(options =>
            {
                // By default, all incoming requests will be authorized according to the default policy.
                options.FallbackPolicy = options.DefaultPolicy;
            });
            */

            var app = builder.Build();

            app.UseOpenApi();
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwaggerUi();
            }
            app.UseHealthChecks("/_health");
            app.UseHttpsRedirection();
            app.UseCors(configure =>
            {
                configure
                    .SetIsOriginAllowed(o => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });

            //app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
