<template>
	<!-- 这是新闻简报页面 -->
	<div class="newsbulletin">
		<Return2></Return2>
		<div class="top">
			<p>{{shopdata[0].title}}</p>
		</div>
	</div>
</template>
<script>
	import Return2 from "../components/Return2.vue"
	export default{
		components:{
			Return2
		},
		data(){
			return {
				shopdata:{}
			}
		},
		created() {
			this.$axios.get("/article/category/list").then(data=>{
				this.shopdata=data.data.data;
				console.log(this.shopdata);
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.newsbulletin{
		width: 100%;
		.top{
			width: 100%;
			line-height: 2.8125rem;
			p{
				color: #333;
				position: relative;
				&::after{
					content: "";
					width: 0.9375rem;
					height: 2px;
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					background-color: rgb(233, 51, 35);
				}
			}
		}
	}
</style>