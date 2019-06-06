<template>
	<view>
		<view class="uni-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					 indicator-color="rgba(255,255,255,.5)" indicator-active-color="#FFFFFF" circular="true">
						<swiper-item v-for="(img, index) in imgList" :key="index">
							<view class="swiper-item">
								<image :src="img" mode="widthFix"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="notice">
				<image src="../../../static/message.png" mode=""></image>
				<text>关于调整高频快开和竞猜彩票游戏规则的通知</text>
			</view>
		</view>
		<view class="nav">
			<navigator url="ssqBet/ssqBet" class="ssq">
				<image src="../../../static/ssq.png" />
				<text class="h3">双色球</text>
				<text class="redClass">奖池：6亿5千万</text>
				<image src="../../../static/HOT.png" class="hotImg" />
			</navigator>
			<navigator url="fc3dBet/fc3dBet">
				<image src="../../../static/3d.png" />
				<text class="h3">福彩3D</text>
				<text>每天21:15开奖</text>
			</navigator>
			<navigator url="k3Bet/k3Bet">
				<image src="../../../static/k3.png" />
				<text class="h3">快3</text>
				<text>20分钟一期</text>
			</navigator>
			<navigator url="qlcBet/qlcBet" class="qlc">

				<image src="../../../static/qlc.png" />
				<text class="h3">七乐彩</text>
				<text class="redClass">奖池：6亿5千万</text>
				<text class="prizeMark">今日</br>开奖</text>
			</navigator>
			<navigator url="">
				<image src="../../../static/wait.png" />
			</navigator>
			<navigator url="">
				<image src="../../../static/wait.png" />
			</navigator>
		</view>
		<view class="divide" style="background-color: #F5F7FB;height:15px"></view>
		<view class="try">
			<image src="../../../static/pic_try.png" />
			<view>
				<view ref="ball" class="ball">
					<view v-for="(redBall,index) in redBalls" :key="index">
						{{redBall}}
					</view>
					<view class="blueBall">{{blueBall}}</view>
					<view id="random1" @click="random1">
						<image src="../../../static/qiehuanyonghu.png" />
					</view>
				</view>
				<view class="prizeTime">
					<text>每周 二. 四. 日 21:15开奖</text>
					<input name="" id="bet" value="投注" @click="bet"/>
				</view>
			</view>
		</view>
		<view class="divide" style="background-color: #F5F7FB;height:15px"></view>
		<view class="zcNews">
			<text>众彩资讯</text>
			<view class="uni-list">
				<navigator class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key" :url="value.url + '?id='+value.id">
					<view class="uni-media-list uni-pull-right">
						<view class="uni-media-list-logo">
							<image :src="value.smeta"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{value.post_title}}</view>
							<view class="uni-media-list-body-df">
								<view class="uni-media-list-text-top uni-ellipsis">{{value.post_source}}</view>
								<view class="uni-media-list-text-top uni-ellipsis">{{value.post_date}}</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				backgroundColor: '#FFFFFF',
				autoplay: true,
				interval: 2000,
				duration: 500,
				imgList: ['https://upload-images.jianshu.io/upload_images/3631181-c2ba016a35e2cb54.png?imageMogr2/auto-orient/',
					'https://upload-images.jianshu.io/upload_images/3631181-ebef950eed65bb44.png?imageMogr2/auto-orient/',
					'https://upload-images.jianshu.io/upload_images/3631181-bd6df38e01fafccf.png?imageMogr2/auto-orient/'
				],
				list: [],
				blueBall:'',
				redBalls:[],
				array11:[],
				array22:[],
				info:{},
				data:[]
			}
		},
		methods: {
			random1(){
				var that = this;
				var array1 = new Array(33).fill(0).map((v,i)=>i+1).sort(()=>0.5 - Math.random()).filter((v,i)=>i<6).sort(function(a,b){return a-b});
				var array2 = new Array(16).fill(0).map((v,i)=>i+1).sort(()=>0.5 - Math.random()).filter((v,i)=>i<1).sort(function(a,b){return a-b});
				that.array11 = array1.map(function(item){if(item<10){return '0'+item}else{return item+""}});
				that.array22 = array2.map(function(item){if(item<10){return '0'+item}else{return item+""}});
				that.blueBall=that.array22[0];
				that.redBalls=that.array11;
			},
			bet(){
				var that = this;
				if(that.array11.length>0 && that.array22.length>0){
  					//修正订单格式
  					that.data = [];
  					var sumArr="ds-";
					that.info.shape="单式";
					var allBall=null;
					allBall=sumArr+that.array11+"|"+that.array22 + '-1';
					allBall=allBall.replace("-,","-").replace(",|,","|").replace(",-","-");
					that.info.val=allBall;
					that.info.zhu=1;
					that.info.money=2;
					that.data.push(JSON.stringify(that.info));
					uni.setStorage({
						key: 'message',
						data: JSON.stringify(that.data),
						success: function () {
							uni.setStorage({
								key: 'pid',
								data: '1',
								success: function () {
									uni.request({
										url: 'https://h5.shangchaocai.cn/h5/getCurrentTerm',
										method: 'POST',
										data: {
											type:1
										},
										success: res => {
											var currentTerm = res.data.term_no;
											var currentDate = res.data.stop_sale_time;
											uni.navigateTo({
												 url: 'order/order?currentTerm='+currentTerm+'&currentDate='+currentDate
											})
										},
										fail: () => {},
										complete: () => {}
									});
									
								}
							});
						}
					});
  				}else{
  					alert("投注格式有问题")
  				}
			}
		},
		onShow(){
			uni.clearStorage();
		},
		onLoad() {
			var that = this;
			that.data = [];
			uni.clearStorage();
			// that.randomFun()
			// that.blueBall=that.array22[0];
			// that.redBalls=that.array11;
			that.random1();
			console.log(that.array11);
			uni.request({
				// url: 'https://admin.shangchaocai.cn/index.php?g=portal&m=index&a=getinfo&id=3',
				url: 'https://www.easy-mock.com/mock/5c90925ed3d19731516d2dec/www.zouzhirui.xyz/news',
				type: 'GET',
				success: (res) => {
					var imgSrc = [];
					for (var i = 0; i < res.data.length; i++) {
							var thumbTem = 'https://admin.shangchaocai.cn/data/upload/'+ JSON.parse(res.data[i].smeta).thumb
							res.data[i].smeta = thumbTem;
							res.data[i].url='newsDetail/newsDetail'
					}
					this.list = res.data;
				},
				
			})
		}
	}
