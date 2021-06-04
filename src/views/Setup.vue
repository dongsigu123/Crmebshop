<template>
	<!-- 这是设置页面 -->
	<div class="setup">
		<Return2></Return2>
		<button @click="btn">退出</button>
	</div>
</template>

<script>
	import Return2 from "../components/Return2.vue"
	export default{
		components:{
			Return2
		},
		methods:{
			btn(){
				localStorage.removeItem("userinfo");
				this.$toast("退出成功！");
				this.$router.push('/')
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.setup{
		width: 100%;
		position: relative;
		button{
			position: absolute;
			background-color: #ee0a24;
			color: white;
			border-radius: 3px;
			padding: 0.3125rem 0.75rem;
			left: 50%;
			top: 50vh;
			border: none;
			outline: none;
			transform: translate(-50%,-50%);
		}
	}
</style>
