using ToDoApp.Server.Models;
using System.Text.Json;

namespace ToDoApp.Server.Services
{
    public class FileHelper
    {
        private static string filePath = "tasks.json";

        public static List<TodoItem> ReadTasks()
        {
            if (!File.Exists(filePath)) return new List<TodoItem>(); // Returner en tom liste, hvis filen ikke findes

            try
            {
                string json = File.ReadAllText(filePath);

                // Hvis JSON-strukturen er tom eller ugyldig, returner en tom liste
                if (string.IsNullOrWhiteSpace(json))
                {
                    return new List<TodoItem>();
                }

                return JsonSerializer.Deserialize<List<TodoItem>>(json) ?? new List<TodoItem>();
            }
            catch (JsonException e)
            {
                Console.WriteLine($"Fejl i deserialisering: {e.Message}");
                return new List<TodoItem>(); // Hvis deserialisering fejler, returner en tom liste
            }
        }

        public static void WriteTasks(List<TodoItem> tasks)
        {
            string json = JsonSerializer.Serialize(tasks, new JsonSerializerOptions { WriteIndented = true });

            // Debugging output
            Console.WriteLine("Writing tasks to file: " + json);

            File.WriteAllText(filePath, json);
        }
    }
}
