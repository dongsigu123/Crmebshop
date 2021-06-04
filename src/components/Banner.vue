<template>
	<!-- 这是全屏轮播组件 -->
	<div class="banner">
		<van-swipe :autoplay="3000">
			<van-swipe-item v-for="(image, index) in images" :key="index">
				<img v-lazy="image.pic+'?imageView=1&type=webp&thumbnail=246x0'" />
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	export default {
		props:["images"]
	}
</script>

<style lang="less" scoped="scoped">
	.banner{
		width: 100%;
	}
</style>
