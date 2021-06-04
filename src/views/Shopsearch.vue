<template>
	<!-- 这是商品搜索显示页面 -->
	<div class="shopsearch">
		<Return2></Return2>
		<div class="top">
			<div class="search">
				<span class="sousuo iconfont icon-sousuo"></span>
				<input @keydown.enter="ssbtn" type="text" v-model="keyword" placeholder="搜索商品信息">
			</div>
			<span @click="pailie" class="pailie iconfont" :class="index4==0?'icon-pailiexingshi_liebiao':'icon-pailiexingshi_kapian'"></span>
		</div>
		<div class="content">
			<div class="nav">
				<ul>
					<li>
						<router-link tag="p" to="/category" class="p active">{{this.$route.query.name}}</router-link>
					</li>
					<li @click="btn">
						<div class="left"><p class="p">价格</p></div>
						<div class="right">
							<span class="icon-shangsanjiaoxing iconfont" :class="priceOrder=='asc'?'active':''"></span>
							<span class="icon-shangsanjiaoxing1 iconfont" :class="priceOrder=='desc'?'active':''"></span>
						</div>
					</li>
					<li @click="btn2">
						<div class="left"><p class="p">销量</p></div>
						<div class="right">
							<span class="icon-shangsanjiaoxing iconfont" :class="salesOrder=='asc'?'active':''"></span>
							<span class="icon-shangsanjiaoxing1 iconfont" :class="salesOrder=='desc'?'active':''"></span>
						</div>
					</li>
					<li @click="liclick">
						<p class="p" :class="index==1?'active':''">新品</p>
					</li>
				</ul>
			</div>
			<div class="shoparray">
				<ul class="shop">
					<router-link tag="li" :to="{path:'/productdetails/'+s.id}" v-for="s in commoditydata" :key="s.id" :class="index4==0?'li':'li2'">
						<div class="left">
							<img :src="s.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
						</div>
						<div class="right">
							<p class="p1">{{s.store_name}}</p>
							<p class="p2">￥{{s.price}}</p>
							<p class="p3">
								<span class="s1">￥{{s.vip_price}}</span>
								<span class="s2 iconfont icon-vip"></span>
								<span class="s3">已售{{s.sales}}件</span>
							</p>
						</div>
					</router-link>
				</ul>
				<!-- 数据为空的时候 -->
				<Kongdata v-show="shopshow" :shopdatas="shopdatas"></Kongdata>
			</div>
		</div>
	</div>
</template>

