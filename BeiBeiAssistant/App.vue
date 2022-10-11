<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//取token,根据token是否存在跳转不同页面
			let token = uni.getStorageSync('token');
			if(token){
				uni.switchTab({
					url:'/pages/index/index'
				});
			}else{
				uni.redirectTo({
					url:'/pages/login/login'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
