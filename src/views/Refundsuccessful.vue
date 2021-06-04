<template>
	<!-- 退款成功页面 -->
	<div class="refundsuccessful" v-if="refund">
		<Return2></Return2>
		<div class="top">
			<div class="ttop">
				<div class="ttright">
					<p class="p1">{{refund._status._msg}}</p>
					<p class="p2">{{refund.add_time_y}} {{refund.add_time_h}}</p>
				</div>
			</div>
		</div>
		<div class="sp">
			<div class="sptop">共{{refund.cartInfo.length}}件商品</div>
			<div class="spcont">
				<div class="hz" v-for="i in refund.cartInfo" :key="i.id">
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
				<span class="s2">{{refund.order_id}}</span>
			</p>
			<p class="p2">
				<span class="s1">下单时间 :</span>
				<span class="s3">{{refund.add_time_h}}</span>
				<span class="s2">{{refund.add_time_y}}</span>
			</p>
			<p class="p3">
				<span class="s1">订单类型 :</span>
				<span class="s2">普通订单</span>
			</p>
			<p class="p4">
				<span class="s1">支付状态 :</span>
				<span class="s2">{{refund._status._title}}</span>
			</p>
			<p class="p5">
				<span class="s1">支付方式 :</span>
				<span class="s2">{{refund._status._payType}}</span>
			</p>
		</div>
		<div class="ssr">
			<p>
				<span class="s1">收货人 :</span>
				<span class="s2">{{refund.real_name}}</span>
			</p>
			<p>
				<span class="s1">联系电话 :</span>
				<span class="s2">{{refund.user_phone}}</span>
			</p>
			<p>
				<span class="s1">收货地址 :</span>
				<span class="s2">{{refund.user_address}}</span>
			</p>
		</div>
		<div class="zfje">
			<div class="zftop">
				<p class="p1">
					<span class="s1">支付金额 :</span>
					<span class="s2">￥ {{refund.total_price}}</span>
				</p>
				<p class="p3" v-if="refund.deduction_price!=0">
					<span class="s1">积分抵扣: </span>
					<span class="s2">-￥{{refund.deduction_price}}</span>
				</p>
				<p class="p2">
					<span class="s1">运费 :</span>
					<span class="s2">￥{{refund.total_postage}}</span>
				</p>
			</div>
			<div class="zfbot">
				<p>
					<span class="s2">￥{{refund.pay_price}}</span>
					<span class="s1">实付款 :</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Return2 from "../components/Return2.vue"
	export default{
		components:{
			Return2
		},
		data(){
			return {
				refund:null
			}
		},
		created() {
			this.$axios.get("/order/detail/"+this.$route.query.wx).then(data=>{
				this.refund=data.data.data;
				// console.log(this.refund)
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.refundsuccessful{
		width: 100%;
		.top{
			width: 100%;
			padding: 0.5625rem 0;
			background-color: #666;
			.ttop{
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
		.ssr{
			width: 100%;
			background-color: white;
			padding: 0.4375rem 2.5%;
			margin-top: 0.3125rem;
			p{
				overflow: hidden;
				line-height: 1.875rem;
				font-size: 0.875rem;
				.s1{
					float: left;
					color: #282828;
				}
				.s2{
					float: right;
					color: #666;
				}
			}
		}
		.zfje{
			width: 100%;
			background-color: white;
			padding: 0.75rem 0 0;
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
	}
</style>
