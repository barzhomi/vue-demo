<template>
  <div id="app" class="container p-3">
    <div class="col">
      <h1 class="row justify-content-center">todos</h1>
      <TodoList class="row"/>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  components: {
    TodoList
  }
}
</script>

<style>


</style>