var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://example.com",
                                              "http://www.contoso.com");
                      });
});

var users = new List<Account> { 
    new("admin", "password", "admin.123@fake.com"),
    new("user", "1234", "guest@fake.com"),
    new("guest", "password", "guest123@fake.com"),
};

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => Results.Content(File.ReadAllLines("map.html").Aggregate((a, b) => a + "\n" + b), "text/html")).WithName("Map");

app.MapPost("/login", (UserWithToken user) => {
    var foundUser = users.FirstOrDefault(u => u.username == user.username && u.password == user.password);
    if (foundUser != null) return Results.Ok("Login successful");
    return Results.Unauthorized();
}).WithName("Login");

app.MapPost("/register", (Account user) => {
    if (users.Any(u => u.username == user.username)) return Results.Conflict("User already exists");
    users.Add(user);
    return Results.Created($"/user/{user.username}", user);
}).WithName("Register");

app.Run();

public record UserWithToken(string username, string password, string? token);
public record Account(string username, string password, string email);