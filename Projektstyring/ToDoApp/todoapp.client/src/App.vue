<script setup>
  import ToDoList from './components/ToDoList.vue';
</script>

<template>
  <header>
    <h1 class="app-title">To-Do App</h1>
  </header>
  <main>
    <ToDoList />
  </main>
</template>

<style scoped>
  header {
    text-align: center;
    padding: 1rem;
    background-color: #4a90e2;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .app-title {
    font-size: 3rem;
    color: white;
    font-weight: bold;
  }
</style>
