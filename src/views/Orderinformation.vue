<template>
	<!-- 这是用户订单信息页面 -->
	<div class="orderinformation" v-if="orderdata && order">
		<Return2></Return2>
		<div class="otop">
			<div class="tcont">
				<div class="left">
					<p class="p1">订单信息</p>
					<p class="p2">
						<span class="s1">累计订单: {{order.order_count}}</span>
						<span class="s2">总消费: ￥{{order.sum_price}}</span>
					</p>
				</div>
				<div class="right">
					<img src="../assets/usertop.png" alt="">
				</div>
			</div>
		</div>
		<div class="nav">
			<ul>
				<li :class="num==0?'active':''" @click="btn(0)">
					<p class="p1">待付款</p>
					<p class="p2">{{order.unpaid_count}}</p>
				</li>
				<li :class="num==1?'active':''" @click="btn(1)">
					<p class="p1">待发货</p>
					<p class="p2">{{order.order_count}}</p>
				</li>
				<li :class="num==2?'active':''" @click="btn(2)">
					<p class="p1">待收货</p>
					<p class="p2">0</p>
				</li>
				<li :class="num==3?'active':''" @click="btn(3)">
					<p class="p1">待评价</p>
					<p class="p2">0</p>
				</li>
				<li :class="num==4?'active':''" @click="btn(4)">
					<p class="p1">已完成</p>
					<p class="p2">0</p>
				</li>
			</ul>
		</div>
		<div class="content">
			<div class="orderdata">
				<div class="hz" v-for="i in orderdata" :key="i.id">
					<div class="top">
						<p>
							<span class="s1">{{i._pay_time}}</span>
							<span class="s2">{{i._status._title}}</span>
						</p>
					</div>
					<div class="cont">
						<div class="xhz" v-for="s in i.cartInfo" :key="s.id">
							<div class="left">
								<router-link tag="img" :to="{path:'/productdetails/'+s.productInfo.id}" :src="s.productInfo.image" alt="" />
							</div>
							<div class="right" @click="detailsbtn(i.order_id)">
								<div class="rlef">
									<p>{{s.productInfo.store_name}}</p>
								</div>
								<div class="rrig">
									<p class="p1">￥{{s.productInfo.price}}</p>
									<p class="p2">x{{s.cart_num}}</p>
								</div>
							</div>
						</div>
						<div class="cbot">
							<p>共{{i.cartInfo.length}}件商品，总金额<span>￥{{i.pay_price}}</span></p>
						</div>
					</div>
					<div class="bottom">
						<p v-show="num==0" class="p2" @click="btn2(i)">立即付款</p>
						<p v-show="num==0" class="p1" @click="btn1(i.order_id)">取消订单</p>
						<p v-show="num==1" class="p2" @click="detailsbtn(i.order_id)">查看详情</p>
					</div>
					<div class="qxdd" v-if="isqx">
						<div class="qxcnt">
							<div class="qxtop">
								<p class="p1">提示</p>
								<p class="p2">确认取消订单?</p>
							</div>
							<div class="qxbottom">
								<p class="p1" @click="btn3">取消</p>
								<p class="p2" @click="btn4">确认</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<img class="kdata" v-show="orderdata.length==0" src="../assets/shopkong.png" alt="">
		</div>
		<van-popup round position="bottom" closeable top-right v-model="show">
			<div class="ffk">
				<div class="top">
					<p>选择付款方式</p>
				</div>
				<div class="bottom">
					<div class="hz" @click="btn5(1)">
						<div class="left">
							<van-icon name="wechat" />
						</div>
						<div class="right">
							<div class="rlef">
								<p class="p1">微信支付</p>
								<p class="p2">使用微信快捷支付</p>
							</div>
							<div class="rrig">
								<van-icon name="arrow" />
							</div>
						</div>
					</div>
					<div class="hz2" @click="btn5(2)">
						<div class="left">
							<van-icon name="gold-coin" />
						</div>
						<div class="right">
							<div class="rlef">
								<p class="p1">余额支付</p>
								<p class="p2">当前可用余额: <span>{{money}}</span></p>
							</div>
							<div class="rrig">
								<van-icon name="arrow" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import Return2 from "../components/Return2.vue"
	import {mapState} from "vuex"
	export default{
		components:{
			Return2
		},
		data(){
			return {
				order:null,
				active:1,
				num:null,//导航
				orderdata:null,
				isqx:false,
				ordernum:null,
				uni:null,
				show: false,
				money:null,//余额
				money2:null//商品价格
			}
		},
		computed:{
			...mapState({
				token:"token"
			})
		},
		methods:{
			detailsbtn(v){//查看详情
				this.$router.push("/payment?orderId="+v);
			},
			btn(v){
				this.num=v;
				this.load();
			},
			load(){
				this.orderdata=[];
				this.$axios.get("/order/list?page=1&limit=20&type="+this.num).then(data=>{
					this.orderdata=data.data.data;
					// console.log(this.orderdata);
				})
			},
			btn1(v){//取消订单
				this.isqx=true;
				this.ordernum=v;
			},
			btn2(v){//立即付款
				this.uni=v.order_id;
				this.money2=v.pay_price;
				this.show=true;
				// console.log(v)
			},
			btn3(){//取消订单
				this.isqx=false;
			},
			btn4(){//确认取消订单
				this.$axios({
					method:"post",
					url:"/order/cancel",
					headers: {
						"Authori-zation": "Bearer " + this.token
					},
					data:{
						id: this.ordernum
					}
				}).then(()=>{
					this.$toast("取消订单成功");
					this.isqx=false;
					this.$axios.get("/order/data").then(data=>{
						this.order=data.data.data;
					})
					// this.load();
					for(let i in this.orderdata){
						if(this.orderdata[i].order_id == this.ordernum){
							this.orderdata.splice(i,1);
						}
					}
				})
			},
			btn5(v){//微信,余额支付
				this.show=false;
				this.$toast("加载中...");
				this.$axios({
					method:"post",
					url:"/order/pay",
					headers: {
						"Authori-zation": "Bearer " + this.token,
					},
					data:{
						from: "weixinh5",
						paytype: v==1?"weixin":"yue",
						uni: this.uni
					}
				}).then(data=>{
					// console.log(data);
					this.$toast(data.data.msg);
					if(data.data.msg == "余额支付成功"){
						for(let i in this.orderdata){
							if(this.orderdata[i].order_id == this.uni){
								this.orderdata.splice(i,1);
							}
						}
						this.money=this.money-this.money2;
					}
				})
			},
		},
		created() {
			this.$axios.get("/order/data").then(data=>{
				this.order=data.data.data;
				// console.log(this.order);
			})
			this.num=this.$route.query.navnum;
			this.money=this.$route.query.money;
			this.load();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.orderinformation{
		width: 100%;
		.kdata{
			width: 60%;
			margin: 3.125rem auto 0;
		}
		.otop{
			width: 100%;
			background-color: #e93323;
			padding-bottom:3.125rem;
			padding-top: 0.9375rem;
			overflow: hidden;
			.tcont{
				width: 95%;
				margin: 0.75rem auto 0;
				overflow: hidden;
				.left{
					float: left;
					width: 75%;
					text-align: left;
					.p1{
						font-size: 1.125rem;
						font-weight: bold;
						color: white;
					}
					.p2{
						font-size: 0.875rem;
						margin-top: 0.625rem;
						color: hsla(0,0%,100%,.8);
						.s2{
							margin-left: 0.3125rem;
						}
					}
				}
				.right{
					width: 25%;
					float: left;
					img{
						width: 3.75rem;
						height: 3rem;
						vertical-align: bottom;
					}
				}
			}
		}
		.nav{
			width: 95%;
			margin: -1.25rem auto 0;
			background-color: white;
			border-radius: 0.1875rem;
			padding-top: 0.75rem;
			ul{
				width: 100%;
				display: flex;
				li{
					flex: 1;
					&.active{
						.p2{
							border-bottom: 2px solid #e93323;
						}
						font-weight: bold;
					}
					p{
						font-size: 1rem;
						width: 75%;
						margin: 0 auto;
						color: #282828;
						&.p1{
							line-height: 1.875rem;
						}
						&.p2{
							padding-bottom: 0.9375rem;
							box-sizing: border-box;
						}
					}
				}
			}
		}
		.content{
			width: 100%;
			.orderdata{
				width:100%;
				.hz{
					width: 95%;
					margin: 0.4375rem auto 0;
					background-color: white;
					border-radius: 3px;
					.top{
						width: 100%;
						border-bottom: 1px solid #eee;
						line-height: 2.5rem;
						font-size: 0.875rem;
						padding: 0 5%;
						p{
							overflow: hidden;
							.s1{
								float: left;
							}
							.s2{
								float: right;
								color: #fc4141;
							}
						}
					}
					.cont{
						width: 95%;
						margin: 0 auto;
						border-bottom: 1px solid #eee;
						padding-bottom: 0.75rem;
						.xhz{
							width: 100%;
							overflow: hidden;
							padding: 0.5625rem 0 0.5625rem;
							.left{
								width: 25%;
								float: left;
								img{
									width: 3.75rem;
									height: 3.9375rem;
									border-radius: 3px;
									vertical-align: bottom;
								}
							}
							.right{
								width: 75%;
								font-size: 0.875rem;
								float: left;
								overflow: hidden;
								.rlef{
									float: left;
									width: 65%;
									color: #282828;
									overflow: hidden;
									p{
										text-align: left;
										margin-top: 0.1875rem;
										word-break: break-all;
										display: -webkit-box;
										-webkit-line-clamp: 2;
										-webkit-box-orient: vertical;
									}
								}
								.rrig{
									float: left;
									width: 35%;
									float: right;
									text-align: right;
									color: #999;
								}
							}
						}
						.cbot{
							width: 100%;
							p{
								text-align: right;
								font-size: 0.875rem;
								color: #282828;
								span{
									margin-left: 0.1875rem;
									color: #fc4141;
								}
							}
						}
					}
					.bottom{
						width: 95%;
						margin: 0 auto;
						overflow: hidden;
						height: 2.8125rem;
						p{
							font-size: 0.875rem;
							float: right;
							line-height: 1.875rem;
							padding: 0 0.9375rem;
							margin-top: 0.46875rem;
							border-radius: 0.9375rem;
						}
						.p1{
							color: #aaa;
							border: 1px solid #ddd;
						}
						.p2{
							background-color: #e93323;
							color: white;
							margin-left: 0.4375rem;
						}
					}
					.qxdd{
						position: fixed;
						left: 0;
						top: 0;
						width: 100vw;
						height: 100vh;
						z-index: 9;
						display: flex;
						align-items: center;
						justify-content: center;
						background: rgba(0,0,0,.05);
						.qxcnt{
							width: 90%;
							background-color: white;
							border-radius: 3px;
							.qxtop{
								width: 100%;
								border-bottom: 1px solid #f0f0f0;
								text-align: left;
								padding: 0.75rem 0 0.75rem  5%;
								.p1{
									font-size: 1rem;
									color: #282828;
									line-height: 1.875rem;
								}
								.p2{
									font-size: 1rem;
									color: #666;
								}
							}
							.qxbottom{
								width: 100%;
								overflow: hidden;
								p{
									width: 50%;
									font-size: 1.125rem;
									float: left;
									line-height: 3.125rem;
								}
								.p1{
									border-right: 1px solid #f0f0f0;
									box-sizing: border-box;
									color: #282828;
								}
								.p2{
									color: #0bb20c;
								}
							}
						}
					}
				}
			}
		}
		.van-popup{
			.ffk{
				width: 100%;
				padding-left: 5%;
				padding-bottom: 1.25rem;
				.top{
					width: 95%;
					font-size: #282828;
					font-weight: bold;
					font-size: 1rem;
					line-height: 3.125rem;
					padding-top: 0.4375rem;
					border-bottom: 1px solid #eee;
				}
				.bottom{
					width: 95%;
					.hz{
						width: 100%;
						border-bottom: 1px solid #eee;
						overflow: hidden;
						display: flex;
						align-items: center;
						padding: 0.5625rem 0;
						.left{
							width: 10%;
							float: left;
							.van-icon{
								font-size: 1.25rem;
								color: #09bb07;
							}
						}
						.right{
							float: left;
							width: 90%;
							overflow: hidden;
							display: flex;
							align-items: center;
							.rlef{
								float: left;
								text-align: left;
								width: 80%;
								.p1{
									color: #282828;
									font-size: 1rem;
								}
								.p2{
									color: #999;
									font-size: 0.875rem;
								}
							}
							.rrig{
								float: right;
								width: 20%;
								overflow: hidden;
								.van-icon{
									font-size: 1.125rem;
									color: #999;
									float: right;
								}
							}
						}
					}
					.hz2{
						width: 100%;
						border-bottom: 1px solid #eee;
						overflow: hidden;
						padding: 0.5625rem 0;
						display: flex;
						align-items: center;
						.left{
							width: 10%;
							float: left;
							.van-icon{
								font-size: 1.25rem;
								color: #f90;
							}
						}
						.right{
							float: left;
							overflow: hidden;
							width: 90%;
							display: flex;
							align-items: center;
							.rlef{
								float: left;
								text-align: left;
								width: 80%;
								font-size: 1rem;
								.p1{
									color: #282828;
								}
								.p2{
									color: #999;
									font-size: 0.875rem;
									span{
										color: #f90;
									}
								}
							}
							.rrig{
								float: right;
								width: 20%;
								overflow: hidden;
								.van-icon{
									font-size: 1.125rem;
									color: #999;
									float: right;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
