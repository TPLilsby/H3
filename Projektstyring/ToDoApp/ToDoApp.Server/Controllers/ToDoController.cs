using Microsoft.AspNetCore.Mvc;
using ToDoApp.Server.Models;
using ToDoApp.Server.Services;

[ApiController]
[Route("api/[controller]")]
public class ToDoController : ControllerBase
{
    [HttpGet("getall")]
    public ActionResult<List<TodoItem>> GetAllTasks()
    {
        return Ok(FileHelper.ReadTasks());
    }

    [HttpPost("add")]
    public ActionResult AddTask([FromBody] TodoItem newTask)
    {
        var tasks = FileHelper.ReadTasks();
        newTask.Id = tasks.Count > 0 ? tasks.Max(t => t.Id) + 1 : 1; // Sæt unikt ID
        newTask.Status = "To Do"; // Standardstatus ved oprettelse
        tasks.Add(newTask);
        FileHelper.WriteTasks(tasks);
        return Ok();
    }

    [HttpPut("update")]
    public ActionResult UpdateTask([FromBody] TodoItem updatedTask)
    {
        var tasks = FileHelper.ReadTasks();
        var task = tasks.FirstOrDefault(t => t.Id == updatedTask.Id);
        if (task == null) return NotFound();

        // Opdater alle relevante felter
        task.Name = updatedTask.Name;
        task.Status = updatedTask.Status; // Opdater status

        FileHelper.WriteTasks(tasks); // Opdater JSON-filen
        return Ok();
    }


    [HttpDelete("delete/{id}")]
    public ActionResult DeleteTask(int id)
    {
        var tasks = FileHelper.ReadTasks();
        var task = tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return NotFound();

        tasks.Remove(task);
        FileHelper.WriteTasks(tasks);
        return Ok();
    }
}
