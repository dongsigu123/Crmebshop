<template>
	<!-- 这是我的页面 -->
	<div class="mine" v-if="user">
		<div class="top">
			<div class="cont">
				<div class="tleft">
					<img :src="user.avatar+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
				</div>
				<div class="tright">
					<div class="trt">
						<p>{{user.nickname}}<van-icon @click="setupbtn" name="setting-o" /></p>
					</div>
					<div class="trb">
						<p>ID: {{user.uid}} <van-icon name="edit" /></p>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<!-- 余额。。。 -->
			<div class="usertop">
				<div>
					<p class="p1">我的余额</p>
					<p class="p2">{{user.now_money}}</p>
				</div>
				<div>
					<p class="p1">当前佣金</p>
					<p class="p2">{{user.commissionCount}}</p>
				</div>
				<div>
					<p class="p1">优惠卷</p>
					<p class="p2">{{user.couponCount}}</p>
				</div>
			</div>
			<!-- 订单... -->
			<div class="mydingdan">
				<div class="ddtop">
					<div class="ddcont">
						<p class="p1">我的订单</p>
						<p @click="$router.push('/orderinformation?navnum=0')" class="p2">全部订单<van-icon name="arrow" /></p>
					</div>
				</div>
				<div class="ddbottom">
					<van-badge :content="user.orderStatusNum.unpaid_count==0?'':user.orderStatusNum.unpaid_count">
						<div @click="dfkbtn">
							<img src="../assets/user01.png" alt="">
							<p>待付款</p>
						</div>
					</van-badge>
					<van-badge :content="user.orderStatusNum.unshipped_count==0?'':user.orderStatusNum.unshipped_count">
						<router-link tag="div" to="/orderinformation?navnum=1">
							<img src="../assets/user02.png" alt="">
							<p>待发货</p>
						</router-link>
					</van-badge>
					<van-badge :content="user.orderStatusNum.received_count==0?'':user.orderStatusNum.received_count">
						<router-link tag="div" to="/orderinformation?navnum=2">
							<img src="../assets/user03.png" alt="">
							<p>待收货</p>
						</router-link>
					</van-badge>
					<van-badge :content="user.orderStatusNum.evaluated_count==0?'':user.orderStatusNum.evaluated_count">
						<router-link tag="div" to="/orderinformation?navnum=3">
							<img src="../assets/user04.png" alt="">
							<p>待评价</p>
						</router-link>
					</van-badge>
					<van-badge :content="user.orderStatusNum.refund_count==0?'':user.orderStatusNum.refund_count">
						<router-link tag="div" to="/userrefund">
							<img src="../assets/user05.png" alt="">
							<p>售后/退款</p>
						</router-link>
					</van-badge>
				</div>
			</div>
			<!-- 服务 -->
			<div class="myfuwu">
				<div class="fwtop">
					<div class="fwcont">
						<p class="p1">我的服务</p>
					</div>
				</div>
				<div class="fwbottom">
					<ul>
						<li v-for="(u,k) in usernav" :key="u.id" @click="btn(usernavurl[k])">
							<img :src="u.pic+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
							<p>{{u.name}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="footbj">
				<img src="../assets/userbj.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	export default{
		data(){
			return {
				user:null,
				usernav:null,//中间小导航
				usernavurl:["","","","","","collection","",""]//中间小导航路径
			}
		},
		computed:{
			...mapState({
				token:"token"
			})
		},
		methods:{
			btn(v){
				this.$router.push("/"+v)
			},
			dfkbtn(){//待付款
				this.$router.push("/orderinformation?navnum=0&money="+this.user.now_money);
			},
			setupbtn(){//设置页面
				this.$router.push("/setup")
			}
		},
		created(){
			this.axios({
			  method: "get",
			  url: "/user",
			  headers: {
			    'Authori-zation':'Bearer '+ this.token
			  }
			}).then(data=>{
				this.user=data.data.data;
				// console.log(this.user);
			})
			
			this.$axios.get("/menu/user").then(data=>{
				this.usernav=data.data.data.routine_my_menus;
				// console.log(this.usernav);
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.mine{
		width: 100%;
		.top{
			width: 100%;
			height: 8.125rem;
			background-color: #e93323;
			border-radius: 0 0 20% 20%;
			overflow: hidden;
			.cont{
				width: 95%;
				margin: 0 auto;
				margin-top: 0.9375rem;
				overflow: hidden;
				display: flex;
				align-items: center;
			}
			.tleft{
				float: left;
				width: 20%;
				img{
					width: 3.75rem;
					height: 3.75rem;
					overflow: hidden;
					border-radius: 50%;
				}
			}
			.tright{
				width: 80%;
				float: left;
				p{
					text-align: left;
					margin-left: 0.4375rem;
				}
				.trt{
					width: 100%;
					overflow: hidden;
					p{
						color: white;
						line-height: 1.5625rem;
						font-size: 1rem;
					}
					.van-icon{
						color: white;
						float: right;
					}
				}
				.trb{
					width: 100%;
					p{
						font-size: 0.875rem;
						color: hsla(0,0%,100%,.6);
					}
				}
			}
		}
		.content{
			width: 95%;
			margin:  -2.5rem auto 0;
			.usertop{
				width: 100%;
				background-color: white;
				border-radius: 3px;
				display: flex;
				padding-top: 0.9375rem;
				padding-bottom: 0.9375rem;
				div{
					flex: 1;
					border-right: 1px solid #dddddd;
					&:nth-child(3){
						border: none;
					}
					.p1{
						color: #aaa;
						font-size: 0.8125rem;
					}
					.p2{
						font-size: 1rem;
						color: #282828;
						line-height: 1.25rem;
					}
				}
			}
			.mydingdan{
				width: 100%;
				background-color: white;
				margin-top: 0.3125rem;
				border-radius: 3px;
				padding-top: 0.75rem;
				padding-bottom: 0.75rem;
				.ddtop{
					width: 100%;
					border-bottom: 1px dotted #ddd;
					padding-bottom: 0.75rem;
					.ddcont{
						width: 95%;
						margin: 0 auto;
						overflow: hidden;
					}
					.p1{
						float: left;
						font-size: 1rem;
						color: #282828;
					}
					.p2{
						float: right;
						font-size: 0.875rem;
						color: #282828;
					}
					.van-icon{
						margin-left: 0.1875rem;
					}
				}
				.ddbottom{
					width: 100%;
					display: flex;
					padding-top: 0.75rem;
					.van-badge__wrapper{
						/deep/ .van-badge--fixed{
							right: 1rem;
						}
					}
					div{
						flex: 1;
						img{
							width: 35%;
							vertical-align: bottom;
						}
						p{
							font-size: 0.8125rem;
							color: #282828;
							line-height: 1.875rem;
						}
					}
				}
			}
			.myfuwu{
				width: 100%;
				background-color: white;
				border-radius: 3px;
				margin-top: 0.4375rem;
				.fwtop{
					width: 100%;
					border-bottom: 1px dotted #ddd;
					padding-bottom: 0.75rem;
					padding-top: 0.75rem;
					.fwcont{
						width: 95%;
						margin: 0 auto;
						overflow: hidden;
					}
					.p1{
						font-size: 1rem;
						text-align: left;
						color: #282828;
					}
				}
				.fwbottom{
					width: 100%;
					padding-bottom: 0.75rem;
					ul{
						width: 100%;
						overflow: hidden;
						li{
							width: 25%;
							padding-top: 0.75rem;
							float: left;
							img{
								width: 30%;
								vertical-align: bottom;
							}
							p{
								font-size: 0.8125rem;
								color: #282828;
								line-height: 1.875rem;
							}
						}
					}
				}
			}
			.footbj{
				width: 100%;
				padding: 0.9375rem 0;
				img{
					width: 35%;
					vertical-align: bottom;
				}
			}
		}
	}
</style>
