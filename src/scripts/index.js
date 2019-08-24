Vue.use(VueResource)

Vue.http.options.root = 'http://jsonplaceholder.typicode.com/'

new Vue({
  el: '#app',
  data: {
    filtro: '',
    usuarios: [],
    buscandoUsuarios: true
  },
  created () {
    this.buscarUsuarios()
  },
  computed: {
    filtros () {
      return this.usuarios
        .map(item => item.email.split('.').pop())
        .reduce((acumulador, atual) => {
          if (!acumulador.includes(atual)) {
            acumulador.push(atual)
          }

          return acumulador
        }, [])
    },
    listaFiltrada () {
      if (!this.filtro) return this.usuarios
      return this.usuarios.filter(usuario => usuario.email.endsWith(this.filtro))
    }
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