<template>
  <div class="login">
		<Return2></Return2>
		<div class="logo">
			<img src="../assets/log.png" alt="">
		</div>
        <van-tabs>
            <van-tab title="密码登录">
                <van-form @submit="doLogin">
                        <!-- 
                            rules表单验证  required 验证规则 不能为空 message验证失败的提示信息 
                            name 就是输入框表单名称
                        -->
                        <van-field
                            v-model="username"
                            name="account"
                            label="账号"
                            left-icon="user-o"
                            placeholder="请输入账号"
                            :rules="[{ required: true, message: '请填写账号' }]"
                        />
                        <van-field
                            v-model="password"
                            left-icon="lock"
                            name="password"
                            type="password"
                            label="密码"
                            placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <div style="margin: 16px;">
                            <van-button round block type="info" native-type="submit">登录</van-button>
                        </div>
                </van-form>
            </van-tab>
            <van-tab title="手机登录">
                <van-form @submit="mobileLogin">
                        <!-- 
                            rules表单验证  required 验证规则 不能为空 message验证失败的提示信息 
                            name 就是输入框表单名称
                        -->
                        <van-field
                            v-model="phone"
                            name="phone"
                            label="手机号"
                            left-icon="phone-o"
                            placeholder="请输入手机号"
                            :rules="[{ required: true, message: '请输入正确的手机号' ,pattern:/^1[345678]\d{9}$/}]"
                        />
                        <van-field
                            v-model="captcha"
                            left-icon="comment-o"
                            name="captcha"
                            type="text"
                            label="验证码"
                            placeholder="输入验证码"
                            :rules="[{ required: true, message: '请填写验证码' }]"
                        >
                            <template v-slot:button>
                                <van-button v-if="showBtn" type="warning" @click="send" size="small" native-type="button">获取验证码</van-button>
                                <van-badge v-if="!showBtn">
                                    <template #content>
                                    <span>{{countDown}}</span>
                                    </template>
                                </van-badge>
                            </template>
                        </van-field>
                        <div style="margin: 16px;">
                            <van-button round block type="info" native-type="submit">登录</van-button>
                        </div>
                </van-form>
            </van-tab>
        </van-tabs>
        <!-- <van-icon :name="`${publicPath}/image/1.png`"></van-icon>
        <van-image :src="`${publicPath}/image/2.png`"/> -->
  </div>
</template>

<script>
	import Return2 from "../components/Return2.vue"
export default {
	components:{
		Return2
	},
  data(){
      return {
          username:'',
          password:'',
          key:'',
          phone:'',
          captcha:'',
          showBtn:true,
          countDown:60,
          publicPath:process.env.BASE_URL //获取当前环境变量里面 Base_URL public路径下.
      }
  },
  created(){
      this.axios.get('/verify_code').then(d=>{
          this.key=d.data.data.key
		  // console.log(d)
      });
  },
  methods:{
      doLogin(values){//密码登录
        //name=>value
        // console.log(values);
        //去服务器端登录
        this.$axios.post('/login',values).then(d=>{
			// console.log(d)
            if(d.data.status!=200){
                // this.$toast("账号或密码错误登录!失败");
                this.$dialog.alert({
                    title:"登录失败",
                    message:"账号或密码错误登录!失败"
                });
                return ;
            }
			document.cookie=`token=${d.data.data.token}`;
			localStorage.setItem("userinfo",d.data.data.token);
            this.$store.commit('setToken',d.data.data.token);
            this.$store.dispatch('getUser');
            setTimeout(()=>{
				// console.log(this.$route.query.url)
				if(this.$route.query.url==1){
					this.$router.go(-1);
				}else if(this.$route.query.url==2){
					this.$router.push('/shoppingcart');
				}else if(this.$route.query.url==3){
					this.$router.push('/mine');
				}
				this.$toast("登录成功");
            },500);
        })
      },
      send(){//发送验证码
          if(this.phone){
              this.axios.post('/register/verify',{
                key: this.key,
                phone: this.phone,
                type: "login"
              }).then(d=>{
				  console.log(d)
                  if(d.data.status==200){
                      this.showBtn=false;
                      this.$toast("验证码发送成功!请输入验证码!");
                  }else{
                    this.$dialog.alert({
                        title:"发送失败",
                        message:d.data.msg
                    });
                  }
              });
          }else{
              this.$dialog.alert({
                  title:"发送失败",
                  message:"手机号不能为空..."
              });
          }
      },
      mobileLogin(values){//手机登录
          //验证....
          this.axios.post('/login/mobile',values).then(d=>{
            if(d.data.status==200){
                this.$toast("登录成功!");
                this.$store.commit('setToken',d.data.data.token);
                document.cookie=`token=${d.data.data.token}`
                this.$store.dispatch('getUser');
                setTimeout(()=>{
                   if(this.$route.query.url==1){
                   	this.$router.go(-1);
                   }else if(this.$route.query.url==2){
                   	this.$router.push('/shoppingcart');
                   }else if(this.$route.query.url==3){
                   	this.$router.push('/mine');
                   }
					this.$toast("登录成功");
                },500)
            }else{
                this.$dialog.alert({
                    title:"登录失败!",
                    message:d.data.msg
                });
            }
          });
      }
  }
}
</script>
<style scoped lang="less">
	.login{
		width: 100%;
		height: 100vh;
		background-image: linear-gradient(180deg,#eb5447 0,#ff8e3b);
		position: relative;
		.logo{
			position: absolute;
			width: 5.3125rem;
			height: 5.3125rem;
			left: 50%;
			top: 6%;
			transform: translateX(-50%);
			border-radius: 50%;
			border: 2px solid hsla(0,0%,100%,.8);
			img{
				vertical-align: bottom;
			}
		}
		.van-tabs{
			top: 46%;
			width: 83%;
			left: 50%;
			position: absolute;
			border-radius: 5px;
			background-color: white;
			transform: translate(-50%,-50%);
			padding-bottom: 0.5625rem;
			/deep/ .van-tabs__wrap{
				border-radius: 5px 5px 0 0;
			}
		}
		.van-button--info{
			background: linear-gradient(90deg,#f35447 0,#ff8e3c);
			border: none;
		}
		.van-button--warning{
			background-color: #f35446;
			border-radius: 1.25rem;
			border: none;
		}
		/deep/ .van-field__label{
			margin-right: 0;
			width: 4.2rem;
		}
	}
</style>