</script>

<style lang="scss">
	.swiper-item {
		image {
			width: 100%;
		}
	}
	.uni-media-list{
		padding: 40upx 30upx;
	}
.uni-media-list-body{
	height: 135upx;
	.uni-media-list-text-top{
		color: #333333;
		font-size: 28upx
	}
}
.uni-media-list-logo{
	width: 242upx;
	height: 135upx;
}
.uni-media-list-body-df{
	display: flex;
	.uni-media-list-text-top{
		color: #999;
		font-size: 24upx;
	}
	.uni-media-list-text-top:nth-child(1){
		width: 230upx;
		margin-right: 5upx;
	}
}
	.notice {
		position: absolute;
		height: 68upx;
		width: 687upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 0 0.08rem 0 rgba(0, 0, 0, 0.18);
		border-radius: 5upx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		z-index: 1000;
		left: 50%;
		transform: translate(-50%, -50%);

		image {
			width: 28upx;
			height: 28upx;
			margin-left: 16upx;
			margin-right: 16upx;
		}

		text {
			line-height: 68upx;
			font-size: 12px;
			color: rgba(51, 51, 51, 1);
		}
	}

	.nav {
		display: flex;
		flex-flow: row wrap;
		margin-top: 50upx;
		background-color: #fff;
		margin-bottom: 15upx;

		navigator {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			box-sizing: border-box;
			padding-top: 15upx;
			width: 33.33%;
			text-align: center;
			height: 227upx;
			border-right: 1px solid #DDDDDD;
			border-bottom: 1px solid #DDDDDD;
		}

		navigator:nth-child(3) {
			border-right: none;
		}

		navigator:nth-child(6) {
			border-right: none;
		}

		navigator:nth-child(n+4) {
			border-bottom: none;
		}

		navigator>image {
			width: 105upx;
			height: 105upx;
		}

		navigator>text.h3 {
			font-size: 14px;
		}

		navigator>text {
			font-size: 13px;
			color: #666666;
		}

		.redClass {
			color: #ff0000;
		}

		navigator:last-child>image {
			width: 125upx;
			height: 165upx;
			margin-top: 15upx;
		}

		navigator:nth-last-child(2)>image {
			width: 125upx;
			height: 165upx;
			margin-top: 15upx;
		}

		.ssq,
		.qlc {
			position: relative;
		}

		.hotImg {
			position: absolute;
			top: 0;
			right: 7upx;
			width: 45upx;
			height: 50upx;
		}

		.prizeMark {
			position: absolute;
			top: 7rem;
			right: 7rem;
			color: #ff0000;
			font-size: 13upx;
		}
	}

	.try {
		height: 260upx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		>image {
			width: 173upx;
			height: 182upx;
			margin-left: 12upx;
		}
		
		.ball {
			display: flex;
			flex-flow: row nowrap;
		}
		
		.ball>view {
			width: 44upx;
			height: 44upx;
			border: 1px solid #ff000;
			background-color: #FFB8B8;
			text-align: center;
			line-height: 44upx;
			border-radius: 50%;
			margin-right: 21upx;
			font-size: 12px;
			color: #c40000;
			border: 1px solid #ff0000;
		}
		
		.ball>view:last-child>image {
			width: 44upx;
			height: 44upx;
		}
		
		.ball>view:last-child {
			border: none;
			background: none;
		}
		
		.prizeTime {
			display: flex;
			margin-top: 44upx;
			margin-left: 35upx;
		}
		
		.prizeTime>text {
			line-height: 54upx;
			font-size: 14px;
			color: #999;
		}
		
		#bet {
			width: 135upx;
			height: 54upx;
			background-color: #E73F3F;
			line-height: 54upx;
			text-align: center;
			font-size: 14px;
			border: none;
			border-radius: 28upx;
			color: #fff;
			margin-left:31upx;
		}
		
		.ball>view.blueBall {
			border: 1px solid #00AAFD;
			background-color: #B0E5FF;
			color: #00ABFF;
		}
	}
	.zcNews{
		>text{
			color: #DA1835;font-size: 30upx;position: relative;padding-left: 15upx;margin-bottom: 20upx;margin-left: 30upx;
			&::before{
				content: '';width: 7upx;height: 30upx;background-color: #DA1835;position: absolute;top: 4upx;left: 0;
			}
		}
	}
	
</style>
