<template>
	<!-- 这是搜索页面 -->
	<div class="search" v-if="keyworddata">
		<Return2>搜索</Return2>
		<div class="ttop">
			<span class="s1 iconfont icon-sousuo"></span>
			<input v-model="value" placeholder="搜索商品信息"/>
			<span class="s2" @click="ssbtn">搜索</span>
		</div>
		<div class="topcont">
			<p class="p1">热门搜索</p>
			<p class="p2">
				<span v-for="(k,i) in keyworddata" :key="i" @click="rmbtn(k)">{{k}}</span>
			</p>
		</div>
		<div class="content">
			<ul>
				<router-link tag="li" :to="{path:'/productdetails/'+s.id}" v-for="s in sousuodata" :key="s.id">
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
			<Kongdata v-show="isshow" :shopdatas="shops"></Kongdata>
		</div>
	</div>
</template>

<script>
	import Return2 from "../components/Return2.vue"
	import Kongdata from "../components/Kongdata.vue"
	export default{
		components:{
			Return2,
			Kongdata
		},
		data(){
			return {
				keyworddata:null,//热门搜索
				value:"",
				sousuodata:null,//搜索数据
				shops:null,//为空时,
				isshow:false
			}
		},
		methods:{
			rmbtn(v){//热门搜索btn
				this.value=v;
				this.load();
			},
			ssbtn(){//搜索btn
				if(this.value==""){
					this.$toast("不能为空");
					return;
				}
				this.load();
			},
			load(){
				// console.log(this.value)
				this.$axios.get("/products?page=1&limit=20&keyword="+this.value).then(data=>{
					this.sousuodata=data.data.data;
					// console.log(this.sousuodata);
					if(this.sousuodata.length==0){
						this.isshow=true;
						this.$axios.get("/product/hot?page=1&limit=20").then(data=>{
							this.shops=data.data.data;
							// console.log(this.shops)
						})
					}else {
						this.isshow=false;
					}
				})
			}
		},
		created() {
			this.$axios.get("/search/keyword").then(data=>{
				this.keyworddata=data.data.data;
				// console.log(this.keyworddata);
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.search{
		width: 100%;
		padding-top: 2.5rem;
		.ttop{
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
			z-index: 2;
			background-color: white;
			overflow: hidden;
			height: 2.5rem;
			line-height: 2.5rem;
			.s1{
				position: absolute;
				left: 2.3375rem;
				font-size: 1.2rem;
				color: #bbb;
			}
			input{
				float: left;
				border: none;
				background-color: #f7f7f7;
				outline: none;
				height: 1.875rem;
				width: 75%;
				color: #666;
				border-radius: 0.9375rem;
				padding-left: 1.875rem;
				margin-left: 1.875rem;
				margin-top: 0.3125rem;
			}
			.s2{
				float: left;
				margin-left: 0.9375rem;
				font-size: 0.875rem;
			}
		}
		.topcont{
			width: 100%;
			padding-left: 5%;
			background-color: white;
			margin-bottom: 0.3125rem;
			padding-top: 1.25rem;
			padding-bottom: 0.9375rem;
			.p1{
				text-align: left;
				font-size: 0.875rem;
				color: #999;
				margin-bottom: 0.625rem;
			}
			.p2{
				font-size: 0.875rem;
				color: #282828;
				overflow: hidden;
				span{
					float: left;
					display: inline-block;
					border: 1px solid #aaa;
					padding: 0.1875rem 0.5625rem;
					margin-right: 0.3125rem;
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
						padding: 0.4375rem 0;
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
							padding-bottom: 0.3125rem;
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
