<template>
	<!-- 支付失败/成功页面 -->
	<div class="paymentfailed" v-if="faileddata">
		<Return2></Return2>
		<div class="content">
			<div class="top">
				<van-icon :class="this.$route.query.b==0?'active':'active2'" :name="this.$route.query.b==0?'clear':'checked'" />
				<p>{{this.$route.query.b==0?'订单支付失败':'订单创建成功'}}</p>
			</div>
			<div class="cont">
				<p>
					<span class="s1">订单编号</span>
					<span class="s2">{{faileddata.order_id}}</span>
				</p>
				<p>
					<span class="s1">下单时间</span>
					<span class="s2">{{faileddata.add_time_y}} {{faileddata.add_time_h}}</span>
				</p>
				<p>
					<span class="s1">支付方式</span>
					<span class="s2">{{faileddata._status._payType}}</span>
				</p>
				<p>
					<span class="s1">支付余额</span>
					<span class="s2">{{faileddata.pay_price}}</span>
				</p>
			</div>
			<div class="foot">
				<p class="p1" @click="btn">{{this.$route.query.b==0?'查看订单':'查看支付结果'}}</p>
				<p class="p2" @click="btn2">返回首页</p>
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
				faileddata:null
			}
		},
		methods:{
			btn(){
				this.$router.push("/payment?orderId="+this.$route.query.orderId+"&money="+this.$route.query.money);
			},
			btn2(){//返回首页
				this.$router.push("/")
			}
		},
		created() {
			this.$axios.get("/order/detail/"+this.$route.query.orderId).then(data=>{
				this.faileddata=data.data.data;
				// console.log(this.faileddata);
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.paymentfailed{
		width: 100%;
		.content{
			background-color: white;
			border-radius: 5px;
			width: 90%;
			margin: 6.5625rem auto 0;
			.top{
				width: 90%;
				margin: 0 auto;
				border-bottom: 1px solid #eee;
				.van-icon{
					transform: translateY(-50%);
					font-size: 4.375rem;
					&.active{
						color: #999;
					}
					&.active2{
						color: #e93323;
					}
				}
				p{
					color: #282828;
					font-size: 1rem;
					transform: translateY(-100%);
					font-weight: bold;
				}
			}
			.cont{
				width: 90%;
				margin: 0 auto;
				border-bottom: 1px solid #eee;
				padding: 0.75rem 0;
				p{
					width: 100%;
					overflow: hidden;
					line-height: 1.875rem;
					.s1{
						float: left;
						font-size: 0.875rem;
						color: #282828;
					}
					.s2{
						float: right;
						color: #666;
						font-size: 0.875rem;
					}
				}
			}
			.foot{
				width: 90%;
				margin: 0 auto;
				padding: 0.9375rem 0;
				.p1,.p2{
					width: 100%;
					border-radius: 1.25rem;
					font-size: 0.875rem;
					line-height: 2.5rem;
				}
				.p1{
					color: white;
					background-color: #e93323;
				}
				.p2{
					color: #e93323;
					border: 1px solid #e93323;
					box-sizing: content-box;
					margin-top: 0.75rem;
				}
			}
		}
	}
</style>
