// Base library
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'

Water.pages(name => import(`./Pages/${name}`))
Water.components(() => require.context('./Components', true, /\.vue$/i))

Water.plugin((Vue, Water) => {
  Vue.use(Antd)
  Vue.use(Viser)
  Vue.use(VueCropper)
})
