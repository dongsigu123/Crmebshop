<template>
	<!-- 这是立即付款/退款页面 -->
	<div class="payment" v-if="paymentdata">
		<Return2></Return2>
		<div class="content">
			<div class="top">
				<div class="ttop">
					<div class="ttleft">
						<img :src="paymentdata.status_pic+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
					</div>
					<div class="ttright">
						<p class="p1">{{paymentdata._status._msg}}</p>
						<p class="p2">{{paymentdata.add_time_y}} {{paymentdata.add_time_h}}</p>
					</div>
				</div>
				<div class="tcont">
					<div class="bzt">
						<van-steps active-color="#e93323" :active="paymentdata._status._type">
							<van-step>待付款</van-step>
							<van-step>待发货</van-step>
							<van-step>待收货</van-step>
							<van-step>待评价</van-step>
							<van-step>已完成</van-step>
						</van-steps>
					</div>
					<div class="tbot">
						<p class="p1">
							<span class="s1">{{paymentdata.real_name}}</span>
							<span class="s2">{{paymentdata.user_phone}}</span>
						</p>
						<p class="p2">{{paymentdata.user_address}}</p>
					</div>
				</div>
			</div>
			<div class="sp">
				<div class="sptop">共{{paymentdata.cartInfo.length}}件商品</div>
				<div class="spcont">
					<div class="hz" v-for="i in paymentdata.cartInfo" :key="i.id">
						<div class="spleft">
							<img :src="i.productInfo.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
						</div>
						<div class="spright">
							<div class="sprtop">
								<p>{{i.productInfo.store_name}}</p>
								<span class="s2">x {{i.cart_num}}</span>
							</div>
							<p class="p2">{{i.productInfo.attrInfo.suk}}</p>
							<p class="p3">{{i.productInfo.price}}</p>
						</div>
					</div>
					<div class="spbot">
						<p><van-icon name="service-o" />联系客服</p>
					</div>
				</div>
			</div>
			<div class="ddzt">
				<p class="p1">
					<span class="s1">订单编号 :</span>
					<span class="s3">复制</span>
					<span class="s2">{{paymentdata.order_id}}</span>
				</p>
				<p class="p2">
					<span class="s1">下单时间 :</span>
					<span class="s3">{{paymentdata.add_time_h}}</span>
					<span class="s2">{{paymentdata.add_time_y}}</span>
				</p>
				<p class="p3">
					<span class="s1">订单类型 :</span>
					<span class="s2">普通订单</span>
				</p>
				<p class="p4">
					<span class="s1">支付状态 :</span>
					<span class="s2">{{paymentdata._status._title}}</span>
				</p>
				<p class="p5">
					<span class="s1">支付方式 :</span>
					<span class="s2">{{paymentdata._status._payType}}</span>
				</p>
			</div>
			<div class="zfje">
				<div class="zftop">
					<p class="p1">
						<span class="s1">支付金额 :</span>
						<span class="s2">￥ {{paymentdata.total_price}}</span>
					</p>
					<p class="p3" v-if="paymentdata.deduction_price!=0">
						<span class="s1">积分抵扣: </span>
						<span class="s2">-￥{{paymentdata.deduction_price}}</span>
					</p>
					<p class="p2">
						<span class="s1">运费 :</span>
						<span class="s2">￥{{paymentdata.total_postage}}</span>
					</p>
				</div>
				<div class="zfbot">
					<p>
						<span class="s2">￥{{paymentdata.pay_price}}</span>
						<span class="s1">实付款 :</span>
					</p>
				</div>
			</div>
			<div class="foot">
				<div class="hz" v-if="paymentdata._status._type!='1'">
					<p class="p2" @click="btn2">立即付款</p>
					<p class="p1" @click="btn">取消订单</p>
				</div>
				<div class="hz" v-if="paymentdata._status._type=='1'">
					<p class="p1" @click="refundbtn">申请退款</p>
				</div>
			</div>
			<div class="qxdd" v-show="isqx">
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
									<p class="p2">当前可用余额: <span>{{$route.query.money}}</span></p>
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
				paymentdata:null,
				isqx:false,//取消订单
				show: false
			}
		},
		computed:{
			...mapState({
				token:"token"
			})
		},
		methods:{
			refundbtn(){//退款
				this.$router.push("/refund?wx="+this.paymentdata.order_id);
			},
			showPopup() {
				this.show = true;
			},
			btn(){//取消订单
				this.isqx=true;
			},
			btn2(){//立即付款
				this.show=true;
			},
			btn3(){//取消订单
				this.isqx=false;
			},
			btn4(){//确认取消订单
				this.$axios({
					method:"post",
					url:"/order/cancel",
					headers: {
						"Authori-zation": "Bearer " + this.token,
					},
					data:{
						id: this.paymentdata.order_id
					}
				}).then(()=>{
					this.$toast("取消订单成功");
					this.isqx=false;
					setTimeout(()=>{
						this.$router.push("/orderinformation?navnum=0");
					},500);
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
						uni: this.paymentdata.order_id
					}
				}).then(data=>{
					// console.log(data);
					this.$toast(data.data.msg);
					if(data.data.msg=="余额支付成功"){
						this.load();
					}
				})
			},
			load(){
				this.$axios.get("/order/detail/"+this.$route.query.orderId).then(data=>{
					this.paymentdata=data.data.data;
					// console.log(this.paymentdata);
				})
			}
		},
		created() {
			this.load();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.payment{
		width: 100%;
		.top{
			width: 100%;
			border-bottom: 2px dashed #eee;
			padding-bottom: 0.75rem;
			background-color: white;
			.ttop{
				background-color: #e93323;
				padding: 0.4375rem 5%;
				overflow: hidden;
				.ttleft{
					float: left;
					width: 20%;
					img{
						width: 3.4375rem;
						height: 3.4375rem;
						float: left;
						vertical-align: bottom;
					}
				}
				.ttright{
					width: 80%;
					float: left;
					text-align: left;
					p{
						width: 100%;
					}
					.p1{
						font-size: 1rem;
						color: white;
						font-weight: bold;
						line-height: 1.875rem;
						margin-top: 0.1875rem;
					}
					.p2{
						font-size: 0.75rem;
						color: #eee;
					}
				}
			}
			.tcont{
				width: 100%;
				padding: 0 5%;
				.tbot{
					width: 100%;
					text-align: left;
					.p1{
						font-size: 0.875rem;
						line-height: 1.875rem;
						color: #282828;
						.s2{
							margin-left: 0.75rem;
						}
					}
					.p2{
						font-size: 0.875rem;
						color: #868686;
					}
				}
			}
		}
		.sp{
			width: 100%;
			background-color: white;
			margin-top: 0.3125rem;
			.sptop{
				width: 100%;
				border-bottom: 1px solid #f0f0f0;
				text-align: left;
				font-size: 0.875rem;
				color: #282828;
				line-height: 2.5rem;
				padding-left: 5%;
			}
			.spcont{
				width: 95%;
				margin: 0 auto;
				.hz{
					width: 100%;
					overflow: hidden;
					border-bottom: 1px solid #f0f0f0;
					padding: 0.5625rem 0;
					.spleft{
						width: 25%;
						float: left;
						img{
							width: 4.4375rem;
							height: 4.6875rem;
							float: left;
							vertical-align: bottom;
							border-radius: 3px;
						}
					}
					.spright{
						width: 75%;
						float: left;
						text-align: left;
						font-size: 0.875rem;
						.sprtop{
							width: 100%;
							overflow: hidden;
							p{
								width: 85%;
								float: left;
								white-space: nowrap;
								overflow: hidden;
								word-break:keep-all;
								text-overflow:ellipsis;
							}
							.s2{
								float: right;
								color: #868686;
							}
						}
						.p2{
							color: #868686;
							line-height: 1.875rem;
						}
						.p3{
							color: #fc4141;
							margin-top: 0.25rem;
						}
					}
				}
				.spbot{
					width: 100%;
					color: #e93323;
					line-height: 2.5rem;
					display: flex;
					align-items: center;
					justify-content: center;
					.van-icon{
						margin-right: 0.3125rem;
					}
				}
			}
		}
		.ddzt{
			width: 100%;
			background-color: white;
			margin-top: 0.3125rem;
			padding: 0.75rem 0;
			p{
				width: 95%;
				margin: 0 auto;
				overflow: hidden;
				line-height: 2.1875rem;
				span{
					font-size: 0.875rem;
				}
				.s1{
					float: left;
					color: #282828;
				}
				.s2,.s3{
					float: right;
					color: #868686;
				}
				&.p1 .s3{
					padding: 0.1875rem 0.4375rem;
					border: 1px solid #666;
					color: #333;
					display: block;
					line-height: 1.125rem;
					margin-top: 0.3125rem;
					border-radius: 2px;
					margin-left: 0.5625rem;
				}
				&.p2 .s3{
					margin-left: 0.5625rem;
				}
			}
		}
		.zfje{
			width: 100%;
			background-color: white;
			padding: 0.75rem 0;
			margin-top: 0.3125rem;
			margin-bottom: 3.25rem;
			.zftop{
				width: 95%;
				margin: 0 auto;
				padding-bottom: 0.4375rem;
				border-bottom: 1px solid #f0f0f0;
				p{
					line-height: 1.875rem;
					overflow: hidden;
				}
				.s1,.s2{
					font-size: 0.875rem;
				}
				.s1{
					float: left;
					color: #282828;
				}
				.s2{
					float: right;
					color: #666;
				}
			}
			.zfbot{
				width: 100%;
				padding-right: 5%;
				p{
					overflow: hidden;
					line-height: 2.5rem;
					.s1,.s2{
						float: right;
						font-size: 0.875rem;
					}
					.s1{
						color: #282828;
					}
					.s2{
						color: #fc4141;
						margin-left: 0.3125rem;
						font-weight: bold;
					}
				}
			}
		}
		.foot{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			z-index: 2;
			background-color: white;
			height: 2.8125rem;
			overflow: hidden;
			padding-right: 5%;
			p{
				font-size: 0.875rem;
				float: right;
				line-height: 1.875rem;
				padding: 0 0.5625rem;
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
			background: rgba(0,0,0,.5);
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
