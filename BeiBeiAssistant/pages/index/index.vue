<template>
	<view class="content">
		<view hover-class="hover"></view>
		<view hover-class="hover"></view>
		<view hover-class="hover"></view>
		<view hover-class="hover"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token');
			if(!token){
				uni.redirectTo({
					url:'/pages/login/login'
				});
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 40rpx auto;
		width: 90vw;
		height: 90vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 30rpx;
		
		> view{
			width: 100%;
			height: 100%;
			border: 1px solid $uni-border-color;
			border-radius: 8rpx;
		}
	}
	
	.hover{
		box-shadow: 8rpx 8rpx $uni-bg-color-grey;
		transform: scale(1.05,1.05);
	}
</style>
