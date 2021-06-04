<template>
	<!-- 这是底部导航组件 -->
	<van-tabbar class="footnav" route v-model="active" active-color="#fc4141" inactive-color="#282828">
		<van-tabbar-item class="hz" to="/" icon="home-o">
			<span>首页</span>
			<template #icon="props">
				<span class="iconfont icon-index" :class="props.active? icon.active:icon.inactive"></span>
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/category" icon="search">
			<span>分类</span>
			<template #icon="props">
				<span class="iconfont icon-category1" :class="props.active? icon.active:icon.inactive"></span>
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/shoppingcart" icon="friends-o">
			<span>购物车</span>
			<template #icon="props">
				<span class="iconfont icon-gouwuchekong" :class="props.active? icon.active:icon.inactive"></span>
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/mine" icon="setting-o">
			<span>我的</span>
			<template #icon="props">
				<span class="iconfont icon-wode" :class="props.active? icon.active:icon.inactive"></span>
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	export default{
		data(){
			return {
				active: 0,
				icon:{
					active:"active",
					inactive:"inactive"
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.active{
		color: #fc4141;
	}
	.inactive{
		color: #282828;
	}
	.footnav{
		height: 3.125rem;
		z-index: 3;
		/deep/ .van-tabbar-item__icon{
			margin-bottom: 0.125rem;
		}
		span{
			font-size: 0.875rem;
			&.iconfont{
				font-size: 1.125rem;
			}
		}
	}
</style>
