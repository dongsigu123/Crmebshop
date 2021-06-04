<template>
	<!-- 这是的轮播2组件 -->
	<div :class="index==1?'banner2':'banner'">
		<van-swipe :autoplay="3000">
			<van-swipe-item v-for="(image, index) in images" :key="index">
				<img v-lazy="image.img+'?imageView=1&type=webp&thumbnail=246x0'" />
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	export default {
		props:{
			images:Array,
			index:Number
		}
	}
</script>

<style lang="less" scoped="scoped">
	.banner{
		width: 100%;
	}
	.banner2{
		width: 95%;
		margin: 0 auto;
	}
	.banner,.banner2{
		img{
			width: 100%;
			height: 8.75rem;
		}
	}
</style>
