<template>
	<!-- 这是数据为空时的组件 -->
	<div class="kongdata" v-if="shopdatas">
		<div class="shopkong">
			<div class="top2">
				<img src="../assets/shopkong.png" alt="">
			</div>
			<div class="bottom">
				<p>
					<span class="s1">—————</span>
					<span class="s2">为你推荐</span>
					<span class="s3">—————</span>
				</p>
			</div>
		</div>
		<ul class="shop2">
			<router-link tag="li" :to="{path:'/productdetails/'+s.id}" v-for="s in shopdatas" :key="s.id">
				<img :src="s.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
				<p class="p1">{{s.store_name}}</p>
				<p class="p2">￥{{s.ot_price}}</p>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default{
		props:["shopdatas"]
	}
</script>

<style lang="less" scoped="scoped">
	.kongdata{
		width: 100%;
		background-color: white;
		.shopkong{
			width: 100%;
			.top2{
				width: 100%;
				display: flex;
				justify-content: center;
				img{
					width: 60%;
				}
			}
			.bottom{
				width: 100%;
				margin-top: 1.875rem;
				p{
					line-height: 1.875rem;
					.s1,.s3{
						color: #999;
					}
					.s2{
						color: #333;
						font-size: 0.875rem;
						margin: 0 0.9375rem;
					}
				}
			}
		}
		.shop2{
			width: 100%;
			overflow: hidden;
			li{
				width: 45%;
				margin-left: 3%;
				float: left;
				margin-top: 0.75rem;
				img{
					height: 11.25rem;
					width: 100%;
					border-radius: 7px;
				}
				.p1{
					font-size: 1rem;
					color: #222;
					width: 95%;
					white-space: nowrap;
					overflow: hidden;
					word-break:keep-all;
					text-overflow:ellipsis;
					text-align: left;
				}
				.p2{
					text-align: left;
					color: #fc4141;
					font-size: 0.875rem;
				}
			}
		}
	}
</style>
