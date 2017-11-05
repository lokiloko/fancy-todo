<template lang="html">
<div>
  <md-layout md-align="center" md-row md-sm-column style="padding: 8px;">
    <md-layout md-flex="75" md-align="center">
      <md-card>
        <md-card-media>
          <img src="https://i.imgur.com/a8OU84y.jpg" alt="People" style="max-height: 30vh">
        </md-card-media>

        <md-card-header>
          <div class="md-title">To Do List</div>
          <div class="md-subhead">{{user.name}}</div>
        </md-card-header>
        <md-card-content>
          <md-card v-for="todo in todos">
            <md-card-header>
              <div class="md-title">{{todo.category}}</div>
              <div class="md-subhead"><span>Created at: {{dateFormatting(todo.created_at)}}</span><span style="float:right">Due Date: {{dateFormatting(todo.due_date)}}</span></div>
            </md-card-header>
            <md-card-content>
              {{todo.todo}}
            </md-card-content>
            <md-card-actions>
              <md-button class="md-icon-button md-accent" v-if="todo.star" @click="starred(todo._id)">
                <md-icon>star</md-icon>
              </md-button>
              <md-button class="md-icon-button" v-else @click="starred(todo._id)">
                <md-icon>star</md-icon>
              </md-button>
              <md-button class="md-icon-button md-primary" v-if="todo.finished_at" @click="finished(todo._id)">
                <md-icon>check</md-icon>
              </md-button>
              <md-button class="md-icon-button" v-else @click="finished(todo._id)">
                <md-icon>check</md-icon>
              </md-button>
              <md-button class="md-primary md-raised" @click="populateForm(todo._id)">
                Edit
              </md-button>
              <md-button class="md-warn md-raised" @click="deleteTodo(todo._id)">
                Delete
              </md-button>
            </md-card-actions>
          </md-card>
        </md-card-content>
      </md-card>
    </md-layout>
  </md-layout>
  <md-dialog ref="dialogEdit">
    <md-dialog-title>Edit Todo</md-dialog-title>
    <form @submit.prevent="submit">
      <md-dialog-content>
        <md-input-container>
          <label>Todo</label>
          <md-input type="text" v-model="todo" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Due Date</label>
          <md-input type="date" v-model="due_date" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Category</label>
          <md-input type="text" v-model="category" required></md-input>
        </md-input-container>
        <md-checkbox id="my-test1" name="my-test1" v-model="star">Starred</md-checkbox>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('dialogEdit')">Cancel</md-button>
        <md-button class="md-primary" type="submit">Ok</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      todo: '',
      _id: '',
      due_date: '',
      category: '',
      star: false
    }
  },
  methods: {
    deleteTodo (id) {
      this.$http.delete('/todos/' + id).then(({data}) => {
        console.log(data)
        this.$store.commit('deleteTodo', data.data._id)
        this.$swal({
          title: 'Yeah!',
          text: 'Todo Deleted',
          type: 'success',
          confirmButtonText: 'Cool'
        })
      }).catch((err) => {
        console.error(err)
      })
    },
    starred (id) {
      this.$http.post('/todos/star/' + id).then(({data}) => {
        this.$store.commit('updateTodo', data.data)
        this.$swal({
          title: 'Yeah!',
          text: 'Todo Starred',
          type: 'success',
          confirmButtonText: 'Cool'
        })
      }).catch((err) => {
        this.$swal({
          title: 'Oops!',
          text: 'There\'s some error',
          type: 'error',
          confirmButtonText: 'Sad:('
        })
        console.error(err)
      })
    },
    finished (id) {
      this.$http.post('/todos/finished/' + id).then(({data}) => {
        this.$store.commit('updateTodo', data.data)
        this.$swal({
          title: 'Yeah!',
          text: 'Todo Mark as Finished',
          type: 'success',
          confirmButtonText: 'Cool'
        })
      }).catch((err) => {
        this.$swal({
          title: 'Oops!',
          text: 'There\'s some error',
          type: 'error',
          confirmButtonText: 'Sad:('
        })
        console.error(err)
      })
    },
    populateForm (id) {
      var index = this.todos.findIndex((element) => {
        if (element._id === id) {
          return element
        }
      })
      this._id = this.todos[index]._id
      this.todo = this.todos[index].todo
      this.category = this.todos[index].category
      this.due_date = ''
      this.due_date += new Date(this.todos[index].due_date).getFullYear() + '-'
      this.due_date += new Date(this.todos[index].due_date).getMonth()+1 + '-'
      var date = new Date(this.todos[index].due_date).getDate()
      if(date < 10) {
        date = '0' + date
      }
      this.due_date += date
      if (this.todos[index].star) {
        this.star = true
      } else {
        this.star = false
      }
      this.$refs['dialogEdit'].open()
    },
    submit () {
      if (this.star) {
        this.star = 'starred'
      } else {
        this.star = ''
      }
      this.$http.put('/todos/' + this._id, {
        todo: this.todo,
        due_date: new Date(this.due_date),
        starred: this.star,
        category: this.category
      }).then(({data}) => {
        console.log(data)
        this.$store.commit('updateTodo', data.data)
        this.$swal({
          title: 'Yeah!',
          text: 'Todo Updated',
          type: 'success',
          confirmButtonText: 'Cool'
        })
      }).catch((err) => {
        this.$swal({
          title: 'Oops!',
          text: 'There\'s some error',
          type: 'error',
          confirmButtonText: 'Sad:('
        })
        console.error(err)
      })
    },
    dateFormatting (date) {
      var temp = ''
      temp += new Date(date).getFullYear() + '-'
      var month = new Date(date).getMonth()+1
      if(month< 10) {
        month = '0' + month
      }
      temp += month + '-'
      var date = new Date(date).getDate()
      if(date < 10) {
        date = '0' + date
      }
      temp += date
      return temp
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    todos () {
      return this.$store.state.todos
    }
  }
}
</script>

<style lang="css">
</style>
