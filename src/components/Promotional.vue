<template>
	<!-- 这是首页促销单品 -->
	<div class="promotional">
		<Homeitem :infoname="indexdata.info.salesInfo" :url="url">促销单品</Homeitem>
		<div class="content">
			<ul>
				<router-link tag="li" :to="{path:'/productdetails/'+s.id}" v-for="s in indexdata.benefit" :key="s.id">
					<div class="hz">
						<div class="left">
							<img :src="s.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
						</div>
						<div class="right">
							<div class="top">
								<p class="p1">{{s.store_name}}</p>
								<span class="p2">促销价: {{s.price}}</span>
							</div>
							<div class="bottom">
								<p>
									<span class="s1">日常价 : ￥{{s.ot_price}}</span>
									<span class="s2">仅剩 : {{s.stock}}{{s.unit_name}}</span>
								</p>
							</div>
						</div>
					</div>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import Homeitem from "./Homeitem.vue"
	export default{
		components:{
			Homeitem
		},
		props:{
			indexdata:Object
		},
		data(){
			return {
				url:"combination/4"
			}
		},
		watch:{
		},
	}
</script>

<style lang="less" scoped="scoped">
	.promotional{
		width: 100%;
		background-color: white;
		.content{
			width: 100%;
			ul{
				width: 100%;
				li{
					width: 90%;
					margin: 0.4375rem auto 0;
					border-bottom: 1px solid #eee;
					padding-bottom: 0.625rem;
					.hz{
						width: 100%;
						overflow: hidden;
						.left{
							float: left;
							width: 25%;
						}
						.right{
							float: left;
							width: 75%;
							.top{
								overflow: hidden;
								.p1{
									width: 95%;
									font-size: 1rem;
									color: #333;
									white-space: nowrap;
									overflow: hidden;
									word-break:keep-all;
									text-overflow:ellipsis;
									margin-top: 0.3125rem;
								}
								.p2{
									color: white;
									font-size: 0.75rem;
									margin-top: 0.625rem;
									background-color: #ff3e1e;
									border-radius: 15px 0 15px 0 / 15px 0 15px 0;
									padding: 0.1875rem 0.625rem;
									display: inline-block;
									float: left;
								}
							}
							.bottom{
								p{
									width: 100%;
									overflow: hidden;
									margin-top: 0.75rem;
									.s1{
										float: left;
										font-size: 0.75rem;
										color: #999;
										text-decoration: line-through;
									}
									.s2{
										float: right;
										font-size: 0.75rem;
										color: #999;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
