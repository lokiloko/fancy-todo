<template lang="html">
<div>
  <NavBar/>
  <ListTodo/>
</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import ListTodo from '@/components/ListTodo'
import { mapActions } from 'vuex'

export default {
  components: {
    NavBar,
    ListTodo
  },
  methods: {
    ...mapActions([
      'getUsersData',
      'getUsersTodo'
    ])
  },
  created () {
    this.$store.commit('toggleLog')
    if (this.$store.state.loggedIn) {
      this.getUsersData()
      this.getUsersTodo()
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="css">
</style>
