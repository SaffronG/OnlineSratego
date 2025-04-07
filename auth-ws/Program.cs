using System.Net.Http.Headers;
using System.Runtime.CompilerServices;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                      });
});

List<Account> users = [ 
    new("admin", "password", "admin.123@fake.com"),
    new("user", "1234", "guest@fake.com"),
    new("guest", "password", "guest123@fake.com"),
];

var authenticated = new Queue<UserWithToken>(); // List of authenticated concurrent users

var games = new List<Game>(); // List of users in-game

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => Results.Content(File.ReadAllLines("map.html").Aggregate((a, b) => a + "\n" + b), "text/html")).WithName("Map");

app.MapPost("/login", (Account user) => {
    var foundUser = users.FirstOrDefault(u => u.username == user.username && u.password == user.password);
    if (foundUser != null) {
        Guid tok = Guid.NewGuid();
        authenticated.Enqueue(new UserWithToken(foundUser, tok));
        return Results.Ok(new OkToken("Login successful", tok));
    }
    return Results.Unauthorized();
}).WithName("Login");

app.MapPost("/register", (Account user) => {
    if (users.Any(u => u.username == user.username)) return Results.Conflict("User already exists");
    users.Add(user);
    return Results.Created($"/user/{user.username}", user);
}).WithName("Register");

app.MapPost("/logout", (string token) => {
    var user = authenticated.FirstOrDefault(u => u.token == token);
    if (user != null) return Results.Ok("Logout successful");
    return Results.Forbid();
}).WithName("Logout");

app.Run();

public record UserWithToken(string username, string password, string? token, Bot? Bot) {
    public UserWithToken(Account user, Guid tok) : this(user.username, user.password, tok.ToString(), null) {}
}
public record Account(string username, string password, string email);
public record OkToken(string message, Guid token);
public record Game(UserWithToken user_a, UserWithToken user_b, int LobbyId);
public class Bot {
    public readonly int Level;
    public Bot(int level) {
        Level = level;
    }

}