<template>
	<!-- 这是首页小导航组件 -->
	<div class="homenav">
		<van-grid :border="false" :column-num="4">
			<van-grid-item v-for="(i,k) in indexdata.menus" :key="i.id" :to="'/'+url[k]">
				<van-image width="55%" :src="i.pic+'?imageView=1&type=webp&thumbnail=246x0'" />
				<p class="p">{{i.name}}</p>
			  </van-grid-item>
		</van-grid>
	</div>
</template>

<script>
	export default{
		props:{
			indexdata:Object
		},
		data(){
			return {
				url:["category","coupon","information","mine","mine","secondkill","mine","mine"]
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.homenav{
		width: 100%;
		.p{
			font-size: 0.875rem;
			color: #333;
		}
	}
</style>
