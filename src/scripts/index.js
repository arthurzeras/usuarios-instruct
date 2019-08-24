Vue.use(VueResource)

Vue.http.options.root = 'http://jsonplaceholder.typicode.com/'

new Vue({
  el: '#app',
  data: {
    filtro: '',
    usuarios: [],
    buscandoUsuarios: true,
    filtros: ['.biz', '.org', '.net']
  },
  created () {
    this.buscarUsuarios()
  },
  methods: {
    buscarUsuarios () {
      this.$http.get('users')
        .then(res => {
          this.usuarios = res.data
        })
        .catch(erro => {
          console.error(erro)
        })
        .finally(() => {
          this.buscandoUsuarios = false
        })
    }
  }
})