<template>
	<!-- 这是页面的返回按钮组件 -->
	<p class="pfh">
		<span class="fhbtn iconfont icon-left" @click.self="fhbtn"></span>
		<span class="s2"><slot></slot></span>
	</p>
</template>

<script>
	export default{
		methods:{
			fhbtn(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.pfh{
		position: fixed;
		text-align: left;
		top: 0;
		width: 100%;
		left: 0;
		line-height: 2.5rem;
		height: 2.5rem;
		z-index: 2;
		background-color: #fc4141;
		.fhbtn{
			font-weight: bold;
			font-size: 1.5rem;
			color: white;
			z-index: 2;
			position: absolute;
			left: 0.4375rem;
		}
		.s2{
			font-weight: bold;
			font-size: 1.125rem;
			color: white;
			z-index: 2;
			position: absolute;
			left: 2.5rem;
		}
	}
</style>
