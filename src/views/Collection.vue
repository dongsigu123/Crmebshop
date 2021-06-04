<template>
	<!-- 这是用户商品收藏页面 -->
	<div class="collection">
		<Return2></Return2>
		<div class="content">
			<div class="hz" v-for="i in collection" :key="i.pid">
				<div class="left">
					<img :src="i.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
				</div>
				<div class="right">
					<p class="p1">{{i.store_name}}</p>
					<p class="p2">{{i.price}}<span @click="btn(i.pid)">删除</span></p>
				</div>
			</div>
		</div>
		<Kongdata :shopdatas="shopdatas" v-show="!isfoot"></Kongdata>
	</div>
</template>

<script>
	import Return2 from "../components/Return2.vue"
	import Kongdata from "../components/Kongdata.vue"
	import {mapState} from "vuex"
	export default{
		components:{
			Return2,
			Kongdata
		},
		data(){
			return {
				collection:null,
				isfoot:true,
				shopdatas:null
			}
		},
		computed:{
			...mapState({
				token:"token"
			})
		},
		methods:{
			btn(v){
				console.log(v)
				this.$axios({
					method:"post",
					url:"collect/del",
					headers: {
					    'Authori-zation':'Bearer '+ this.token
					},
					data:{
						category: "product",
						id: v
					}
				}).then(()=>{
					this.$toast("删除收藏成功");
					this.load();
				})
			},
			load(){
				this.$axios.get("/collect/user?page=1&limit=20").then(data=>{
					this.collection=data.data.data
					// console.log(this.collection);
					if(this.collection.length==0){
						this.isfoot=false;
						this.$axios.get("/product/hot?page=1&limit=20").then(data=>{
							this.shopdatas=data.data.data;
							// console.log(this.shopdatas);
						})
					}else{
						this.isfoot=true;
					}
				})
			}
		},
		created() {
			this.load();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.collection{
		width: 100%;
		.content{
			width: 100%;
			background-color: white;
			.hz{
				width: 95%;
				margin: 0 auto;
				padding: 0.5625rem 0;
				border-bottom: 1px solid #eee;
				overflow: hidden;
				.left{
					float: left;
					width: 22%;
					img{
						width: 4.0625rem;
						height: 4.0625rem;
						border-radius: 3px;
						float: left;
						vertical-align: bottom;
					}
				}
				.right{
					width: 77%;
					float: left;
					.p1{
						line-height: 1.875rem;
						font-size: 0.875rem;
						color: #282828;
						text-align: left;
						white-space: nowrap;
						overflow: hidden;
						margin-bottom: 0.9375rem;
						word-break:keep-all;
						text-overflow:ellipsis;
					}
					.p2{
						text-align: left;
						font-size: 0.875rem;
						color: #fc4141;
						overflow: hidden;
						span{
							float: right;
							border: 1px solid #999;
							padding: 0 0.4375rem;
							border-radius: 0.125rem;
							color: #282828;
						}
					}
				}
			}
		}
	}
</style>
