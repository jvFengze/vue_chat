import { createApp,directive } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.directive('click-outside', {
    mounted(el, binding) {
      el.clickOutsideEvent = event => {
        // 判断点击是否发生在元素之外
        if (!el.contains(event.target)) {
          binding.value(event); // 调用传进来的函数
        }
      };
      document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
      document.removeEventListener('click', el.clickOutsideEvent);
    },
  });
// app.directive('click-outside', vClickOutside);
app.use(ElementPlus)
app.use(router)
app.mount('#app')

