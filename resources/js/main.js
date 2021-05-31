import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'

Ingor.pages(name => import(`./Pages/${name}`))
Ingor.components(() => require.context('./Components', true, /\.(vue|js|jsx|ts|tsx)$/i))

Ingor.plugin(Vue => {
  Vue.use(Antd)
  Vue.use(Viser)
  Vue.use(VueCropper)
})
