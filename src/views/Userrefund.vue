<template>
	<!-- 用户退款页面 -->
	<div class="userrefund" v-if="userrefund">
		<Return2></Return2>
		<div class="content">
			<div class="hz" v-for="i in userrefund" :key="i.id">
				<div class="top">
					<p>
						<span class="s1">订单号 : {{i.order_id}}</span>
						<span class="s2 iconfont icon-tuikuanzhong"></span>
					</p>
				</div>
				<div class="cont" v-for="s in i.cartInfo" :key="s.id">
					<div class="left">
						<router-link tag="img" :to="{path:'/productdetails/'+s.productInfo.id}" :src="s.productInfo.image+'?imageView=1&type=webp&thumbnail=246x0'" />
					</div>
					<router-link tag="div" class="right" :to="{path:'/refundsuccessful?wx='+i.order_id}">
						<div class="rtop">
							<p>{{s.productInfo.store_name}}</p>
							<span>x{{s.cart_num}}</span>
						</div>
						<p class="p2">{{s.productInfo.attrInfo.suk}}</p>
						<p class="p3">￥{{s.productInfo.price}}</p>
					</router-link>
				</div>
				<div class="bottom">
					<p>
						<span class="s1">共{{i.cartInfo.length}}件商品，总金额</span>
						<span class="s2"> ￥{{i.pay_price}}</span>
					</p>
				</div>
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
				userrefund:null
			}
		},
		created() {
			this.$axios.get("/order/list?page=1&limit=20&type=-3").then(data=>{
				this.userrefund=data.data.data;
				// console.log(this.userrefund);
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.userrefund{
		width: 100%;
		.content{
			width: 100%;
			.hz{
				width: 100%;
				background-color: white;
				margin-bottom: 0.3125rem;
				.top{
					width: 100%;
					border-bottom: 1px solid #eee;
					padding: 0 5%;
					p{
						text-align: left;
						position: relative;
						line-height: 2.5rem;
						.s1{
							font-size: 0.875rem;
							color: #282828;
						}
						.s2{
							color: #f8c1bd;
							position: absolute;
							right: 0;
							font-size: 2.8125rem;
							top: 0.75rem;
						}
					}
				}
				.cont{
					width: 95%;
					overflow: hidden;
					padding: 0.5625rem 0 0.4375rem;
					.left{
						float: left;
						width: 25%;
						img{
							width: 4.0625rem;
							height: 4.25rem;
							border-radius: 3px;
							vertical-align: bottom;
						}
					}
					.right{
						float: left;
						width: 75%;
						.rtop{
							overflow: hidden;
							p{
								font-size: 0.875rem;
								width: 85%;
								color: #282828;
								float: left;
								text-align: left;
								white-space: nowrap;
								overflow: hidden;
								word-break:keep-all;
								text-overflow:ellipsis;
							}
							span{
								float: right;
								font-size: 0.875rem;
								color: #868686;
							}
						}
						.p2{
							color: #868686;
							font-size: 0.875rem;
							line-height: 1.875rem;
							text-align: left;
						}
						.p3{
							text-align: left;
							font-size: 0.875rem;
							color: #282828;
						}
					}
				}
				.bottom{
					width: 95%;
					margin: 0 auto;
					text-align: right;
					font-size: 0.875rem;
					line-height: 2.1875rem;
					padding-bottom: 0.4375rem;
					p{
						.s1{
							color: #282828;
						}
						.s2{
							color: #fc4141;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style>
