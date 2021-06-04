import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token:null,
		userInfo:null
	},
	getters:{
		isLogin(state){//定义判断是否有登录
			return state.token&&state.userInfo;
		}
	},
	mutations: {
		modifystate(state,payload){
			for(let s in state){
				for(let p in payload){
					if(s == p){
						state[s]=payload[p]
						// console.log(p)
					}
				}
			}
			// console.log(state)
		},
		setToken(state,payload){
		  state.token=payload;
		},
		setUser(state,payload){
		  state.userInfo=payload;
		}
	},
	actions: {
		getUser(context){
			let token=context.state.token;
				axios({
					method:"GET",
					url:'http://47.115.51.185/api/user',
					headers: {//设置http请求的头信息
						//在头部里面通过Authori-zation 这个字段传递token
						'Authori-zation':'Bearer '+token,
						// 'token':token
					},
					data:{
						token:token
					}
				}).then(d=>{//用户信息
					console.log(d)
					context.commit('setUser',d.data.data);
			})
		}
	},
	modules: {
	}
})
