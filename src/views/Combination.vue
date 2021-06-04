<template>
	<!-- 这是组合页面 -->
	<div class="hotlist">
		<Return2></Return2>
		<Banner2 :images="this.shopdata.banner" :index="classname"></Banner2>
		<div class="top">
			<p>
				<span class="s1">———————</span>
				<span class="s2 iconfont" :class="str2[this.$route.params.myvalue-1]"> {{str[this.$route.params.myvalue-1]}}</span>
				<span class="s3">———————</span>
			</p>
		</div>
		<div class="content">
			<ul>
				<router-link tag="li" :to="{path:'/productdetails/'+s.id}" v-for="s in shopdata.list" :key="s.id">
					<div class="hz">
						<div class="left">
							<img :src="s.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
						</div>
						<div class="right">
							<div class="top2">
								<p>{{s.store_name}}</p>
							</div>
							<div class="bottom">
								<p class="p11" v-show="num!=4">￥{{s.price}}</p>
								<span class="p12" v-show="num==4">促销价: {{s.price}}</span>
								<p class="p21" v-show="num!=4">
									<span class="s1">￥{{s.vip_price}}</span>
									<span class="s2 iconfont icon-vip"></span>
									<span class="s3">已售 {{s.sales}} {{s.unit_name}}</span>
									<span class="s4 iconfont icon-gouwuchekong"></span>
								</p>
								<p class="p22" v-show="num==4">
									<span class="s1">日常价: ￥{{s.ot_price}}</span>
									<span class="s2">仅剩: {{s.stock}}{{s.unit_name}}</span>
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
	import Return2 from "../components/Return2.vue"
	import Banner2 from "../components/Banner2.vue"
	export default{
		components:{
			Return2,
			Banner2
		},
		data(){
			return {
				str:["精品推荐","热门榜单","首发新品","促销单品"],
				str2:["icon-zuanshi","icon-fire","icon-xinpin","icon-cuxiao"],
				classname:0,
				shopdata:{},
				num:""
			}
		},
		created() {
			this.num=this.$route.params.myvalue;
			this.$axios.get("/groom/list/"+this.$route.params.myvalue+"?page=1&limit=20").then(data=>{
				this.shopdata=data.data.data;
				// console.log(this.shopdata);
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.hotlist{
		width: 100%;
		.top{
			width: 100%;
			line-height: 3.75rem;
			background-color: #f5f5f5;
			p{
				width: 100%;
				.s1,.s3{
					color: #e9e9e9;
					font-size: 1rem;
				}
				.s2{
					font-size: 1.25rem;
					color: #282828;
					margin: 0 0.4375rem;
				}
			}
		}
		.content{
			width: 100%;
			background-color: white;
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
							.top2{
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
								.p11{
									color: #fc4141;
									font-size: 1.125rem;
									text-align: left;
								}
								.p12{
									color: white;
									font-size: 0.75rem;
									margin-top: 0.625rem;
									background-color: #ff3e1e;
									border-radius: 15px 0 15px 0 / 15px 0 15px 0;
									padding: 0.1875rem 0.625rem;
									display: inline-block;
									float: left;
								}
								.p21{
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
								.p22{
									line-height: 1.875rem;
									overflow: hidden;
									span{
										color: #999;
										font-size: 0.75rem;
									}
									.s1{
										float: left;
										text-decoration: line-through;
									}
									.s2{
										float: right;
										margin-right: 0.9375rem;
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
