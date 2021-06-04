<template>
	<!-- 这是首页的横条小组件 -->
	<div class="homeitem">
		<div class="content">
			<div class="left">
				<p class="p1"><slot></slot></p>
				<p class="p2">{{infoname}}</p>
			</div>
			<div class="right">
				<router-link tag="p" :to="'/'+url">更多</router-link>
				<span class="iconfont icon-right"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			infoname:{
				type:String,
				default:function(){
					return ''
				}
			},
			url:String
		}
	}
</script>

<style lang="less" scoped="scoped">
	.homeitem{
		width: 100%;
		height: 3.125rem;
		background-color: white;
		.content{
			overflow: hidden;
			width: 95%;
			margin: 0 auto;
		}
		.left{
			float: left;
			.p1{
				color: #282828;
				font-size: 0.875rem;
				line-height: 1.25rem;
				font-weight: bold;
				text-align: left;
				margin-top: 0.625rem;
			}
			.p2{
				color: #999;
				font-size: 0.75rem;
				line-height: 1.25rem;
			}
		}
		.right{
			float: right;
			font-size: 0.875rem;
			line-height: 3.125rem;
			color: #333;
			p{
				float: left;
			}
			span{
				float: left;
				font-size: 0.875rem;
			}
		}
	}
</style>
