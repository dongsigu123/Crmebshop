<template>
	<div id="app">
		<Footnav v-show="$route.meta.showNav"></Footnav>
		<keep-alive>
			<router-view v-if='$route.meta.keepAlive'/>
		</keep-alive>
		<router-view v-if='!$route.meta.keepAlive'/>
		<div class="hz" v-show="$route.meta.showNav"></div>
		<div class="shouye" @click="shouye">
			<img v-show="!isshouye" src="./assets/shouye.gif" alt="">
			<img v-show="isshouye" src="./assets/shouye2.gif" alt="">
		</div>
		<transition enter-active-class="animate__animated animate__bounceInRight" leave-active-class="animate__animated animate__bounceOutRight">
			<div v-show="isshouye" class="fanhui">
				<router-link tag="span" @click.native="btn" to="/" class="s1 iconfont icon-index"></router-link>
				<router-link tag="span" @click.native="btn" to="/shoppingcart" class="s2 iconfont icon-gouwuchekong"></router-link>
				<router-link tag="span" @click.native="btn" to="/mine" class="s3 iconfont icon-wode"></router-link>
			</div>
		</transition>
	</div>
</template>

<script>
	import Footnav from "./components/Footnav.vue"
	export default{
		components:{
			Footnav
		},
		data(){
			return {
				isshouye:false
			}
		},
		methods:{
			shouye(){
				if(this.isshouye){
					this.isshouye=false;
				}else{
					this.isshouye=true;
				}
			},
			btn(){
				this.isshouye=false;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	.hz{
		width: 100%;
		height: 3.125rem;
	}
	.shouye{
		position: fixed;
		bottom: 15%;
		right: 3%;
		width: 2.8125rem;
		height: 2.8125rem;
		z-index: 4;
		img{
			width: 99%;
			height: 99%;
			vertical-align: bottom;
			transform: rotateZ(90deg);
		}
	}
	.fanhui{
		width: 8.125rem;
		position: fixed;
		bottom: 15%;
		padding: 0 0.75rem;
		right: 17%;
		height: 2.8125rem;
		border-radius: 4.0625rem;
		background-color: #f44939;
		display: flex;
		align-items: center;
		z-index: 3;
		span{
			color: white;
			flex: 1;
			font-size: 1.25rem;
		}
	}
}

</style>
