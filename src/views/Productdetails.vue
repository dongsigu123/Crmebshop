<template>
	<!-- 商品详情页面 -->
	<div class="productdetails" v-if="shopdata">
		<!-- 底部商品导航 -->
		<van-goods-action>
			<van-goods-action-icon icon="service-o" text="客服" color="#ee0a24" />
			<van-goods-action-icon :icon="issc?'star':'star-o'" :color="issc?'#ee0a24':''" :text="issc?'已收藏':'收藏'" @click="scbtn"/>
			<van-badge :content="cartnum==0?'':cartnum">
				<van-goods-action-icon @click="$router.push('/shoppingcart')" icon="cart-o" text="购物车" />
			</van-badge>
			<van-goods-action-button type="warning" @click="addcart" text="加入购物车" />
			<van-goods-action-button type="danger" @click="addbuy" text="立即购买" />
		</van-goods-action>
		<van-tabs v-model="activeName" scrollspy sticky :line-height="2">
			<van-tab title="商品" name="商品">
				<!-- 轮播图 -->
				<van-swipe class="swipe" @change="onChange">
					<van-swipe-item v-for="(s,k) in shopdata.storeInfo.slider_image" :key="k">
						<van-image :src="s+'?imageView=1&type=webp&thumbnail=246x0'" height="100%" width="100%"/>
					</van-swipe-item>
					<template #indicator>
						<div class="custom-indicator">{{ current + 1 }}/{{shopdata.storeInfo.slider_image.length}}</div>
					</template>
				</van-swipe>
				<div class="commoditydata">
					<p class="p1">
						<span class="s1">￥{{shopdata.storeInfo.price}}</span>
						<span class="s2">￥{{shopdata.storeInfo.vip_price}}</span>
						<span class="s3 iconfont icon-vip"></span>
						<span class="s4 iconfont icon-fenxiang"></span>
					</p>
					<p class="p2">{{shopdata.storeInfo.store_name}}</p>
					<p class="p3">
						<span class="s1">原价: ￥{{shopdata.storeInfo.ot_price}}</span>
						<span class="s2">库存: {{shopdata.storeInfo.stock}}{{shopdata.storeInfo.unit_name}}</span>
						<span class="s3">销量: {{shopdata.storeInfo.fsales}}{{shopdata.storeInfo.unit_name}}</span>
					</p>
				</div>
				<!-- 商品价格 -->
				<van-cell v-show="show2" is-link @click="showpopup">已选择 : {{sku.join()}}</van-cell>
				<van-popup v-model="show" closeable round close-icon-position="top-right" position="bottom">
					
					<van-card :title="shopdata.storeInfo.store_name" :thumb="currentDetail && currentDetail.image ? currentDetail.image : shopdata.storeInfo.image">
						<template #price>
							<span>￥</span>
							<span>{{shopdata.storeInfo.price }}</span>
							<span>库存: {{sku.length !=0 ? shopdata.productValue[sku.join()].stock : shopdata.storeInfo.stock}}{{shopdata.storeInfo.unit_name}}</span>
						</template>
					</van-card>
					<!-- 商品型号 -->
					<div class="xhz" v-for="(s,k) in shopdata.productAttr" :key="k">
						<p>{{s.attr_name}}</p>
						<label v-for="(attr, idx) in s.attr_values" :key="idx">
							<input type="radio" :value="attr" :name="s.attr_name" v-model="sku[k]"/>
							<span>{{ attr }}</span>
						</label>
					</div>
					<!-- 商品购买数量 -->
					<div class="spgmsl">
						<p>数量</p>
						<div class="spslan">
							<van-stepper v-model="cartNum" integer min="1" :max="sku.length !=0 ? shopdata.productValue[sku.join()].stock : shopdata.storeInfo.stock" />
						</div>
					</div>
				</van-popup>
			</van-tab>
			<van-tab title="评价" name="评价">
				<!-- 用户评价 -->
				<div class="evaluate">
					<p>
						<span class="s1">用户评价(0)</span>
						<span class="s4 iconfont icon-right"></span>
						<span class="s3">好评率</span>
						<span class="s2">0%</span>
					</p>
				</div>
			</van-tab>
			<van-tab title="推荐" name="推荐">
				<!-- 优品推荐 -->
				<div class="premium">
					<div class="top">
						<p>
							<img src="../assets/premium.png" alt="" class="tp">
							<span>优品推荐</span>
							<img src="../assets/premium.png" alt="" class="tp2">
						</p>
					</div>
					<van-swipe class="swipe2" indicator-color="white">
						<van-swipe-item v-for="s in shopdata.good_list.length/6" :key="s">
							<div v-for="n in shopdata.good_list.slice(6*(s-1),6*s)" :key="n.id" class="hz" @click="divbtn(n.id)">
								<img :src="n.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
								<p class="p1">{{n.store_name}}</p>
								<p class="p2">￥{{n.price}}</p>
							</div>
						</van-swipe-item>
					</van-swipe>
				</div>
			</van-tab>
			<van-tab title="详情" name="详情">
				<!-- 产品介绍 -->
				<div class="product">
					<p>产品介绍</p>
					<div class="content" v-html="shopdata.storeInfo.description"></div>
				</div>
			</van-tab>
		</van-tabs>
		<Return2></Return2>
	</div>
