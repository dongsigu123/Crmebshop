<template>
	<!-- 这是首页的新闻简报 -->
	<div class="newsbulletin">
		<div class="cont">
			<van-notice-bar left-icon="volume-o" :scrollable="false">
				<template #left-icon>
					<img class="img" src="../assets/newsbulletin.png" alt="">
				</template>
				<template #default>
					<van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
						<van-swipe-item v-for="i in indexdata.roll" :key="i.id" >
							<router-link tag="p" to="/newsbulletin" class="p">{{i.info}}<span class="iconfont icon-right"></span></router-link>
						</van-swipe-item>
					</van-swipe>
				</template>
			</van-notice-bar>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			indexdata:Object
		}
	}
</script>

<style lang="less" scoped="scoped">
	.newsbulletin{
		width: 100%;
		height: 2.8125rem;
		line-height: 2.8125rem;
		background-color: white;
		.cont{
			width: 95%;
			margin: 0 auto;
			border-bottom: 1px solid #e3e3e3;
		}
		.img{
			width: 20%;
			padding-right: 0.625rem;
			border-right: 1px solid #e3e3e3;
		}
		.van-notice-bar{
			background-color: white;
			padding: 0;
			/deep/ .van-notice-bar__content.van-ellipsis{
				width: 100%;
			}
		}
		.van-swipe{
			width: 100%;
			height: 2.8125rem;
			line-height: 2.8125rem;
			padding-left: 0.3125rem;
			font-size: 0.75rem;
			color: #666;
			p{
				text-align: left;
			}
			span{
				float: right;
				font-size: 0.875rem;
			}
		}
	}
</style>
