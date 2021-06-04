<template>
	<!-- 这是购物车页面 -->
	<div class="shoppingcart" v-if="cartdata">
		<div class="top">
			<ul>
				<li><van-icon name="passed" />100%正品保证</li>
				<li><van-icon name="passed" />所有商品精挑细选</li>
				<li><van-icon name="passed" />售后无忧</li>
			</ul>
			<div class="gwsl">
				<div class="gwcont">
					<p>购物数量<span>{{cartdata.length}}</span></p>
					<van-button type="default" @click="isShow=!isShow" v-if="isfoot" v-show="!isShow">管理</van-button>
					<van-button type="default" @click="isShow=!isShow" v-if="isfoot" v-show="isShow">取消</van-button>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="hz" v-for="i in cartdata" :key="i.id">
				<div class="cont">
					<div class="left">
						<van-checkbox v-model="i.isSeclect" checked-color="#fc4141"></van-checkbox>
						<router-link tag="img" :to="{path:'/productdetails/'+i.productInfo.id}" :src="i.productInfo.image+'?imageView=1&type=webp&thumbnail=246x0'" />
					</div>
					<div class="right">
						<div class="sptop">
							<p class="p1">{{i.productInfo.store_name}}</p>
							<p class="p2">属性: {{i.productInfo.attrInfo.suk}}</p>
						</div>
						<div class="spbottom">
							<div class="spblef">￥ {{i.productInfo.attrInfo.price}}</div>
							<div class="spbrig">
								<van-stepper v-model="i.cart_num" integer min="1" :max="i.productInfo.attrInfo.stock" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Kongdata :shopdatas="shopdatas" v-show="!isfoot"></Kongdata>
		<div class="foot" v-show="isfoot">
			<van-submit-bar :price="totalMoney" v-show="!isShow" button-text="立即下单" @submit="onSubmit">
				<van-checkbox v-model="checkbox" checked-color="#ee0a24" @click="checkboxbtn">全选 ({{totalcartnum}})</van-checkbox>
			</van-submit-bar>
			<van-submit-bar v-show="isShow" button-text="删除">
				<van-checkbox v-model="checkbox" checked-color="#ee0a24" @click="checkboxbtn">全选 ({{totalcartnum}})</van-checkbox>
				<template #button>
					<span class="s1" @click="scbtn">收藏</span>
					<span class="s2" @click="deletebtn">删除</span>
				</template>
			</van-submit-bar>
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	import Kongdata from "../components/Kongdata.vue"
	export default{
		components:{
			Kongdata
		},
		data(){
			return {
				cartdata:[],
				checkbox:false,
				isShow:false,
				shopdatas:null,//购物车为空时
				isfoot:true
			}
		},
		methods:{
			onSubmit(){//下单
				var arr = [];
				var result = this.cartdata.some(item=>{
					return item.isSeclect;
				})
				// console.log(result)
				if(!result){
					this.$toast("请选择商品");
					return;
				}
				for(let i of this.cartdata){//把商品数量变动后的数据上传
					if(i.isSeclect){
						this.$axios({
							method:"post",
							url:"/cart/num",
							headers: {
								"Authori-zation": "Bearer " + this.token,
							},
							data:{
								id: i.id,
								number: i.cart_num
							}
						})
						arr.push(i.id);
					}
				}
				// console.log(arr.join())
				this.$router.push("/settlement?list="+arr.join());
				
			},
			load(){
				let d=[];
				this.cartdata=[];
				this.$axios.get("/cart/list").then(data=>{
					d=data.data.data.valid;
					// console.log(d);
				}).then(()=>{
					for(let i of d){
						// console.log(i)
						this.cartdata.push({
							isSeclect:false,
							id:i.id,
							productInfo:i.productInfo,
							cart_num:i.cart_num,
						})
					}
					// console.log(this.cartdata)
					if(this.cartdata.length==0){
						this.isfoot=false;
						this.$axios.get("/product/hot?page=1&limit=20").then(data=>{
							this.shopdatas=data.data.data;
							// console.log(this.shopdatas);
						})
					}else{
						this.isfoot=true;
					}
				})
			},
			checkboxbtn(){//全选按钮
				if(this.checkbox){
					this.cartdata.forEach(item=>{
						item.isSeclect=true;
					})
				}else{
					this.cartdata.forEach(item=>{
						item.isSeclect=false;
					})
				}
			},
			scbtn(){//收藏
				var result = this.cartdata.some(item=>{
					return item.isSeclect;
				})
				// console.log(result)
				if(!result){
					this.$toast("请选择要收藏的商品");
					return;
				}
				let arr = [];
				for(let i of this.cartdata){//把商品数量变动后的数据上传
					if(i.isSeclect){
						arr.push(i.productInfo.id);
						
					}
				}
				this.$axios({
					method:"post",
					url: "/collect/all",
					headers: {
						"Authori-zation": "Bearer " + this.token,
					},
					data:{
						category: "product",
						id: arr
					}
				}).then(()=>{
					this.$toast("收藏成功");
				})
				// console.log(arr)
				
			},
			deletebtn(){//删除商品
				var result = this.cartdata.some(item=>{
					return item.isSeclect;
				})
				// console.log(result)
				if(!result){
					this.$toast("请选择要删除的商品");
					return;
				}
				var list = [];
				for(let i of this.cartdata){
					if(i.isSeclect){
						list.push(i.id);
					}
				}
				this.$axios({
					method:"post",
					url:"/cart/del",
					headers: {
						"Authori-zation": "Bearer " + this.token,
					},
					data:{
						ids: list
					}
				}).then(()=>{
					this.load();
				})
			}
		},
		watch:{
			checked:function(n){
				this.checkbox=n;
			}
		},
		computed:{
			...mapState({
				token:"token"
			}),
			checked:function(){//全选判断
				var result = this.cartdata.every(item=>{
					return item.isSeclect;
				})
				// console.log(result);
				return result;
			},
			totalcartnum:function(){
				return this.cartdata.filter((item)=>item.isSeclect)
					.reduce((total,item)=>{
						return total + item.cart_num;
					},0)
			},
			totalMoney:function(){
				// return this.cartdata.filter((item)=>item.isSeclect)
				// 	.reduce((total,item)=>{
				// 		return total + item.cart_num * Number(item.productInfo.price)*100;
				// 	},0)
				var sum = 0;
				this.cartdata.forEach((item)=>{
					if(item.isSeclect){
						sum += item.cart_num * Number(item.productInfo.price)*100
					}
				})
				return sum;
			}
		},
		created() {
			this.load();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.shoppingcart{
		width: 100%;
		padding-top: 5.3125rem;
		padding-bottom: 4.0625rem;
		.top{
			width: 100%;
			position: fixed;
			top: 0;
			z-index: 2;
			left: 0;
			background-color: #f5f5f5;
			ul{
				width: 100%;
				display: flex;
				height: 2.5rem;
				li{
					flex: 1;
					color: #8c8c8c;
					font-size: 0.75rem;
					justify-content: center;
					display: flex;
					align-items: center;
					.van-icon{
						margin-right: 0.1875rem;
					}
				}
			}
			.gwsl{
				width: 100%;
				line-height: 2.5rem;
				background-color: white;
				.gwcont{
					width: 90%;
					margin: 0 auto;
					overflow: hidden;
				}
				p{
					float: left;
					font-size: 1rem;
					color: #282828;
					span{
						color: #fc4141;
						margin-left: 3px;
					}
				}
				.van-button{
					float: right;
					height: 1.5625rem;
					margin-top: 0.46875rem;
					border-radius: 5px;
					color: #282828;
					border-color: #868686;
				}
			}
		}
		.content{
			width: 100%;
			.hz{
				width: 100%;
				background-color: white;
				.cont{
					width: 90%;
					margin: 7px auto 0;
					padding: 0.4375rem 0;
					overflow: hidden;
					display: flex;
					align-items: center;
				}
				.left{
					float: left;
					width: 35%;
					overflow: hidden;
					display: flex;
					align-items: center;
					.van-checkbox{
						margin-right: 12px;
					}
					img{
						width: 60%;
						height:4.5rem;
						border-radius: 5px;
						vertical-align: bottom;
					}
				}
				.right{
					width: 65%;
					float: left;
					overflow: hidden;
					.sptop{
						width: 100%;
						margin-top: 0.1875rem;
						text-align: left;
						.p1{
							width: 95%;
							font-size: 0.875rem;
							line-height: 1.5625rem;
							color: #282828;
							white-space: nowrap;
							overflow: hidden;
							word-break:keep-all;
							text-overflow:ellipsis;
						}
						.p2{
							font-size: 0.875rem;
							color: #868686;
							line-height: 1.5625rem;
						}
					}
					.spbottom{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.spblef{
							color: #282828;
							text-align: left;
							font-size: 1rem;
						}
					}
				}
			}
		}
		.foot{
			width: 100%;
			.van-submit-bar__bar{
				font-size: 0.875rem;
				height: 3.125rem;
			}
			/deep/ .van-checkbox__icon{
				font-size: 1.25rem;
			}
			/deep/ .van-checkbox__label{
				font-size: 1rem;
				margin-left: 0.5rem;
			}
			/deep/ .van-submit-bar__price{
				font-size: 0.75rem;
			}
			/deep/ .van-submit-bar__button{
				width: 6.875rem;
				height: 2.5rem;
			}
			/deep/ .van-button--normal{
				font-size: 0.75rem;
			}
			.van-submit-bar{
				z-index: 2;
				bottom: 3.125rem;
				.van-checkbox{
					position: absolute;
					left: 5%;
				}
				
			}
			.s1{
				border: 1px solid #ff3700;
				color: #ff3700;
				margin-right: 0.3125rem;
			}
			.s1,.s2{
				padding: 0.1875rem 1.5625rem;
				font-size: 0.875rem;
				border-radius: 0.9375rem;
			}
			.s2{
				border: 1px solid #999;
				color: #999;
			}
		}
	}
</style>
