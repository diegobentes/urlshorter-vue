<template>
    <b-card :class="activeItem" class="d-flex flex-row" @mouseenter="selectCard(data)" @mouseleave="diselectCard()" no-body>
        <div class="pl-2 d-flex flex-grow-1 min-width-zero">
            <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
     
              <b-container>
                <b-row>
                  <b-col cols="10">
                    <b-row>
                      <b-col>
                        <h3 style="color: orangered">URL Curta</h3>
                        <p class="list-item-heading mb-1 w-sm-100">{{data.shortUrl}}</p>
                      </b-col>
                      <b-col>
                        <h3>URL Longa</h3>
                        <p class="list-item-heading mb-1 w-sm-100">{{data.longUrl}}</p>
                      </b-col>
                      <b-col>
                        <h5>Momento da Geração</h5>
                        <p class="list-item-heading mb-1 w-sm-100">{{data.createdAt}}</p>
                      </b-col>
                      <b-col style="color: grey; text-align: center;">
                        <h5>Status:</h5>
                        <b-badge @click="changeStatusItem" pill :variant="statusColor">{{ statusName }}</b-badge>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="2" class="mt-2">
                    <b-button variant="outline-warning" size="sm" @click="editItem()">Editar</b-button>
                    <b-button variant="outline-danger" size="sm" class="ml-2" @click="deleteItem()">Excluir</b-button>
                  </b-col>
                </b-row>
              </b-container>

            </div>
        </div>
    </b-card>
</template>

<script>
  export default {
    props: ['data'],
    data() {
      return {
        selectedItem: null
      }
    },
    methods: {
      deleteItem() {
        this.$emit('deleteLink')
      },
      editItem() {
        this.$emit('editLink')
      },
      changeStatusItem() {
        this.$emit('changeStatus')
      },
      selectCard(data) {
        this.selectedItem = data
      },
      diselectCard(){
        this.selectedItem = null
      }
    },
    computed: {
      activeItem(){
        return this.selectedItem == this.data ? 'active' : ''
      },
      statusColor(){
        return this.data.status ? 'success' : 'danger'
      },
      statusName(){
        return this.data.status ? 'Ativo' : 'Inativo'
      }
    }
  }
</script>
