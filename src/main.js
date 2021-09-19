// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Table, TableColumn, Pagination, Button, Input, Message, Dropdown, DropdownMenu, DropdownItem, Tree } from 'element-ui'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://mc-s.tyiyu.plus'; //  请求服务器具体的地址Vue.prototype.$axios = axios
Vue.prototype.$axios = axios
Vue.prototype.qs = qs

Vue.config.productionTip = false
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Input)
Vue.use(Message)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(Tree)

import global_ from './Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