<script>
	import Return2 from "../components/Return2.vue"
	import Kongdata from "../components/Kongdata.vue"
	import {mapState} from "vuex"
	export default{
		components:{
			Return2,
			Kongdata
		},
		computed:{
			...mapState({
				"shopdata":"shopsearchdata"
			})
		},
		data(){
			return{
				commoditydata:{},//商品数据
				shopdatas:{},//当商品没有数据是获取推荐数据
				value:"",
				page: 1,//第一页
				limit: 8,//每页显示多少天
				keyword:"",//关键字
				news: 0,//是否是新品
				priceOrder: "",// 价格排序  asc 升序  desc 降序
				salesOrder: "",// 销量  asc 升序  desc 降序
				index:0,//导航
				index2:0,//价格
				index3:0,//销量
				index4:0,//排列
				shopshow:false,//当商品数据为空时显示图片
			}
		},
		watch:{
			// "shopdata":function(n,o){
			// 	this.shopdata.id=n.id;
			// 	this.logindata();
			// }
		},
		methods:{
			ssbtn(){//搜索btn
				if(this.keyword==""){
					this.$toast("不能为空");
					return;
				}
				console.log(this.keyword)
				this.logindata();
			},
			logindata(){
				this.$axios.get(
				"/products?page=1&limit=8&keyword="+this.keyword+"&sid="+this.$route.query.id+"&news="+this.news+"&priceOrder="+this.priceOrder+"&salesOrder="+this.salesOrder).then(data=>{
					this.commoditydata=data.data.data;
					// console.log(this.commoditydata);
					// console.log(this.commoditydata);
				}).then(()=>{//当商品没有数据是获取推荐数据
					if(this.commoditydata.length==0){
						this.$axios.get("/product/hot?page=1&limit=20").then(data=>{
							this.shopdatas=data.data.data;
							// console.log(this.shopdatas);
						})
						this.shopshow=true;
					}else{
						this.shopshow=false;
					}
				})
			},
			liclick(value){//导航点击事件
				if(this.index==1){
					this.index=0;
					this.news=0;
				}else{
					this.index=1;
					this.news=1;
				}
				this.logindata();
			},
			btn(){//价格排序
				this.index2++;
				if(this.index2==1){
					this.priceOrder="asc";
				}else if(this.index2==2){
					this.priceOrder="desc";
				}else{
					this.priceOrder="";
				}
				this.index2=this.index2%3;
				this.salesOrder="";
				this.logindata();
			},
			btn2(){//销量排序
				this.index3++;
				if(this.index3==1){
					this.salesOrder="asc";
				}else if(this.index3==2){
					this.salesOrder="desc";
				}else{
					this.salesOrder="";
				}
				this.index3=this.index3%3;
				this.priceOrder="";
				this.logindata();
			},
			pailie(){//商品排列方式
				if(this.index4==0){
					this.index4=1;
				}else{
					this.index4=0;
				}
			}
		},
		beforeRouteUpdate(to,from,next){
			this.logindata();
			next();
		},
		created() {
			if(this.$route.query.s){
				this.keyword=this.$route.query.s;
			}
			this.logindata();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.shopsearch{
		width: 100%;
		padding-top: 5rem;
		.top{
			width: 100%;
			height: 2.5rem;
			position: fixed;
			left: 0;
			top: 0;
			background-color: #e93323;
			overflow: hidden;
			.search{
				width: 81%;
				height: 1.875rem;
				background-color: white;
				border-radius: 15px;
				transform: translate(12%,0.3125rem);
				text-align: left;
				position: relative;
				.sousuo{
					font-weight: bold;
					color: #333;
					left: 0.9375rem;
					font-size: 1rem;
					line-height: 1.875rem;
					position: absolute;
				}
				input{
					width: 80%;
					padding: 0;
					border-radius: 15px;
					color: #333;
					position: absolute;
					left: 2.1875rem;
					font-size: 1rem;
					border: none;
					outline: none;
					height: 1.875rem;
				}
			}
			.pailie{
				float: right;
				margin-right: 2%;
				color: white;
				font-size: 1.25rem;
				transform: translateY(-100%);
			}
		}
		.content{
			width: 100%;
			.nav{
				width: 100%;
				background-color: white;
				position: fixed;
				left: 0;
				top: 2.5rem;
				border-bottom: 1px solid #ebebeb;
				ul{
					width: 100%;
					display: flex;
					line-height: 2.5rem;
					li{
						flex: 1;
						.p{
							color: #454545;
							font-size: 0.875rem;
							&.active{
								color: #fc4141;
							}
						}
						.left{
							width: 55%;
							float: left;
							text-align: right;
						}
						.right{
							width: 45%;
							float: left;
							text-align: left;
							padding-top: 0.5rem;
							span{
								color: #999;
								font-size: 0.75rem;
								line-height: 0.75rem;
								display: block;
								margin-left: 0.1875rem;
								&.active{
									color: #fc4141;
								}
								&:nth-child(1){
									transform: translateY(0.125rem) scale(0.7);
								}
								&:nth-child(2){
									transform: translateY(-0.125rem) scale(0.7);
								}
							}
						}
					}
				}
			}
			.shoparray{
				width: 100%;
				.shop{
					width: 100%;
					overflow: hidden;
					li{
						padding-bottom: 0.625rem;
						background-color: white;
						overflow: hidden;
						&.li{
							width: 45%;
							margin-left: 3%;
							float: left;
							border-radius: 7px;
							margin-top: 0.4375rem;
							.left{
								height: 12rem;
								img{
									width: 100%;
									height: 100%;
								}
							}
							.right{
								width: 100%;
							}
						}
						&.li2{
							width: 100%;
							border-bottom: 1px solid #ebebeb;
							display: flex;
							align-items: center;
							.left{
								width: 30%;
								height: 6.875rem;
								display: flex;
								align-items: center;
								justify-content: center;
								img{
									width: 85%;
									height: 85%;
								}
							}
							.right{
								width: 70%;
							}
						}
						&.li,&.li2{
							.left,.right{
								float: left;
							}
							.left{
								img{
									vertical-align: bottom;
									border-radius: 7px;
								}
							}
							.right{
								p{
									text-align: left;
									padding-left: 0.4375rem;
								}
								.p1{
									width: 95%;
									white-space: nowrap;
									overflow: hidden;
									word-break:keep-all;
									text-overflow:ellipsis;
									font-size: #222;
									font-size: 0.875rem;
									line-height: 1.875rem;
								}
								.p2{
									width: 100%;
									color: #fc4141;
									font-size: 1rem;
								}
								.p3{
									font-size: 0.75rem;
									overflow: hidden;
									line-height: 1.5625rem;
									.s1,.s2{
										color: #282828;
									}
									.s2{
										font-size: 0.75rem;
										margin-left: 0.1875rem;
									}
									.s3{
										float: right;
										color: #aaa;
										margin-right: 0.4375rem;
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
