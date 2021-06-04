<template>
	<!-- 这是分类页面 -->
	<div class="category">
		<van-search v-model="value" @keydown.enter="ssbtn" shape="round" placeholder="搜索商品信息"/>
		<div class="content">
			<van-index-bar :index-list="categorylist">
				<template v-for="o in category">
					<div class="item" :key="o.id">
						<van-index-anchor :index="o.cate_name">
						</van-index-anchor>
					<div class="child">
						<router-link tag="p" :to="'/shopsearch?id='+c.id+'&name='+c.cate_name" v-for="c in o.children" :key="c.id">
							<van-image :src="c.pic+'?imageView=1&type=webp&thumbnail=246x0'"/>
							<span>{{c.cate_name}}</span>
						</router-link>
					</div>
					</div>
				</template>
			</van-index-bar>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				value:"",
				category:{},
				active: 0,
				categorylist: []
			}
		},
		methods:{
			ssbtn(){//搜索btn
				if(this.value==""){
					this.$toast("不能为空");
					return;
				}
				this.$router.push("/shopsearch?id=0&name=默认&s="+this.value);
			},
		},
		created() {
			this.$axios.get("/category").then(data=>{
				this.category=data.data.data;
				this.categorylist=this.category.map(dd=>{
					return dd.cate_name
				});
				// console.log(this.category);
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.category{
		width: 100%;
		.van-search{
			width: 100%;
			height: 3.125rem;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 2;
		}
		.content{
			width: 100%;
			margin-top: 3.125rem;
			overflow: hidden;
			.van-index-bar{
				/deep/ .van-index-bar__sidebar{
					left:0px;
					text-align: left;
					top:3.2rem;
					width: 5.625rem;
					transform: translateY(0px);
					background-color: #f5f5f5;
					height: 100%;
					span{
						height:2.5rem;
						line-height: 2.5rem;
						font-size: 0.875rem;
					}
					.van-index-bar__index--active{
						border-left:2px solid red;
						background-color: white;
					}
				}
			} 
			.item{
				padding-left:20vw;
				background-color: white;
				.child{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					p{
						width:33%;
						margin-top: 0.4375rem;
						div{
							width: 60%;
							margin:  0 auto;
							border-radius: 50%;
							overflow: hidden;
						}
						span{
							display: block;
							font-size: 0.75rem;
						}
					}
				}
				/deep/ .van-index-anchor{
					color: #282828;
					font-size: 0.875rem;
					font-weight: bold;
					position: relative;
					padding: 0.4375rem 0;
					&::before{
						content: "";
						width: 2.5rem;
						height: 1px;
						position: absolute;
						background-color: #b6b6b6;
						left: 30%;
						top: 50%;
						transform: translateX(-50%);
					}
					&::after{
						content: "";
						width: 2.5rem;
						height: 1px;
						position: absolute;
						background-color: #b6b6b6;
						right: 30%;
						top: 50%;
						transform: translateX(50%);
					}
				}
			}
		}
	}
</style>