<template>
	<!-- 这是首页首发新品 -->
	<div class="firstround">
		<Homeitem :infoname="indexdata.info.firstInfo" :url="url">首发新品</Homeitem>
		<div class="content">
			<ul>
				<router-link tag="li" :to="{path:'/productdetails/'+s.id}" v-for="s in indexdata.info.firstList" :key="s.id">
					<img :src="s.image+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
					<p class="p1">{{s.store_name}}</p>
					<p class="p2">￥{{s.price}}</p>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import Homeitem from "./Homeitem.vue"
	export default{
		components:{
			Homeitem
		},
		props:{
			indexdata:Object
		},
		data(){
			return {
				url:"combination/3"
			}
		},
		watch:{
		}
	}
</script>

<style lang="less" scoped="scoped">
	.firstround{
		width: 100%;
		margin-top: 0.4375rem;
		background-color: white;
		.content{
			width: 100%;
			overflow-x: auto;
			ul{
				width: 340%;
				overflow: hidden;
				margin-top: 0.4375rem;
				li{
					width: 9.45%;
					border: 1px solid #eee;
					border-radius: 7px;
					margin-left: 0.5%;
					overflow: hidden;
					padding-bottom: 0.4375rem;
					float: left;
					img{
						height: 7.5rem;
						width: 100%;
					}
					.p1{
						width: 90%;
						margin-left: 3%;
						font-size: 1rem;
						color: #333;
						white-space: nowrap;
						overflow: hidden;
						word-break:keep-all;
						text-overflow:ellipsis;
					}
					.p2{
						font-size: 0.75rem;
						width: 100%;
						font-weight: bold;
						color: #fc4141;
						text-align: center;
						line-height: 1.25rem;
					}
				}
			}
		}
	}
</style>
