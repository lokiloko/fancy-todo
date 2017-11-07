<template lang="html">
<div id="home">
  <md-button class="md-primary md-raised md-accent" @click="openRegister" style="width:20%; height:20%; font-size:250%">Register</md-button>
  <md-button class="md-primary md-raised" @click="openLogin" style="width:20%; height:20%; font-size:250%">Login</md-button>
  <md-button class="md-primary md-raised" @click="loginFB" style="width:20%; height:20%; font-size:250%">Sign in <br/>Facebook</md-button>
  <md-dialog ref="dialogRegister">
    <md-dialog-title>Register Here</md-dialog-title>
    <form>
      <md-dialog-content>
        <md-input-container>
          <label>Name</label>
          <md-input type="text" v-model="name"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Email</label>
          <md-input type="email" v-model="email"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Password</label>
          <md-input type="password" v-model="password"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Re-Password</label>
          <md-input type="password" v-model="rePassword"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeRegister">Cancel</md-button>
        <md-button class="md-primary" @click="register">Submit</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    }
  },
  methods: {
    loginFB () {
      window.FB.login((response) => {
        console.log(response)
        this.$http.post('/auth/loginFb', {
          accessToken: response.authResponse.accessToken,
          fb_id: response.authResponse.userID
        }).then((res) => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          this.$store.commit('toggleLog')
          this.$router.push('/')
          this.$swal({
            title: 'Hooray',
            text: 'You\' re now logged in',
            type: 'success',
            confirmButtonText: 'Ntap'
          })
        }).catch((err) => {
          this.$swal({
            title: 'Ooops',
            text: 'Your username and password not match',
            type: 'error',
            confirmButtonText: 'What!?'
          })
          console.error(err)
        })
      }, {
        scope: 'public_profile,email'
      })
    },
    register () {
      if (this.password != this.rePassword) {
        this.$swal({
          type: 'error',
          text: 'Password not match'
        })
      } else {
        this.$http.post('/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password
        }).then((data) => {
          console.log(data)
          this.$swal({
            type: 'success',
            text: 'You Have Registered, Go Login Now'
          })
        }).catch((err) => {
          console.error(err)
        })
      }
    },
    openLogin () {
      var self = this
      self.$swal({
        title: 'Input email address',
        input: 'email',
        inputPlaceholder: 'Enter your email address'
      }).then(function(email) {
        self.$swal({
          title: 'Enter your password',
          input: 'password',
          inputPlaceholder: 'Enter your password',
          inputAttributes: {
            'maxlength': 10,
            'autocapitalize': 'off',
            'autocorrect': 'off'
          }
        }).then(function(password) {
          if (password) {
            self.$http.post('/auth/login', {
              email: email,
              password: password
            }).then(({data}) => {
              console.log(data)
              localStorage.setItem('token', data.token)
              self.$store.commit('toggleLog')
              self.$router.push('/')
              self.$swal({
                title: 'Hooray',
                text: 'You\' re now logged in',
                type: 'success',
                confirmButtonText: 'Ntap'
              })
            }).catch((err) => {
              self.$swal({
                title: 'Ooops',
                text: 'Your username and password not match',
                type: 'error',
                confirmButtonText: 'What!?'
              })
              console.error(err)
            })
          } else {
            self.$swal({
              type: 'error',
              text: 'You must provide the password!'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    openRegister() {
      this.$refs.dialogRegister.open()
    },
    closeRegister() {
      this.$refs.dialogRegister.close()
    }
  },
  created () {
    this.$store.commit('toggleLog')
    if (this.$store.state.loggedIn) {
      this.$router.push('/')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="css">
#home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('http://cdn2.hubspot.net/hubfs/53/To_Do_List.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
