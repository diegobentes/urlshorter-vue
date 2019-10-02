<template>
    <div>
        <b-row>
            <b-colxx class="disable-text-selection">
                
                <b-row>
                    <b-colxx xxs="12">
                        <h1>Usuários</h1>

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
                                title="Novo Usuário"
                            >
                                <b-form>
                                    <b-form-group>
                                        <template slot="label">
                                            Qual seu <strong>Nome</strong>?
                                        </template>
                                        <b-form-input
                                            id="nome"
                                            v-model="form.nome"
                                            type="text"
                                            required
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group>
                                        <template slot="label">
                                            Qual seu <strong>Email</strong>?
                                        </template>
                                        <b-form-input
                                            id="email"
                                            v-model="form.email"
                                            type="email"
                                            required
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group>
                                        <template slot="label">
                                            Qual <strong>Usuário</strong> você quer usar?
                                        </template>
                                        <b-form-input
                                            id="usuario"
                                            v-model="form.usuario"
                                            type="text"
                                            required
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group>
                                        <template slot="label">
                                            Informe sua <strong>Senha</strong>:
                                        </template>
                                        <b-form-input
                                            id="senha"
                                            v-model="form.senha"
                                            type="password"
                                            required
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group label="">
                                        <template slot="label">
                                            <strong>Repete sua senha</strong> para confirmação?
                                        </template>
                                        <b-form-input
                                            id="repeatsenha"
                                            v-model="form.repeatsenha"
                                            type="password"
                                            required
                                        ></b-form-input>
                                    </b-form-group>
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
                    <b-colxx cols="8">
                        <b-card class="mb-4">
                            
                            <b-table hover title="Usuarios"  :fields="fields" :items="items">
                                <!-- busy="true" -->
                                <template v-slot:cell(operacoes)="data">
                                    <b-button variant="outline-warning" size="sm" @click="editItem(data)">Editar</b-button>
                                    <b-button variant="outline-danger" size="sm" class="ml-2" @click="deleteItem(data)">Excluir</b-button>
                                </template>

                                <template v-slot:table-busy>
                                    <div class="text-center text-danger my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong> Carregando...</strong>
                                    </div>
                                </template>
                                
                                <template v-slot:table-caption>Listas de usuários</template>
                            </b-table>

                        </b-card>
                    </b-colxx>
                </b-row>

            </b-colxx>
        </b-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            eventForm: 'save',
            selectedItem: null,

            fields: [
                { key: 'nome', label: 'Nome' },
                { key: 'usuario', label: 'Usuário' },
                { key: 'email', label: 'Email' },
                { key: 'operacoes', label: 'Operações' }
            ],
            items: [
                { email: 'a@a.com', nome: 'Mark', usuario: 'Otto' },
                { email: 'a@a.com', nome: 'Jacob', usuario: 'Thornton' },
                { email: 'a@a.com', nome: 'Lary', usuario: 'the Bird' }
            ],
            form: {
                id: null,
                nome: '',
                email: '',
                usuario: '',
                senha: '',
                repeatsenha: ''
            }
        }
    },
    methods: {
        saveItem() {
            this.items.push({
                email: this.form.email,
                nome: this.form.nome,
                usuario: this.form.usuario
            })
            this.resetAttributes()
            this.$refs['modalright'].hide()
        },
        deleteItem(item) {
            if(confirm('Você tem certeza que deseja apagar este item?')){
                this.items.splice(item.index, 1);
            }
        },
        editItem(data) {
            this.setFormAttributes(data)
            this.eventForm = 'edit'
            this.selectedItem = data
            this.$refs['modalright'].show()
        },
        updateItem() {
            this.updateListAttributes(this.selectedItem.index)
            this.resetAttributes()
            this.$refs['modalright'].hide()
        },
        setFormAttributes(data) {
            this.form.id = data.item.id
            this.form.nome = data.item.nome
            this.form.email = data.item.email
            this.form.usuario = data.item.usuario
        },
        updateListAttributes(index) {
            this.items[index].id = this.form.id
            this.items[index].nome = this.form.nome
            this.items[index].email = this.form.email
            this.items[index].usuario = this.form.usuario
        },
        resetAttributes() {
            this.eventForm = 'save'
            this.selectedItem = null

            this.form.id = null
            this.form.nome = ''
            this.form.email = ''
            this.form.usuario = ''
        },
    },
    computed: {
        formFunction(){
            let fx = this.eventForm == 'save' ? () => this.saveItem : () => this.updateItem
            return fx()
        }
    }
}
</script>