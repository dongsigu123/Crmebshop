<template>
	<!-- 这是首页精品推荐组件 -->
	<div class="boutique" v-if="indexdata">
		<Homeitem :infoname="indexdata.info.bastInfo" :url="url">精品推荐</Homeitem>
		<Banner2 :images="indexdata.info.bastBanner" :index="classname"></Banner2>
		<div class="content">
			<ul>
				<router-link tag="li" :to="{path:'/productdetails/'+s.id}" v-for="s in indexdata.info.bastList" :key="s.id">
					<div class="hz">
						<div class="left">
							<img :src="s.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
						</div>
						<div class="right">
							<div class="top">
								<p>{{s.store_name}}</p>
							</div>
							<div class="bottom">
								<p class="p1">￥{{s.price}}</p>
								<p class="p2">
									<span class="s1">￥{{s.vip_price}}</span>
									<span class="s2 iconfont icon-vip"></span>
									<span class="s3">已售 {{s.sales}} {{s.unit_name}}</span>
									<span class="s4 iconfont icon-gouwuchekong"></span>
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
	import Banner2 from "./Banner2.vue"
	export default{
		components:{
			Homeitem,
			Banner2
		},
		props:{
			indexdata:Object
		},
		data(){
			return {
				classname:1,
				url:"combination/1"
			}
		},
		watch:{
		}
	}
</script>

<style lang="less" scoped="scoped">
	.boutique{
		width: 100%;
		background-color: white;
		.content{
			width: 100%;
			ul{
				width: 100%;
				li{
					width: 100%;
					margin-top: 0.4375rem;
					.hz{
						overflow: hidden;
						width: 100%;
						display: flex;
						align-items: center;
						.left{
							float: left;
							width: 20%;
							height: 4.375rem;
							margin: 0 2.5%;
							img{
								width: 100%;
								height: 100%;
								border-radius: 5px;
							}
						}
						.right{
							width: 75%;
							float: left;
							border-bottom: 1px solid #f5f5f5;
							.top{
								width: 100%;
								p{
									text-align: left;
									line-height: 1.875rem;
									width: 95%;
									color: #222;
									white-space: nowrap;
									overflow: hidden;
									word-break:keep-all;
									text-overflow:ellipsis;
								}
							}
							.bottom{
								width: 100%;
								p{
									width: 100%;
								}
								.p1{
									color: #fc4141;
									font-size: 1.125rem;
									text-align: left;
								}
								.p2{
									line-height: 1.875rem;
									overflow: hidden;
									span{
										font-size: 0.75rem;
										float: left;
									}
									.s1{
										color: #222;
									}
									.s2{
										font-size: 0.75rem;
										margin: 0 0.1875rem;
									}
									.s3{
										color: #999;
									}
									.s4{
										float: right;
										color: #fc4141;
										margin-right: 0.9375rem;
										font-size: 1.25rem;
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
