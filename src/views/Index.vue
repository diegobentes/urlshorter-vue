<template>
    <div id="app" class="menu-default menu-sub-hidden">
      <TopNav />
      <Sidebar />
      <main>
        <div class="container-fluid">
          <router-view/>
        </div>
      </main>
    </div>
</template>

<script>
import TopNav from '@/containers/TopNav'
import Sidebar from '@/containers/Sidebar'

export default {
  components: {
    TopNav,
    Sidebar
  }
}
</script>