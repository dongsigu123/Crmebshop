<template>
	<!-- 这是首页 -->
	<div class="home" v-if="indexdata">
		<div class="top">
			<img src="../assets/logo.png" alt="">
			<router-link tag="a" :to="{path:'/search'}"><span class="iconfont icon-sousuo"></span>搜索商品</router-link>
		</div>
		<Banner :images="indexdata.banner"></Banner>
		<Homenav :indexdata="indexdata"></Homenav>
		<Newsbulletin :indexdata="indexdata"></Newsbulletin>
		<Qselect :indexdata="indexdata"></Qselect>
		<Boutique :indexdata="indexdata"></Boutique>
		<div class="hotlist">
			<div class="hottop">
				<p class="p1"><span>热门榜单</span>根据销量、搜索、好评等综合得出</p>
				<router-link tag="p" to="/combination/2" class="p2">更多<span class="iconfont icon-right"></span></router-link>
			</div>
			<div class="bottom">
				<ul>
					<router-link tag="li" :to="{path:'/productdetails/'+s.id}" v-for="s in indexdata.likeInfo" :key="s.id">
						<img :src="s.image" alt="">
						<p class="p1">{{s.store_name}}</p>
						<p class="p2">￥{{s.price}}</p>
					</router-link>
				</ul>
			</div>
		</div>
		<Firstround :indexdata="indexdata"></Firstround>
		<Promotional :indexdata="indexdata"></Promotional>
	</div>
</template>

<script>
import Banner from "../components/Banner.vue"
import Qselect from "../components/Qselect.vue"
import Boutique from "../components/Boutique.vue"
import Homenav from "../components/Homenav.vue"
import Newsbulletin from "../components/Newsbulletin.vue"
import Firstround from "../components/Firstround.vue"
import Promotional from "../components/Promotional.vue"
export default {
	name: 'Home',
	components: {
		Banner,
		Qselect,
		Boutique,
		Homenav,
		Newsbulletin,
		Firstround,
		Promotional
	},
	data(){
		return {
			indexdata:null
		}
	},
	created() {
		this.$axios.get("/index").then(data=>{
			this.indexdata=data.data.data;
			// console.log(this.indexdata);
		})
	}
}
</script>

<style lang="less" scoped="scoped">
	.home{
		width: 100%;
		.top{
			width: 100%;
			background-color: white;
			height: 3.125rem;
			line-height: 3.125rem;
			text-align: left;
			word-break:keep-all;
			text-overflow:ellipsis;
			white-space: nowrap;
			img{
				width: 15%;
				margin-left: 7.5%;
				vertical-align: middle;
			}
			a{
				width: 65%;
				margin-left: 5%;
				color: #bbb;
				background-color: #f7f7f7;
				text-decoration: none;
				border-radius: 0.9375rem;
				display: inline-block;
				height: 2rem;
				line-height: 2rem;
				font-size: 1rem;
				span{
					margin: 0 0.4375rem 0 0.625rem;
					font-size: 1.125rem;
					font-weight: bold;
				}
			}
		}
		.hotlist{
			width: 100%;
			background-image: url(../assets/rmbd.png);
			background-repeat: no-repeat;
			background-size: 100% 50%;
			background-color: white;
			margin-top: 0.75rem;
			.hottop{
				width: 100%;
				height: 2.5rem;
				line-height: 2.5rem;
				overflow: hidden;
				.p1{
					float: left;
					margin-left: 5%;
					font-size: 0.875rem;
					color: white;
					span{
						font-size: 1.125rem;
						margin-right: 0.4375rem;
					}
				}
				.p2{
					float: right;
					font-size: 0.875rem;
					color: white;
					margin-right: 5%;
					span{
						font-size: 0.875rem;
					}
				}
			}
			.bottom{
				width: 90%;
				margin: 0 auto;
				ul{
					width: 100%;
					overflow: hidden;
					background-color: white;
					border-radius: 15px;
					padding-top: 0.625rem;
					padding-bottom: 0.9375rem;
					box-shadow: 2px 2px 3px #eee;
					li{
						width: 30%;
						margin-left: 2.5%;
						float: left;
						text-align: left;
						img{
							border-radius: 7px;
							width: 100%;
							height: 6.875rem;
						}
						.p1{
							width: 98%;
							font-size: 0.875rem;
							color: #222;
							white-space: nowrap;
							overflow: hidden;
							word-break:keep-all;
							text-overflow:ellipsis;
						}
						.p2{
							color: #fc4141;
							font-size: 0.875rem;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style>