<template>
  <li class="input-group mb-3">
    <div class="input-group-text">
      <input class="form-check-input mt-0" type="checkbox" v-bind:checked="todo.completed" v-on:change="$emit('update', todo)"/>
    </div>
    <input type="text" class="form-control form-control-sm" disabled aria-label="Text input with checkbox" v-bind:value="todo.title" v-on:keydown.enter="$emit('update', todo)">
    <button class="btn btn-outline-secondary" v-on:click="$emit('remove', todo)">X</button>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
}
</script>