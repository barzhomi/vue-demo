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
    <transition-group name="list-complete" tag="ul" >
      <TodoListItem
          v-for="todo in visibleToDos"
          v-bind:key="todo.id"
          v-bind:todo="todo"
          v-on:remove="removeTodo"
          v-on:update="updateTodo"
          class="list-complete-item"
      />
    </transition-group>
  </div>
  <div class="row border p-3">
    <div class="col-1 align-self-center">
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
    <div class="col-1 d-flex justify-content-end">
      <button class="btn btn-outline-secondary" v-on:click="updateTodoList">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
      </button>
    </div>

  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue'
import {axios_instance} from "../services/ApiService"


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
  created(){
    axios_instance.get().then(result => {
      this.todos = [];
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
    updateTodoList (){
      axios_instance.get().then(result => {
        console.log(result.data)
        this.todos = []
        result.data.forEach(element => {
          this.todos.push(element)
        })
      }, error => {
        console.error(error);
      });
    },
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

<style scoped>

.list-complete-item {
  transition: all 0.8s ease;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {

}
</style>