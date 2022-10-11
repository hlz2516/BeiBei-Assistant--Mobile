<template>
	<view class="container">
		<view class="title-login">
			<text>登录</text>
		</view>
		<view>
			<text>新用户将自动注册</text>
		</view>
		<view></view>
		<view>
			<uni-forms :model="formData" :rules="rules" ref="form">
				<uni-forms-item label="用户名" name="username">
					<uni-easyinput type="text" v-model="formData.username" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn-login" @click="submitForm">登录</button>
		</view>
	</view>
</template>

<script>
	import {request} from '../../common/request.js';
	
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: ''
				},
				rules: {
					username: {
						rules: [{
								required: true,
								errorMessage: '请填写用户名'
							},
							{
								minLength: 3,
								maxLength: 12,
								errorMessage: '{label}长度必须在 {minLength} 到 {maxLength} 个字符',
							}
						],
						label: '用户名',
						validateTrigger: 'submit'
					},
					password: {
						rules: [{
								required: true,
								errorMessage: '请填写密码'
							},
							{
								pattern: '^[a-zA-Z]\\w{5,17}$',
								errorMessage: '{label}必须以字母开头，长度在6-18之间，只能包含字符、数字和下划线',
							}
						],
						label: '密码',
						validateTrigger: 'submit'
					}
				}
			}
		},
		methods: {
			submitForm() {
				this.$refs.form.validate().then(res => {
					// console.log('表单数据信息：', res.username, res.password);
					request({
						url:'/login',
						method:'POST',
						data:{
							name:res.username,
							password:res.password
						}
					})
					.then(res=>{
						//把返回的token存储在storage中
						uni.setStorageSync('token',res.token);
						//将token的payload字段解码并存储
						let payload = res.token.split('.')[1];
						let msg = new Buffer(payload,'base64').toString('utf8');
						let msgObj = JSON.parse(msg);
						uni.setStorageSync('userId',msgObj.id);
						uni.setStorageSync('name',msgObj.name);
						
						//跳转主页面
						uni.switchTab({
							url:'/pages/index/index'
						});
					})
					.catch(err=>{
						console.log(err);
					})
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 750rpx;
		height: 100vh;
		padding: 0 16rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		text-align: center;
		background-color: $main-background-color;

		>view {
			margin: 20rpx 0;
		}

		.title-login {
			font-size: 40rpx;
			font-weight: 600;
			letter-spacing: 20rpx;
		}

		.btn-login {
			margin-top: 60rpx;
			background-color: $uni-color-primary;
			color: $uni-text-color-inverse;
		}
	}
</style>
