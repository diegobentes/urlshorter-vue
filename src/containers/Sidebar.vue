<template>
    <div class="sidebar">        
        <div class="main-menu">
            <vue-perfect-scrollbar class="scroll">
                <ul class="list-unstyled">
                    <li v-for="menu in menus" 
                        :key="menu.name" 
                        :class="{ active : selectedMenu === menu.name }"
                        @click.prevent="menuClick(menu)"
                    >
                        <a>
                            <i :class="menu.icon"></i> {{ menu.label }}
                        </a>
                    </li>
                </ul>
            </vue-perfect-scrollbar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedMenu: "urls",
                menus: [
                    {
                        name: "urls",
                        link: "/urls",
                        label: "URL's",
                        icon: "iconsminds-arrow-right-2"
                    },
                    {
                        name: "usuarios",
                        link: "/usuarios",
                        label: "Usuários",
                        icon: "iconsminds-user"
                    }
                ]
            }
        },
        methods: {
            menuClick(menu) {
                this.selectedMenu = menu.name
                this.$router.push(menu.link)
            }
        }
    }
</script>