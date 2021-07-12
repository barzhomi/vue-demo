<template>
  <div class="d-flex flex-column mh-100">
    <h1 class="row justify-content-center">todos</h1>
    <TodoList/>
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