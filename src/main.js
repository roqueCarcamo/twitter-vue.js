import Vue from 'vue'
import App from './App.vue'
import Tweest from './Tweest.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#tweest',
  render: h => h(Tweest)
})

