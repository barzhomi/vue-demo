<template>
  <div class="row p-3">
    <input
        class="form-control form-control-lg"
        v-model="newTodoText"
        placeholder="New todo"
        v-on:keydown.enter="addTodo"
    />
  </div>
  <div class="row p-3">
    <ul v-if="todos.length">
      <TodoListItem
          v-for="todo in visibleToDos"
          v-bind:key="todo.id"
          v-bind:todo="todo"
          v-on:remove="removeTodo"
          v-on:update="updateTodo"
      />
    </ul>
    <p v-else>
      Nothing left in the list. Add a new todo in the input above.
    </p>
  </div>
  <div class="row border p-3 ">
    <div class="col-2 align-self-center">
      <span>{{activeToDos.length}} left</span>
    </div>
    <div class="col-10">
      <div class="btn-group justify-content-center d-flex">
        <input type="radio" class="btn-check" id="btnradio1" autocomplete="off"
               v-bind:checked="visibility=='all'"
               v-on:change="visibility='all'">
        <label class="btn btn-outline-primary" for="btnradio1">All</label>

        <input type="radio" class="btn-check" id="btnradio2" autocomplete="off"
               v-bind:checked="visibility=='completed'"
               v-on:change="visibility='completed'">
        <label class="btn btn-outline-primary" for="btnradio2">Completed</label>

        <input type="radio" class="btn-check" id="btnradio3" autocomplete="off"
               v-bind:checked="visibility=='active'"
               v-on:change="visibility='active'">
        <label class="btn btn-outline-primary" for="btnradio3">Active</label>
      </div>
    </div>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue'
import axios from "axios"

const axios_instance = axios.create({
  baseURL: 'http://45.9.24.240:8080/products/',
  // baseURL: 'http://localhost:8080/products/',
});

export default {
  components: {
    TodoListItem
  },

  data () {
    return {
      newTodoText: '',
      todos: [],
      visibility : "all"
    }
  },
  created() {
    axios_instance.get().then(result => {
      console.log(result.data)
      result.data.forEach(element => {
        this.todos.push(element)
      })
    }, error => {
      console.error(error);
    });
  },
  computed: {
    visibleToDos() {
      if (this.visibility == "active") {
        return this.todos.filter(todo => {
          return !todo.completed
        })
      } else if (this.visibility == "completed") {
        return this.todos.filter(todo => {
          return todo.completed
        })
      } else {
        return this.todos
      }
    },
    activeToDos() {
        return this.todos.filter(todo => {
          return !todo.completed
        })
    }
  },
  methods: {
    addTodo () {
      const trimmedText = this.newTodoText.trim()
      if (trimmedText) {
        axios_instance.post(
            "",
            {
              title: trimmedText,
              completed: false
            }
        ).then(result => {
          this.todos.push(result.data)
          this.newTodoText = ''
        }, error => {
          console.error(error);
        });
      }
    },
    removeTodo (todoToRemove) {
      axios_instance.delete(
          todoToRemove.id
      ).then(() => {
        this.todos = this.todos.filter(todo => {
          return todo.id !== todoToRemove.id
        })
      }, error => {
        console.error(error);
      });
    },
    updateTodo (todoToUpdate) {
      console.log(todoToUpdate)
      axios_instance.put(
          todoToUpdate.id ,
          {
            title: todoToUpdate.title,
            completed: !todoToUpdate.completed
          }
      ).then(result => {
        todoToUpdate.completed = result.data.completed
      }, error => {
        console.error(error);
      });
    }
  }
}
</script>