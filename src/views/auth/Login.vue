<template>
    <b-container>
        <b-row>
            <b-colxx cols="6" offset="3">
                <b-card class="mb-4" title="URL Shortner | Entre com suas credenciais">
                <b-form @submit.prevent="loginSubmit">
                    <b-form-group label="Usuário" description="Digite seu nome de usuario">
                    <b-form-input type="text" v-model="email" />
                    </b-form-group>
                    <b-form-group label="Senha" description="Digite sua senha">
                    <b-form-input type="password" v-model="password"/>
                    </b-form-group>
                    <b-form-group>
                    </b-form-group>
                    <b-button type="submit" variant="primary" class="mt-4">Entrar</b-button>
                </b-form>
                </b-card>
            </b-colxx>
        </b-row>
    </b-container>
</template>

<script>
export default {
  data () {
    return {
        email: '',
        password: ''
    }
  },
  methods: {
    loginSubmit () {
        this.axios.post('/auth/login', {
            email: this.email,
            password: this.password
        })
        .then((res) => {
            localStorage.setItem('current_user', res.data.username)
            localStorage.setItem('token', res.data.token)
            this.$router.push('/urls')
        })
        .catch((err) => {
            alert('usuario e senha nao encontrados');
        })
    }
  },
  created() {
      if (  localStorage.getItem('current_user') != 'undefined' 
        && localStorage.getItem('current_user') != null 
        && localStorage.getItem('current_user').length > 0  ) {
            this.$router.push('/urls')
        }
  }
}
</script>