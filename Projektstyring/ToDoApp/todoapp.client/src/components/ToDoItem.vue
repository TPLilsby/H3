<template>
  <li class="todo-item">
    <span v-if="!task.isEditing" class="task-name">{{ task.name }}</span>
    <input v-else v-model="task.editedName" class="edit-input" />

    <div class="buttons">
      <button @click="handleToggleEdit" class="edit-btn">
        {{ task.isEditing ? 'Save' : 'Edit' }}
      </button>
      <button @click="handleRemoveTask" class="remove-btn">Remove</button>
    </div>

    <div class="status-container">
      <div :class="['status-dropdown', { 'open': isDropdownOpen }]"
           @click="toggleDropdown"
           :style="{ backgroundColor: selectedStatusColor }">
        <span>{{ selectedStatus }}</span>
      </div>
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <div class="dropdown-item"
             v-for="status in statusOptions"
             :key="status"
             :style="{ backgroundColor: statusColor[status] }"
             @click="setStatus(status)">
          {{ status }}
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'ToDoItem',
    props: {
      task: Object,
      index: Number,
    },
    data() {
      return {
        isDropdownOpen: false,
        selectedStatus: this.task.status || 'To Do',
        statusOptions: ['To Do', 'In Progress', 'Completed'],
        statusColor: {
          'To Do': 'red',
          'In Progress': 'yellow',
          'Completed': 'green',
        },
      };
    },
    computed: {
      selectedStatusColor() {
        return this.statusColor[this.selectedStatus] || 'gray'; // Fallback to gray if status is undefined
      },
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      setStatus(status) {
        this.selectedStatus = status;
        this.isDropdownOpen = false;
        this.$emit('status-changed', { id: this.task.id, status: this.selectedStatus });
      },
      handleToggleEdit() {
        this.$emit('toggle-edit', this.task);
      },
      handleRemoveTask() {
        this.$emit('remove', this.index);
      },
    },
  };
</script>

<style scoped>
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .task-name {
    flex-grow: 1;
    font-size: 1rem;
  }

  .edit-input {
    width: 70%;
    padding: 5px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .edit-btn,
  .remove-btn {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .remove-btn {
    background-color: #f44336;
  }

    .edit-btn:hover,
    .remove-btn:hover {
      opacity: 0.8;
    }

  .status-container {
    position: relative;
  }

  .status-dropdown {
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 1rem;
    width: 100px;
    text-align: center;
  }

    .status-dropdown.open {
      background-color: #f0f0f0;
      color: #333;
    }

  .dropdown-menu {
    position: absolute;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100px;
    top: 35px;
    left: 0;
    z-index: 1;
  }

  .dropdown-item {
    padding: 8px 10px;
    cursor: pointer;
    color: black;
    font-size: 1rem;
  }

    .dropdown-item:hover {
      background-color: #f1f1f1;
    }
</style>
