<template>
    <b-container v-show="notFound">
        <b-row>
            <b-colxx cols="6" offset="3">
                <b-card class="mb-4" title="404 Page not Found">
                    <b-card-body>
                        <h1><strong>Ooops!</strong> Desculpe, alguém não está mais usando esta magnífica URL curta!</h1>   
                    </b-card-body>
                    <b-card-footer>
                        <a href="/">Ir para página inicial</a>
                    </b-card-footer>
                </b-card>
            </b-colxx>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            notFound: false
        }
    },
    created(){
        let self = this
        self.axios.get(`/${self.$route.params.shortUrl}`)
            .then(res => {
                window.location.href = res.data.long_url
            })
            .catch(() => {
                self.notFound = true
            })
    }
}
</script>