<template>
	<!-- 这是申请退款页面 -->
	<div class="refund" v-if="refund">
		<Return2></Return2>
		<div class="top">
			<div class="hz" v-for="r in refund.cartInfo" :key="r.id">
				<div class="left">
					<img :src="r.productInfo.image" alt="">
				</div>
				<div class="right">
					<div class="rlef">
						<p>{{r.productInfo.store_name}}</p>
					</div>
					<div class="rrig">
						<p class="p1">￥{{r.productInfo.price}}</p>
						<p class="p2">x{{r.cart_num}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="cont">
				<div class="hz">
					<p>
						<span class="s1">退货件数</span>
						<span class="s2">{{refund.cartInfo.length}}</span>
					</p>
				</div>
				<div class="hz">
					<p>
						<span class="s1">退款金额</span>
						<span class="s2">￥{{refund.refund_price}}</span>
					</p>
				</div>
				<div class="hz">
					<p>
						<span class="s1">退款原因</span>
						<span class="s2" @click="btn">{{reasonstr}}<van-icon name="arrow" /></span>
					</p>
					<div v-show="isshow" class="reasonstr">
						<p @click="btn2(0)" :class="resnum==0?'active':''">选择退款原因</p>
						<p @click="btn2(k+1)" class="reas" :class="resnum==(k+1)?'active':''" v-for="(r,k) in reason" :key="k">{{r}}</p>
					</div>
				</div>
				<div class="hz">
					<p>
						<span class="s1">备注说明</span>
						<textarea placeholder="填写备注信息,100字以内" maxlength="100"></textarea>
					</p>
				</div>
				<div class="hz">
					<p>
						<span class="s1">上传凭证</span>
						<span class="s2">(最多可上传3张)</span>
					</p>
					<div class="pz">
						<van-icon name="photograph" />
						<p>上传凭证</p>
					</div>
				</div>
			</div>
		</div>
		<div class="foot" @click="btn3">申请退款</div>
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
				refund:null,
				reason:null,//退款理由
				reasonstr:"选择退款原因",
				isshow:false,
				resnum:0
			}
		},
		computed:{
			...mapState({
				token:"token"
			})
		},
		methods:{
			btn(){//退款原因
				this.isshow=true;
			},
			btn2(v){//退款的原因
				this.resnum=v;
				this.isshow=false;
				if(v==0){
					this.reasonstr="选择退款原因";
					return;
				}
				this.reasonstr=this.reason[v-1];
			},
			btn3(){
				if(this.reasonstr=="选择退款原因"){
					this.$toast("请选择退款原因");
					return;
				}
				this.$axios({
					method:"post",
					url:"/order/refund/verify",
					headers: {
						"Authori-zation": "Bearer " + this.token,
					},
					data:{
						refund_reason_wap_explain: "",
						refund_reason_wap_img: "",
						text: this.reasonstr,
						uni: this.$route.query.wx
					}
				}).then(data=>{
					this.$toast(data.data.msg);
					this.$router.push("/refundsuccessful?wx="+this.$route.query.wx);
				})
			}
		},
		created() {
			this.$axios.get("/order/detail/"+this.$route.query.wx).then(data=>{
				this.refund=data.data.data;
				// console.log(this.refund);
			})
			this.$axios.get("/order/refund/reason").then(data=>{
				this.reason=data.data.data;
				// console.log(this.reason);
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.refund{
		width: 100%;
		.top{
			width: 100%;
			background-color: white;
			.hz{
				width: 95%;
				margin: 0 auto;
				overflow: hidden;
				padding: 0.5625rem 0;
				.left{
					width: 22%;
					float: left;
					img{
						width: 3.75rem;
						height: 3.875rem;
						vertical-align: bottom;
						float: left;
						border-radius: 3px;
					}
				}
				.right{
					width: 77%;
					float: left;
					overflow: hidden;
					.rlef{
						width: 70%;
						float: left;
						p{
							font-size: 0.875rem;
							margin-top: 0.1875rem;
							color: #282828;
							line-height: 1.25rem;
							text-align: left;
							word-break: break-all;
							display: -webkit-box;
							-webkit-line-clamp: 3;
							-webkit-box-orient: vertical;
						}
					}
					.rrig{
						float: left;
						width: 30%;
						p{
							&:nth-child(1){
								margin-top: 0.1875rem;
							}
							text-align: right;
							font-size: 0.875rem;
							color: #999;
						}
					}
				}
			}
		}
		.content{
			width: 100%;
			background-color: white;
			.cont{
				width: 95%;
				margin: 0.3125rem auto 0;
				.hz{
					width: 100%;
					border-bottom: 1px solid #eee;
					position: relative;
					textarea{
						border: none;
						outline: none;
						float: right;
						width: 50%;
						color: #666;
					}
					.van-icon{
						color: #282828;
						margin-left: 0.1875rem;
					}
					p{
						font-size: 0.875rem;
						color: #282828;
						overflow: hidden;
						line-height: 2.5rem;
						.s1{
							float: left;
						}
						.s2{
							float: right;
						}
					}
					.reasonstr{
						width: 65%;
						position: absolute;
						right: 0;
						top: 1.875rem;
						z-index: 2;
						border: 1px solid #333;
						p{
							line-height: 2.1875rem;
							text-align: right;
							color: #282828;
							font-size: 0.875rem;
							background-color: white;
							padding-right: 1rem;
							&.active{
								background-color: #ade1f5;
								color: white;
							}
						}
					}
					&:nth-last-child(1){
						p{
							font-size: 0.875rem;
							overflow: hidden;
							.s1{
								color: #282828;
								float: left;
							}
							.s2{
								float: right;
								color: #999;
							}
						}
						.pz{
							width: 5rem;
							height: 5rem;
							border: 1px solid #bbbbbb;
							margin-top: 0.4375rem;
							margin-bottom: 0.75rem;
							.van-icon{
								font-size: 1.875rem;
								color: #999;
								margin-top: 0.625rem;
							}
							p{
								color: #999;
								margin-top: -0.4375rem;
							}
						}
					}
				}
			}
		}
		.foot{
			width: 95%;
			margin: 0.9375rem auto 0;
			border-radius: 1.25rem;
			background-color: #e93323;
			color: white;
			font-size: 1rem;
			line-height: 2.5rem;
		}
	}
</style>