</template>

<script>
	import Return2 from "../components/Return2.vue"
	import {mapState} from "vuex"
	import store from '../store/index'
	export default{
		components:{
			Return2
		},
		data(){
			return {
				show: false,
				activeName:"商品",//导航名
				current: 0,//轮播指示器数值
				shopdata:null,//商品数据
				sku:[],//已选商品类型
				currentDetail:null,//已选择的商品数据
				show2: true,
				cartNum:1,//商品购买数量
				productAttr:null,
				issc:false,//收藏
				cartnum:null//购物车数量
			}
			
		},
		watch:{
			shopdata: function(n) {//默认已选择的商品
				// console.log(n);
				this.current=0;
				this.sku = n.productAttr.map((item) => item.attr_values[0]);
				// console.log(this.sku)
			},
			sku: function(n) {//已选择的商品数据
				// console.log(n.join());
				// console.log(n)
				// console.log(this.detail.productValue[n.join()]);
				this.currentDetail = this.shopdata.productValue[n.join()];
				// console.log(this.currentDetail)
			}
		},
		computed:{
			...mapState({
				token:"token"
			})
		},
		methods:{
			scbtn(){//收藏
				if(!localStorage.getItem("userinfo")){
					this.$toast("未登录");
					this.$router.push("/login?url=1");
				}else{
					if(this.issc){
						this.$axios({
							method:"post",
							url: "/collect/del",
							headers: {
								"Authori-zation": "Bearer " + this.token,
							},
							data:{
								category: "product",
								id: this.shopdata.storeInfo.id
							}
						}).then(()=>{
							this.$toast("取消收藏成功");
							this.issc=false;
						})
					}else{
						this.$axios({
							method:"post",
							url: "/collect/add",
							headers: {
								"Authori-zation": "Bearer " + this.token,
							},
							data:{
								category: "product",
								id: this.shopdata.storeInfo.id
							}
						}).then(()=>{
							this.$toast("收藏成功");
							this.issc=true;
						})
					}
				}
			},
			addcart(){//添加购物车
				if(this.show){
					this.show=false;
					if(!localStorage.getItem("userinfo")){
						this.$toast("未登录");
						this.$router.push("/login?url=1");
					}else{
						this.$axios({
							method:"post",
							url: "/cart/add",
							headers: {
								"Authori-zation": "Bearer " + this.token,
							},
							data:{
								productId: this.currentDetail.product_id ? this.currentDetail.product_id : this.shopdata.storeInfo.id,
								cartNum: this.cartNum,
								new: 0,
								uniqueId: this.currentDetail.unique,
							}
						}).then(data=>{
							// console.log(data.data.data);
							this.$toast("添加成功");
							let d =[];
							this.$axios.get("/cart/list").then(data=>{
								d=data.data.data.valid;
								this.cartnum=d.length;
							})
						})
					}
				}else{
					this.show=true;
				}
			},
			addbuy(){
				if(this.show){
					this.show=false;
					if(!localStorage.getItem("userinfo")){
						this.$toast("未登录");
						this.$router.push("/login?url=1");
					}else{
						this.$axios({
							method:"post",
							url: "/cart/add",
							headers: {
								"Authori-zation": "Bearer " + this.token,
							},
							data:{
								productId: this.currentDetail.product_id ? this.currentDetail.product_id : this.shopdata.storeInfo.id,
								cartNum: this.cartNum,
								new: 0,
								uniqueId: this.currentDetail.unique,
							}
						}).then(data=>{
							let d = data.data.data.cartId;
							// console.log(d);
							this.$router.push("/settlement?list="+d)
						})
					}
				}else{
					this.show=true;
				}
			},
			divbtn(value){//优品推荐
				// document.documentElement.scrollTop=0;
				window.scroll(0,0);
				this.$router.push('/productdetails/' + value);
			},
			showpopup() {
				this.show = true;
			},
			onChange(index) {//top轮播图下标
				this.current = index;
			},
			loading(id){
				this.cartNum=1;
				this.$axios.get("/product/detail/"+id).then(data=>{
					this.shopdata=data.data.data;
					this.productAttr=data.data.data.productAttr;
					// console.log(this.shopdata);
					if(data.data.data.productAttr.length==0){
						this.show2=false;
					}else{
						this.show2=true;
					}
					
					if(localStorage.getItem("userinfo")){
						let arr = [];
						this.$axios.get("/collect/user?page=1&limit=20").then(data=>{
							arr=data.data.data
							// console.log(arr);
							for(let i of arr){
								if(i.pid == this.shopdata.storeInfo.id){
									this.issc=true;
								}
							}
						})
						let d = [];
						this.$axios.get("/cart/list").then(data=>{
							d=data.data.data.valid;
							this.cartnum=d.length;
						})
					}
					
				}).catch(function(error) {
						console.log(error);
				});
			}
		},
		beforeRouteUpdate(to,from,next){
			// console.log("beforeRouteUpdata",to);
			next();
			this.loading(to.params.shopid);
		},
		created() {
			this.loading(this.$route.params.shopid);
		}
	}
