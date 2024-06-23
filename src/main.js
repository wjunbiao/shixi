import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { Search as ElIconSearch } from '@element-plus/icons-vue';


const app = createApp(App);



// main.ts

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.component('Search', ElIconSearch);

app.use(router);
app.use(store);
app.use(ElementPlus);


app.mount('#app');