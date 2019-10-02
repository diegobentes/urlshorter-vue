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
                                title="Usuário"
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
                                            :disabled="eventForm == 'edit'"
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
                                            :disabled="eventForm == 'edit'"
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
                                    type="submit"
                                    variant="primary"
                                    @click.prevent="formFunction"
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
                            
                            <b-table :busy="formBusy" hover title="Usuarios"  :fields="fields" :items="items">
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
            formBusy: false,

            fields: [
                { key: 'nome', label: 'Nome' },
                { key: 'usuario', label: 'Usuário' },
                { key: 'email', label: 'Email' },
                { key: 'operacoes', label: 'Operações' }
            ],
            items: [],
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
            let self = this

            self.axios.post('/users', {
                name: self.form.nome,
                username: self.form.usuario,
                email: self.form.email,
                password: self.form.senha,
                password_confirmation: self.form.repeatsenha
            })
                .then(res => {
                    this.items.push({
                        id: res.data.id,
                        email: res.data.email,
                        nome: res.data.name,
                        usuario: res.data.username
                    })
                    this.resetAttributes()
                    this.$refs['modalright'].hide()
                })
        },
        deleteItem(data) {
            if(confirm('Você tem certeza que deseja apagar este item?')){
                let self = this
                self.toogleFormBusy()
                if( localStorage.getItem('current_user') == data.item.usuario) {
                    alert('Não é possível apagar o usuário ativo')
                }else{
                    self.axios.delete(`/users/${data.item.usuario}`)
                        .then(() => {
                            self.items.splice(data.index, 1);
                            self.toogleFormBusy()
                        })
                }
            }
        },
        editItem(data) {
            this.setFormAttributes(data)
            this.eventForm = 'edit'
            this.selectedItem = data
            this.$refs['modalright'].show()
        },
        updateItem() {
            let self = this

            self.axios.put(`/users/${self.selectedItem.item.usuario}`, {
                name: this.form.nome,
                password: this.form.senha,
                password_confirmation: this.form.repeatsenha
            })
                .then(() => {
                    this.updateListAttributes(this.selectedItem.index)
                    this.resetAttributes()
                    this.$refs['modalright'].hide()
                })
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
        toogleFormBusy(){
            this.formBusy = !this.formBusy
        }
    },
    computed: {
        formFunction(){
            let fx = this.eventForm == 'save' ? () => this.saveItem : () => this.updateItem
            return fx()
        }
    },
    created() {
        this.toogleFormBusy()
        let self = this
        self.axios.get('/users')
            .then(res => {
                for(var index in res.data){
                    self.items.push({
                        id: res.data[index].id,
                        email: res.data[index].email,
                        nome: res.data[index].name,
                        usuario: res.data[index].username
                    })
                }
                self.toogleFormBusy()
            })
    }
}
</script>