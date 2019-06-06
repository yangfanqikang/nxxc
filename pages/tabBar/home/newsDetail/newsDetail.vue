<template>
	<view id="news-detail">
		<view id="news-title">
			{{post_title}}
		</view>
		<view id="news_info">
			<text>来源:{{post_source}}</text>
			<text>时间:{{post_date}}</text>
		</view>
		<image :src="thumb" mode="widthFix" id="news-img"></image>
		 <rich-text :nodes="content"></rich-text>
		 <view id="news-company">宁夏彩票</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				post_date: '',
				post_source: '',
				post_title: '',
				thumb:''
			}
		},
		methods: {
			
		},
		onLoad(options) {
			var that = this;
			// that.data = JSON.parse(options.post_content);
			console.log(options.id);
			var id = options.id;
			uni.request({
				url: 'https://admin.shangchaocai.cn/index.php?g=portal&m=index&a=getOneinfo&id=' + id,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					that.content = res.data[0].post_content;
					that.post_date = res.data[0].post_date;
					that.post_source = res.data[0].post_source;
					that.post_title = res.data[0].post_title;
					that.thumb = "https://admin.shangchaocai.cn/data/upload/" + JSON.parse(res.data[0].smeta).thumb;
					
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
</script>

<style lang="scss">
#news-detail{
	padding: 30upx;
	line-height: 1.5em;
	#news-title{
		font-size: 32upx;
		color: #111;
	}
	#news_info{
		display: flex;
		justify-content: space-between;
		font-size: 28upx;
		color: #999;
		margin-bottom: 15upx;
	}
	#news-img{
		width: 100%;
		margin: 0 auto;
	}
	#news-company{
		font-size: 24upx;
		color: #999;
		text-align: center;
	}
}
</style>
