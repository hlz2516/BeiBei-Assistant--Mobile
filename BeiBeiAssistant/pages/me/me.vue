<template>
	<view class="container">
		<view class="info-container">
			<view class="avatar">
				<image src="../../static/images/person.png" mode="aspectFit"></image>
			</view>
			<text>{{username}}</text>
		</view>
		<button @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:''
			}
		},
		methods: {
			logout(){
				uni.removeStorageSync('token');
				uni.removeStorageSync('userId');
				uni.removeStorageSync('name');
				uni.redirectTo({
					url:'/pages/login/login'
				});
			}
		},
		onLoad() {
			this.username = uni.getStorageSync('name') || '';
		}
	}
</script>

<style lang="scss" scoped>
	
.container{
	width: 750rpx;
	box-sizing: border-box;
	padding: 0 16rpx;
}

.info-container{
	height: 120rpx;
	padding: 20rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	
	.avatar{
		width: 80rpx;
		height: 80rpx;
		border: 2px solid black;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		
		image{
			width: 64rpx;
			height: 64rpx;
		}
	}
	
	text{
		margin-left: 20rpx;
	}
}
</style>
