import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import {
	Tabbar,TabbarItem,Icon,Image,Swipe,SwipeItem,Lazyload,Search,
	Grid,GridItem,NoticeBar,Button,Form,Field,Tabs,Tab,Toast,
	Dialog,Badge,GoodsAction,GoodsActionIcon,GoodsActionButton,
	Sku,IndexBar,IndexAnchor,Popup,Cell,Card,Stepper,SubmitBar,
	Checkbox,CheckboxGroup,Step,Steps
} from 'vant';
import "vant/lib/index.css"

Vue.config.productionTip = false
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Icon).use(NoticeBar).use(Toast).use(Dialog).use(Badge)
Vue.use(Image).use(Tabs).use(Tab);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Search);
Vue.use(Grid).use(GridItem);
Vue.use(NoticeBar);
Vue.use(Form).use(Field).use(Button).use(Stepper).use(SubmitBar).use(Checkbox).use(CheckboxGroup)
Vue.use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton)
Vue.use(Sku);
Vue.use(IndexBar).use(IndexAnchor);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(Card);
Vue.use(Step).use(Steps)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

var myrem = document.documentElement.clientWidth*16/375;
document.documentElement.style.fontSize=myrem+"px";
document.body.style.backgroundColor="#f5f5f5";
window.addEventListener("resize",function(){
	myrem = document.documentElement.clientWidth*16/375;
	document.documentElement.style.fontSize=myrem+"px";
})