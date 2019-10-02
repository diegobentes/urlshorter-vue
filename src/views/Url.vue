<template>
    <div>
        <b-row>
            <b-colxx class="disable-text-selection">
                
                <b-row>
                    <b-colxx xxs="12">
                        <h1>Meus ShortLinks</h1>
                        
                        <div class="top-right-button-container">
                            
                            <b-button
                                v-b-modal.modalright
                                variant="primary"
                                size="lg"
                                class="top-right-button"
                                @click.prevent="resetAttributes()"
                            >Novo</b-button>

                            <b-modal
                                modal-class="modal-right"
                                dialog-class="modal-dialog"
                                id="modalright"
                                ref="modalright"
                                title="Criar ShortLink"
                            >
                                <b-form>
                                    <b-form-group label="Qual a URL que você quer encurtar?" />
                                    <b-textarea rows="2" max-rows="2" v-model="longUrl"/>
                                </b-form>

                                <template slot="modal-footer">
                                    <b-button
                                    variant="primary"
                                    @click="formFunction"
                                    class="mr-1"
                                    >Salvar</b-button>
                                </template>

                            </b-modal>

                        </div>
                    </b-colxx>
                </b-row>

                <div class="separator mb-5 mt-3"/>

                <b-row>
                    <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
                        <data-list-item
                            :key="item.id"
                            :data="item"
                            @deleteLink="deleteItem(item)"
                            @editLink="editItem(item)"
                            @changeStatus="changeStatusItem(item)"
                        />
                    </b-colxx>
                </b-row>

            </b-colxx>
        </b-row>
    </div>
</template>

<script>
import DataListItem from '@/components/Listing/DataListItem'

export default {
    components: {
        DataListItem
    },
    data(){
        return {
            id: null,
            longUrl: '',
            shortUrl: '',
            createdAt: '',
            status: null,

            eventForm: 'save',
            selectedItem: null,

            items: [
                {
                    id: 1,
                    longUrl: 'http://www.google.com.br',
                    shortUrl: 'http://localhost:3000/abcd',
                    createdAt: '30/09/2019 22:29',
                    status: true
                },
                {
                    id: 2,
                    longUrl: 'http://www.google.com.br',
                    shortUrl: 'http://localhost:3000/abcd',
                    createdAt: '30/09/2019 22:29',
                    status: false
                },
            ],
        }
    },
    methods: {
        saveItem() {
            this.items.push({
                id: Math.random,
                longUrl: this.longUrl,
                shortUrl: 'http://localhost:3000/r4ett',
                createdAt: '01/10/2019 03:52',
                status: true
            })
            this.resetAttributes()
            this.$refs['modalright'].hide()
        },
        deleteItem(item) {
            if(confirm('Você tem certeza que deseja apagar este item?')){
                this.items.splice(this.items.indexOf(item), 1);
            }
        },
        editItem(item) {
            this.setAttributes(item)
            this.eventForm = 'edit'
            this.selectedItem = item
            this.$refs['modalright'].show()
        },
        updateItem() {
            this.setListAttributes(this.items.indexOf(this.selectedItem))
            this.resetAttributes()
            this.$refs['modalright'].hide()
        },
        changeStatusItem(item) {
            this.items[this.items.indexOf(item)].status = !this.items[this.items.indexOf(item)].status
        },
        resetAttributes() {
            this.id = null
            this.longUrl = ""
            this.shortUrl = ""
            this.createdAt = ""
            this.status = null
            this.eventForm = 'save'
            this.selectedItem = null
        },
        setAttributes(item) {
            this.id = item.id
            this.longUrl = item.longUrl
            this.shortUrl = item.shortUrl
            this.createdAt = item.createdAt
            this.status = item.status
        },
        setListAttributes(index) {
            this.items[index].id = this.id
            this.items[index].longUrl = this.longUrl
            this.items[index].shortUrl = this.shortUrl
            this.items[index].createdAt = this.createdAt
            this.items[index].status = this.status
        }
    },
    computed: {
        formFunction(){
            let fx = this.eventForm == 'save' ? () => this.saveItem : () => this.updateItem
            return fx()
        }
    }
}
</script>