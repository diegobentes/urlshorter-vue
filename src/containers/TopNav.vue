<template>
  <nav class="navbar fixed-top">

    <div class="d-flex align-items-center navbar-left">
      <a href="#" class="menu-button d-none d-md-block">
        <VueLogo />
      </a>
    </div>

    <router-link class="mt-2" tag="a" to="/dashboard">
      <h2>URL Shortner</h2>
    </router-link>

    <div class="navbar-right">
      <div class="user d-inline-block">
        <b-dropdown
          class="dropdown-menu-right"
          right
          variant="empty"
          toggle-class="p-0"
          menu-class="mt-3"
          no-caret
        >
          <template slot="button-content">
            <span class="iconify" data-icon="simple-line-icons:user" data-inline="false"></span>
            <span class="ml-2">Usuário</span>
          </template>
          <b-dropdown-item @click="logOut">Sair</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

  </nav>
</template>

<script>
  import { VueLogo } from '@/components/Svg'

  export default {
    components: {
      VueLogo
    },
    methods: {
      logOut() {
        localStorage.removeItem('user')
        this.$router.push('/auth/login')
      }
    }
  }
</script>