<template>
  <div class="todo-list">
    <h1 class="title">To-Do List</h1>
    <ul>
      <ToDoItem v-for="(task, index) in tasks"
                :key="task.id"
                :task="task"
                :index="index"
                @remove="removeTask"
                @toggle-edit="toggleEdit"
                @save-edit="saveEdit" />
    </ul>
    <input v-model="newTask"
           @keyup.enter="addTask"
           placeholder="Add a new task"
           class="new-task-input" />
  </div>
</template>

<script>
  import ToDoItem from './ToDoItem.vue';

  export default {
    name: 'ToDoList',
    components: {
      ToDoItem,
    },
    data() {
      return {
        tasks: [],
        newTask: '',
      };
    },
    methods: {
      async fetchTasks() {
        try {
          const response = await fetch('https://localhost:7027/api/ToDo/getall');
          if (!response.ok) throw new Error('Failed to fetch tasks');
          const data = await response.json();
          this.tasks = data;
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      },

      async addTask() {
        if (this.newTask.trim()) {
          try {
            const response = await fetch('https://localhost:7027/api/ToDo/add', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: this.newTask, status: 'To Do' }),
            });
            if (!response.ok) throw new Error('Failed to add task');
            this.newTask = '';
            this.fetchTasks();
          } catch (error) {
            console.error('Error adding task:', error);
          }
        }
      },

      toggleEdit(task) {
        task.isEditing = !task.isEditing;
        if (!task.isEditing) {
          this.saveEdit(task);
        }
      },

      async saveEdit(task) {
        try {
          const response = await fetch('https://localhost:7027/api/ToDo/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: task.id, name: task.editedName, status: task.status }),
          });
          if (!response.ok) throw new Error('Failed to update task');
          this.fetchTasks();
        } catch (error) {
          console.error('Error updating task:', error);
        }
      },

      async removeTask(index) {
        const task = this.tasks[index];
        try {
          const response = await fetch(`https://localhost:7027/api/ToDo/delete/${task.id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete task');
          this.fetchTasks();
        } catch (error) {
          console.error('Error removing task:', error);
        }
      },
    },

    mounted() {
      this.fetchTasks();
    },
  };
</script>

<style scoped>
  .todo-list {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .title {
    font-size: 2rem;
    color: #4CAF50;
    text-align: center;
    margin-bottom: 20px;
  }

  .new-task-input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
