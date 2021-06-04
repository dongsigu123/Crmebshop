import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
//处理重定向抛出异常问题
const a = VueRouter.prototype.push;
VueRouter.prototype.push =function push(location) {
  return a.call(this, location).catch(err => err);
}
Vue.use(VueRouter)

const routes = [
	{
		path: '/',//首页
		name: 'Home',
		component: Home,
		meta:{showNav:true,keepAlive:true}
	},
	{
		path: '/category',//分类
		name: 'Category',
		component: () => import('../views/Category.vue'),
		meta:{showNav:true,keepAlive:true}
	},
	{
		path: '/shoppingcart',//购物车
		name: "Shoppingcart",
		component: () => import('../views/Shoppingcart.vue'),
		meta:{showNav:true,needLogin:true,keepAlive:false}
	},
	{
		path: '/mine',//我的
		name: "Mine",
		component: () => import('../views/Mine.vue'),
		meta:{showNav:true,needLogin:true,keepAlive:false}
	},
	{
		path: '/search',//搜索
		name: "Search",
		component: () => import('../views/Search.vue'),
		meta:{showNav:false,keepAlive:true}
	},
	{
		path: '/coupon',//优惠卷页面
		name: "Coupon",
		component: () => import('../views/Coupon.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path: '/information',//行业资讯页面
		name: "Information",
		component: () => import('../views/Information.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path: '/secondkill',//秒杀活动页面
		name: "Secondkill",
		component: () => import('../views/Secondkill.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path: '/newsbulletin',//新闻简报页面
		name: "Newsbulletin",
		component: () => import('../views/Newsbulletin.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path: '/shopsearch',//商品搜索显示页面
		name: "Shopsearch",
		component: () => import('../views/Shopsearch.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path: '/login',//登录页面
		name: "Login",
		component: () => import('../views/Login.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path: "/productdetails/:shopid",//商品详情页面
		name: "Productdetails",
		component: () => import('../views/Productdetails.vue'),
		meta:{showNav:false,keepAlive:false},
		beforeEnter:(to,from,next)=>{//路由独享守卫
			// console.log("beforeEach",to);
			next();
		}
	},
	{
		path: "/combination/:myvalue",//精品推荐、热门榜单、首发新品、促销单品页面
		name: "Combination",
		component: () => import('../views/Combination.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path: '/settlement',//立即结算页面
		name: "Settlement",
		component: () => import('../views/Settlement.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path: '/paymentfailed',//支付失败页面
		name: "Paymentfailed",
		component: () => import('../views/Paymentfailed.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path: '/payment',//立即付款页面
		name: "Payment",
		component: () => import('../views/Payment.vue'),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/orderinformation",//订单信息页面
		name:"Orderinformation",
		component:()=> import("../views/Orderinformation.vue"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/collection",//用户收藏页面
		name:"Collection",
		component:()=> import("../views/Collection.vue"),
		meta:{showNav:false,needLogin:true,keepAlive:false}
	},
	{
		path:"/refund",//申请退款页面
		name:"Refund",
		component:()=> import("../views/Refund.vue"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/refundsuccessful",//退款成功页面
		name:"Refundsuccessful",
		component:()=> import("../views/Refundsuccessful.vue"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/userrefund",//用户退款页面
		name:"Userrefund",
		component:()=> import("../views/Userrefund.vue"),
		meta:{showNav:false,keepAlive:false}
	},
	{
		path:"/setup",//设置页面
		name:"Setup",
		component:()=> import("../views/Setup.vue"),
		meta:{showNav:false,keepAlive:false}
	}
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
	// console.log("needLogin",to.meta.needLogin);
	// console.log("isLogin",store.getters["isLogin"]);
	//to.meta.needLogin 需要登录, isLogin 没有登录返回false
	let token = document.cookie;
	let userinfo = localStorage.getItem("userinfo");
	// console.log(token);
	// console.log(userinfo);
	if(to.meta.needLogin&&!userinfo){
		if(to.name=="Shoppingcart"){
			next("/login?url=2");
		}else if(to.name=="Mine"){
			next("/login?url=3");
		}
	}
	// console.log(to)
	next();
})
export default router
