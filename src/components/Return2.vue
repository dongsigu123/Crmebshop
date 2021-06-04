<template>
	<p class="pfh">
		<span class="fhbtn iconfont icon-left" @click.self="fhbtn"></span>
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
		width: 10%;
		left: 0;
		line-height: 2.5rem;
		height: 2.5rem;
		z-index: 100;
		.fhbtn{
			font-weight: bold;
			font-size: 1.5rem;
			color: #999;
			z-index: 100;
			position: absolute;
			left: 5%;
		}
	}
</style>
