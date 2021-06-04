<template>
	<!-- 这是立即结算页面 -->
	<div class="settlement" v-if="settdata && result">
		<Return2></Return2>
		<!-- 地址 -->
		<div class="top">
			<div class="cont">
				<div class="left">
					<p class="p1">
						<span class="s1">{{settdata.addressInfo.real_name}}</span>
						<span class="s2">{{settdata.addressInfo.phone}}</span>
					</p>
					<p class="p2">
						<span class="s1">[默认]</span>
						<span class="s2">{{settdata.addressInfo.province}}
						{{settdata.addressInfo.city}}{{settdata.addressInfo.distric}}
						{{settdata.addressInfo.detail}}
						</span>
					</p>
				</div>
				<div class="right">
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
		<!-- 商品信息 -->
		<div class="content">
			<div class="contop">
				<p>共{{settdata.cartInfo.length}}件商品</p>
			</div>
			<div class="ccont">
				<div class="hz" v-for="i in settdata.cartInfo" :key="i.id">
					<div class="left">
						<img :src="i.productInfo.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
					</div>
					<div class="right">
						<div class="crtop">
							<p class="p1">{{i.productInfo.store_name}}</p><span>x {{i.cart_num}}</span>
						</div>
						<p class="p2">{{i.productInfo.attrInfo.suk}}</p>
						<p class="p3">￥ {{i.productInfo.price}}</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 优惠卷等等 -->
		<div class="spbz">
			<div class="scont">
				<div class="hz1">
					<p class="p1"><span>优惠卷</span></p>
					<p class="p2"><span>请选择</span><van-icon name="arrow" /></p>
				</div>
				<div class="hz2">
					<p class="p1"><span>积分抵扣</span></p>
					<p class="p2"><span class="s1">当前积分</span><span class="s2">{{settdata.userInfo.integral}}</span><input @click="integralbtn" type="checkbox"></p>
				</div>
				<div class="hz3">
					<p class="p1">快递费用</p>
					<p class="p2">{{settdata.priceGroup.storePostage!=0?'￥ '+settdata.priceGroup.storePostage:"免运费"}}</p>
				</div>
				<div class="hz4">
					<p>备注信息</p>
					<textarea maxlength="150" placeholder="请添加备注 (150字以内)"></textarea>
				</div>
			</div>
		</div>
		<!-- 支付 -->
		<div class="zhifu">
			<div class="zffs">
				<div class="zftop">
					<p>支付方式</p>
				</div>
				<div class="hz" :class="num==1?'active':''" @click="num=1;payType='weixin'">
					<div class="zfleft">
						<van-icon name="wechat" color="#41b035"/>
						<span :class="num==1?'active':''">微信支付</span>
					</div>
					<div class="zfright">
						<span>微信快捷支付</span>
					</div>
				</div>
				<div class="hz" :class="num==2?'active':''" @click="num=2;payType='yue'">
					<div class="zfleft">
						<van-icon name="gold-coin" color="#fe960f"/>
						<span :class="num==2?'active':''">余额支付</span>
					</div>
					<div class="zfright">
						<span>可用余额: {{settdata.userInfo.now_money}}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 商品总价 -->
		<div class="spzj">
			<div class="spcont">
				<p class="p1">
					<span class="s1">商品总价: </span>
					<span class="s2">￥ {{result.total_price}}</span>
				</p>
			</div>
			<p class="p2" v-if="result.pay_postage!=0">
				<span class="s1">运费: </span>
				<span class="s2">+￥{{result.pay_postage}}</span>
			</p>
			<p class="p3" v-if="result.deduction_price!=0">
				<span class="s1">积分抵扣: </span>
				<span class="s2">-￥{{result.deduction_price}}</span>
			</p>
		</div>
		<!-- 结算 -->
		<div class="jiesuan">
			<van-submit-bar :price="Number(result.pay_price)*100" text-align="left" button-text="立即结算" @submit="onSubmit" />
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
		computed:{
			...mapState({
				token:"token"
			})
		},
		data(){
			return {
				settdata:null,
				num:1,//支付方式
				payType:"weixin",
				result:null,//商品总价，运费等等
				integral:0
			}
		},
		methods:{
			integralbtn(e){//积分
				if(e.target.checked){
					this.integral=1;
					this.loadresult();
				}else {
					this.integral=0;
					this.loadresult();
				}
			},
			onSubmit(){//立即结算
				this.$toast("生成订单中...");
				this.$axios({
					method:"post",
					url:"order/create/"+this.settdata.orderKey,
					headers: {
						"Authori-zation": "Bearer " + this.token,
					},
					data:{
						addressId: this.settdata.addressInfo.id,
						bargainId: 0,
						combinationId: 0,
						couponId: 0,
						from: "weixinh5",
						mark: "",
						payType: this.payType,
						phone: "",
						pinkId: 0,
						real_name: "",
						seckill_id: 0,
						shipping_type: 1,
						store_id: 0,
						useIntegral: this.integral
					}
				}).then(data=>{
					this.$toast(data.data.msg);
					// console.log(data);
					let d = null;
					d=data.data.data.result.orderId;
					var b = [];
					if(data.data.data.status=="SUCCESS"){
						b=1
					}else {
						b=0;
					}
					this.$router.push("/paymentfailed?orderId="+d+"&b="+b+"&money="+this.settdata.userInfo.now_money);
				})
			},
			loadresult(){
				this.$axios({
					method:"post",
					url:"/order/computed/"+this.settdata.orderKey,
					headers: {
						"Authori-zation": "Bearer " + this.token,
					},
					data:{
						addressId: this.settdata.addressInfo.id,
						couponId: 0,
						payType: this.payType,
						shipping_type: 1,
						useIntegral: this.integral
					}
				}).then(data=>{
					this.result=data.data.data.result;
					// console.log(this.result);
				})
			}
		},
		created() {
			this.$axios({
				method:"post",
				url:"/order/confirm",
				headers: {
					"Authori-zation": "Bearer " + this.token,
				},
				data:{
					cartId:this.$route.query.list
				}
			}).then(data=>{
				this.settdata=data.data.data;
				// console.log(this.settdata);
				this.loadresult();
				// this.$axios.get("/coupons/order/"+d+"?cartId=1541").then(data=>{
				// 	console.log(data);
				// })
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.settlement{
		width: 100%;
		padding-bottom: 0.3125rem;
		.top{
			width: 100%;
			overflow: hidden;
			padding-bottom: 0.4375rem;
			background-image: linear-gradient(180deg,#e93323 0,#f5f5f5);
			.cont{
				width: 95%;
				margin: 1.25rem auto 0;
				background-color: white;
				border-radius: 3px 3px 0 0;
				border-bottom: 2px dashed #969799;
				overflow: hidden;
				display: flex;
				padding: 0.75rem 0;
				align-items: center;
				justify-content: space-between;
				.left{
					float: left;
					margin-left: 5%;
					.p1{
						text-align: left;
						line-height: 1.875rem;
						.s1,.s2{
							color: #282828;
							font-size: 1rem;
							font-weight: bold;
						}
						.s2{
							margin-left: 1.25rem;
						}
					}
					.p2{
						line-height: 1.5625rem;
						.s1{
							color: #fc4141;
							font-size: 0.875rem;
						}
						.s2{
							color: #666;
							margin-left: 0.3125rem;
							font-size: 0.875rem;
						}
					}
				}
				.right{
					margin-right: 5%;
					float: right;
					.van-icon{
						font-size: 1.125rem;
						color: #666;
					}
				}
			}
		}
		.content{
			width: 100%;
			background-color: white;
			.contop{
				width: 100%;
				padding-left: 5%;
				border-bottom: 1px solid #f0f0f0;
				p{
					color: #282828;
					font-size: 1rem;
					text-align: left;
					line-height: 2.5rem;
				}
			}
			.ccont{
				width: 90%;
				margin: 0 auto;
				.hz{
					width: 100%;
					overflow: hidden;
					padding: 0.4375rem 0;
					border-bottom: 1px solid #f0f0f0;
					.left{
						width: 27%;
						float: left;
						img{
							width: 4.375rem;
							float: left;
							height: 4.375rem;
							border-radius: 3px;
							vertical-align: bottom;
						}
					}
					.right{
						float: left;
						width: 73%;
						text-align: left;
						overflow: hidden;
						.crtop{
							width: 100%;
							overflow: hidden;
							.p1{
								width: 80%;
								float: left;
								font-size: 0.875rem;
								color: #282828;
								overflow: hidden;
								white-space: nowrap;
								word-break:keep-all;
								line-height: 1.5625rem;
								text-overflow:ellipsis;
							}
							span{
								float: right;
								font-size: 0.875rem;
								color: #666;
							}
						}
						.p2{
							font-size: 0.875rem;
							color: #666;
							width: 100%;
							line-height: 1.25rem;
						}
						.p3{
							font-size: 0.875rem;
							color: #fc4141;
							width: 100%;
							line-height: 1.875rem;
						}
					}
				}
			}
		}
		.spbz{
			width: 100%;
			margin-top: 0.4375rem;
			.scont{
				width: 100%;
				.hz1,.hz2,.hz3{
					border: 1px solid #f0f0f0;
				}
				div{
					padding: 0 5%;
					overflow: hidden;
					background-color: white;
					.p1{
						font-size: 1rem;
						color: #282828;
						text-align: left;
						float: left;
					}
					.p2{
						float: right;
					}
				}
				.hz1{
					line-height: 3.125rem;
					.p2{
						display: flex;
						align-items: center;
						span{
							font-size: 1rem;
							color: #666;
							margin-right: 0.4375rem;
						}
						.van-icon{
							color: #282828;
						}
					}
				}
				.hz2{
					line-height: 3.125rem;
					.p2{
						.s1{
							color: #666;
							font-size: 1rem;
							margin-right: 0.1875rem;
						}
						.s2{
							font-size: 1rem;
							color: #fc4141;
							margin-right: 0.3125rem;
						}
					}
				}
				.hz3{
					line-height: 3.125rem;
					.p2{
						color: #666;
						font-size: 1rem;
					}
				}
				.hz4{
					padding-bottom: 0.75rem;
					p{
						line-height: 3.125rem;
						text-align: left;
					}
					textarea{
						border: none;
						outline: none;
						width: 100%;
						height: 4.6875rem;
						background-color: #f9f9f9;
						border-radius: 3px;
						color: #666;
						padding-left: 0.5625rem;
						padding-top: 0.4375rem;
					}
				}
			}
		}
		.zhifu{
			width: 100%;
			background-color: white;
			margin-top: 0.4375rem;
			padding-bottom: 0.75rem;
			.zffs{
				width: 95%;
				margin: 0 auto;
				.zftop{
					width: 100%;
					line-height: 2.5rem;
					text-align: left;
					font-size: 1rem;
					color: #282828;
				}
				.hz{
					width: 100%;
					border: 1px solid #eee;
					border-radius: 3px;
					padding: 0.75rem 0;
					overflow: hidden;
					margin-top: 0.4375rem;
					&.active{
						border-color: #fc5445;
					}
					.zfleft{
						width: 50%;
						float: left;
						text-align: center;
						border-right: 1px solid #eee;
						display: flex;
						align-items: center;
						justify-content: center;
						.van-icon{
							font-size: 1.25rem;
						}
						span{
							font-size: 0.875rem;
							margin-left: 0.3125rem;
							color: #282828;
							&.active{
								color: #e93323;
							}
						}
					}
					.zfright{
						float: left;
						width: 50%;
						text-align: center;
						span{
							font-size: 0.875rem;
							color: #aaa;
						}
					}
				}
			}
		}
		.spzj{
			width: 100%;
			padding: 0 5%;
			overflow: hidden;
			line-height: 2.5rem;
			background-color: white;
			margin: 7px 0 3.25rem;
			p{
				overflow: hidden;
				.s1{
					float: left;
					font-size: 0.875rem;
					color: #282828;
				}
				.s2{
					font-size: 0.875rem;
					color: #666;
					float: right;
				}
			}
		}
		.jiesuan{
			width: 100%;
			.van-submit-bar__bar{
				font-size: 0.875rem;
				height: 3.125rem;
				.van-submit-bar__price{
					font-size: 0.75rem;
				}
				.van-submit-bar__button{
					width: 6.875rem;
					height: 2.5rem;
				}
				.van-button--normal{
					font-size: 0.875rem;
				}
			}
		}
	}
</style>