</script>

<style lang="less" scoped="scoped">
	.productdetails{
		width: 100%;
		.van-badge__wrapper{
			/deep/ .van-badge--fixed{
				right: 0.875rem;
			}
		}
		.van-cell{
			margin-top: 0.4375rem;
		}
		.spgmsl{
			width: 100%;
			padding-left: 0.9375rem;
			p{
				text-align: left;
				color: #999;
				font-size: 1rem;
			}
			.spslan{
				width: 100%;
				padding-top: 0.4375rem;
				text-align: left;
			}
		}
		.xhz{
			width: 100%;
			padding-left: 0.9375rem;
			overflow: hidden;
			p{
				width: 100%;
				font-size: 1rem;
				color: #999;
				text-align: left;
			}
			label{
				float: left;
			}
			span{
				font-size: 0.875rem;
				color: #282828;
				margin-left: 0.1875rem;
				margin-right: 0.5625rem;
			}
		}
		/deep/ .van-card__thumb{
			width: 5rem;
			height: 5rem;
		}
		/deep/ .van-card__content{
			height: 5rem;
			min-height: 0;
		}
		/deep/ .van-tabs__wrap{
			height: 2.8125rem;
			line-height: 2.8125rem;
		}
		/deep/ .van-tab{
			color: #282828;
			font-size: 1rem;
		}
		/deep/ .van-card__title{
			font-size: 1.125rem;
			color: #282828;
			width: 85%;
			text-align: left;
			padding-top: 0.75rem;
			padding-left: 0.625rem;
			white-space: nowrap;
			overflow: hidden;
			word-break:keep-all;
			text-overflow:ellipsis;
		}
		/deep/ .van-card__price{
			float: left;
			margin-left: 0.625rem;
			margin-bottom: 0.25rem;
			span{
				&:nth-of-type(1){
					font-size: 0.75rem;
					color: #fc4141;
				}
				&:nth-of-type(2){
					color: #fc4141;
					font-size: 1.25rem;
					margin-right: 0.5625rem;
				}
				&:nth-of-type(3){
					color: #999;
					font-size: 0.1875rem;
				}
			}
		}
		/deep/ .van-popup--bottom{
			padding-bottom: 3.75rem;
			z-index: 3 !important;
		}
		/deep/ .van-overlay{
			z-index: 3 !important;
		}
		.swipe{
			height: 23.125rem;
		}
		.van-goods-action{
			z-index: 4;
			height: 3.125rem;
			
		}
		.custom-indicator {
			position: absolute;
			right: 0.3125rem;
			bottom: 0.3125rem;
			padding: 0.125rem 0.3125rem;
			font-size: 0.75rem;
			background: white;
		}
		.commoditydata{
			background-color: white;
			width: 100%;
			padding-bottom: 0.4375rem;
			p{
				width: 90%;
				margin-left: 5%;
			}
			.p1{
				text-align: left;
				overflow: hidden;
				line-height: 2.1875rem;
				margin-top: 0.4375rem;
				.s1{
					font-size: 1.25rem;
					color: #fc4141;
					font-weight: bold;
				}
				.s2{
					font-size: 0.8125rem;
					color: #282828;
					font-weight: bold;
					margin: 0 0.4375rem;
				}
				.s3{
					font-size: 0.75rem;
					color: #282828;
				}
				.s4{
					float: right;
					font-size: 1.125rem;
					color: #82848f;
					font-weight: bold;
				}
			}
			.p2{
				color: #333;
				font-size: 1rem;
				text-align: left;
				font-weight: bold;
			}
			.p3{
				overflow: hidden;
				margin-top: 0.4375rem;
				span{
					font-size: 0.75rem;
					color: #82848f;
				}
				.s1{
					float: left;
				}
				.s3{
					float: right;
				}
			}
		}
		.evaluate{
			width: 100%;
			background-color: white;
			line-height: 3.125rem;
			margin-top: 0.4375rem;
			p{
				width: 100%;
				overflow: hidden;
				span{
					font-size: 0.875rem;
				}
				.s1{
					float: left;
					color: #282828;
					margin-left: 5%;
				}
				.s2,.s3,.s4{
					float: right;
				}
				.s2{
					color: #fc4141;
				}
				.s3,.s4{
					color: grey;
				}
				.s4{
					margin: 0 0.75rem 0 0.4375rem;
				}
			}
		}
		.premium{
			width: 100%;
			background-color: white;
			margin-top: 0.4375rem;
			.top{
				width: 100%;
				line-height: 3.125rem;
				img{
					width: 0.9375rem;
					vertical-align: middle;
				}
				span{
					font-size: 0.875rem;
					color: #f21b07;
					margin: 0 0.75rem;
				}
			}
			.swipe2{
				width: 100%;
				padding-bottom: 20px;
				/deep/ .van-swipe__indicator{
					background-color: #999;
				}
				/deep/ .van-swipe__indicator--active{
					background-color: #f21b07 !important;
				}
				.hz{
					width: 30%;
					margin-left: 2.5%;
					display: inline-block;
					padding-bottom: 0.625rem;
					img{
						width: 100%;
						height: 7.5rem;
						border-radius: 7px;
					}
					p{
						text-align: left;
					}
					.p1{
						white-space: nowrap;
						overflow: hidden;
						word-break:keep-all;
						text-overflow:ellipsis;
						font-size: 0.875rem;
						color: #282828;
					}
					.p2{
						font-size: 0.8125rem;
						color: #fc4141;
					}
				}
			}
		}
		.product{
			width: 100%;
			margin-top: 0.4375rem;
			p{
				width: 100%;
				line-height: 3.125rem;
				background-color: white;
				color: #282828;
			}
			.content{
				padding-left: 0.625rem;
				overflow: hidden;
				text-align: left;
			}
		}
		.productoptions{
			width: 100%;
			line-height: 3.125rem;
			overflow: hidden;
			span{
				font-size: 0.875rem;
			}
			.s1,.s2,.s3{
				float: left;
			}
			.s1{
				margin-left: 5%;
				color: #82848f;
			}
			.s2{
				margin-left: 0.1875rem;
			}
			.s2,.s3{
				color: #282828;
			}
			.s4{
				float: right;
				color: #82848f;
				margin-right: 0.75rem;
			}
		}
	}
</style>
