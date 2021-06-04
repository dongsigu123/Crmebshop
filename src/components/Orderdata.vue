<template>
	<!-- 这是订单的待付款组件 -->
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
						<img :src="s.productInfo.image" alt="">
					</div>
					<div class="right">
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
				<p class="p2" @click="btn2">立即付款</p>
				<p class="p1" @click="btn">取消订单</p>
			</div>
			<div class="qxdd" v-show="isqx">
				<div class="qxcnt">
					<div class="qxtop">
						<p class="p1">提示</p>
						<p class="p2">确认取消订单?</p>
					</div>
					<div class="qxbottom">
						<p class="p1" @click="btn3">取消</p>
						<p class="p2" @click="btn4(i.order_id)">确认</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	export default{
		props:["orderdata"],
		computed:{
			...mapState({
				token:"token"
			})
		},
		data(){
			return {
				isqx:false
			}
		},
		methods:{
			btn(){//取消订单
				this.isqx=true;
			},
			btn2(){//立即付款
				
			},
			btn3(){//取消订单
				this.isqx=false;
				console.log(111)
			},
			btn4(v){//确认取消订单
				this.$axios({
					method:"post",
					url:"/order/cancel",
					headers: {
						"Authori-zation": "Bearer " + this.token
					},
					data:{
						id: v
					}
				}).then(()=>{
					this.$toast("取消订单成功");
					this.isqx=false;
					setTimeout(()=>{
						this.$router.push("/orderinformation");
					},500);
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.orderdata{
		width:100%;
		.hz{
			width: 95%;
			margin: 0.3125rem auto 0;
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
</style>
