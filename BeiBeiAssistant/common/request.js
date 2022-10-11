export const request = (options) => {

	let BASE_URL_ = "http://localhost:9000";

	return new Promise((resolve,reject) => {
		uni.request({
			url: BASE_URL_ + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				//401表示过期的无效的token
				if(res.data.status === 401){
					uni.removeStorageSync('token');
					uni.removeStorageSync('userid');
					uni.removeStorageSync('name');
					uni.redirectTo({
						url:'/pages/login/login'
					});
					resolve(res.data);
				}
				if (res.data.status !== 200) {
					uni.showToast({
						title: `获取数据失败！错误状态码:${res.data.status}`,
						icon: "error"
					})
					reject(res);
				}
				resolve(res.data);
			},
			fail: (err) => {
				uni.showToast({
					title: '发送请求失败！',
					icon: 'error'
				})
				reject(err);
			}
		})

	});
}
