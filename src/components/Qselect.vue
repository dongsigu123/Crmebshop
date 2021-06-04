<template>
	<!-- 这是首页的快速选择组件 -->
	<div class="qselect" v-if="indexdata">
		<Homeitem :infoname="indexdata.info.fastInfo" :url="url">快速选择</Homeitem>
		<div class="content">
			<ul>
				<router-link tag="li" :to="'/shopsearch?id='+s.id+'&name='+s.cate_name" v-for="s in indexdata.info.fastList" :key="s.id">
					<img :src="s.pic+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
					<p>{{s.cate_name}}</p>
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
				fastInfo:"",
				fastList:[],
				url:"category"
			}
		},
		watch:{
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped="scoped">
	.qselect{
		width: 100%;
		background-color: white;
		.content{
			width: 100%;
			overflow-x: auto;
			&::-webkit-scrollbar {
				display: none;
			}
			ul{
				width: 280%;
				overflow: hidden;
				li{
					width: 9.4%;
					float: left;
					font-size: 0.875rem;
					color: #282828;
					text-align: center;
					margin-left: 0.5%;
					padding-bottom: 0.3125rem;
					border-bottom: 1px solid #000;
					&:nth-child(3n-2){
						border-bottom-color: #47b479;
					}
					&:nth-child(3n-1){
						border-bottom-color: #579afe;
					}
					&:nth-child(3n){
						border-bottom-color: #ff6960;
					}
				}
			}
		}
	}
</style>
