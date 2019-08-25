Vue.use(VueResource)

Vue.http.options.root = 'https://jsonplaceholder.typicode.com/'

new Vue({
  el: '#app',
  data: {
    erro: null,
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
        .map(item => `.${item.email.split('.').pop()}`)
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
      this.buscandoUsuarios = true

      this.$http.get('users')
        .then(res => {
          this.erro = null
          this.usuarios = res.data
        })
        .catch(erro => {
          this.erro = 'Não foi possível buscar os usuários tente novamente'
        })
        .finally(() => {
          this.buscandoUsuarios = false
        })
    }
  }
})