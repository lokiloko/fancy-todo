<template lang="html">
<div>
  <md-toolbar class="md-dense" md-theme="brown">
    <md-button class="md-icon-button">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title" style="flex: 1">Todo-Fancy</h2>

    <md-button @click="openDialog('dialogTodo')" id="addNew">Add New Todo</md-button>
    <md-button @click="doLogout" id="addNew">Logout</md-button>
  </md-toolbar>
  <md-dialog md-open-from="#addNew" md-close-to="#addNew" ref="dialogTodo">
    <md-dialog-title>Add New Todo</md-dialog-title>
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
        <md-button class="md-primary" @click="closeDialog('dialogTodo')">Cancel</md-button>
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
      star: '',
      category: '',
      due_date: '',
      todo: ''
    }
  },
  methods: {
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    submit () {
      if (this.star) {
        this.star = 'starred'
      } else {
        this.star = ''
      }
      this.$http.post('/todos/', {
        todo: this.todo,
        due_date: new Date(this.due_date),
        starred: this.star,
        category: this.category
      }).then(({data}) => {
        console.log(data)
        this.$store.commit('addTodo', data.data)
        this.$swal({
          title: 'Yeah!',
          text: 'Todo Added',
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
    doLogout () {
      localStorage.removeItem('token')
      this.$store.commit('toggleLog')
      this.$router.push('/login')
      this.$swal({
        title: 'Oops!',
        text: 'You\' re missing :\'',
        type: 'error',
        confirmButtonText: 'Sad:('
      })
    }
  }
}
</script>

<style lang="css">
</style>
