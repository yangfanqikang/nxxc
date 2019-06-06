<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-show="current === 0">
				<zzrList :items="ssqList"></zzrList>
			</view>
			<view v-show="current === 1">
				<zzr3dList :items="fc3dList"></zzr3dList>
				<!-- <zzrList :items="fc3dList"></zzrList> -->
			</view>
			<view v-show="current === 2">
				<zzrList :items="qlcList"></zzrList>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
    import zzrList from '@/components/zzr-list.vue'
    import zzr3dList from '@/components/zzr-list-3d.vue'
	export default {
		components: {
			uniSegmentedControl,
			zzrList,
			zzr3dList
		},
		data() {
			return {
				items: [
					'双色球',
					'福彩3d',
					'七乐彩'
				],
				styles: [{
					value: 'button',
					text: '按钮',
					checked: true
				}, {
					value: 'text',
					text: '文字'
				}],
				colors: [
					'#007aff',
					'#4cd964',
					'#dd524d'
				],
				current: 0,
				colorIndex: 0,
				activeColor: '#E73F3F',
				styleType: 'button',
				ssqList: [],
				fc3dList: [],
				qlcList: [],
			}
		},
		onLoad: function () {
			var _self = this;
			uni.request({
				url: 'https://h5.shangchaocai.cn/open/getRecentLottery',
				method: 'POST',
				data: {
					"type": 1,
					"num": 10
				},
				success: res => {
					_self.ssqList = res.data.list;
					for (var i = 0; i < _self.ssqList.length; i++) {
						var balls = [];
						var redballs = [];
						balls = _self.ssqList[i].result.split(";");
						for (var j = 0; j <= balls.length-2; j++) {
							redballs.push(balls[j]);
							_self.ssqList[i].redballs = redballs;
						}
						_self.ssqList[i].blueball = balls[balls.length-1];
						_self.ssqList[i].url = 'ssqDetail/ssqDetail';
					}
					console.log(_self.ssqList);
				}
			});
			uni.request({
				url: 'https://h5.shangchaocai.cn/open/getRecentLottery',
				method: 'POST',
				data: {
					"type": 3,
					"num": 10
				},
				success: res => {
					_self.fc3dList = res.data.list;
					for (var i = 0; i < _self.fc3dList.length; i++) {
						var redballs = [];
						redballs = _self.fc3dList[i].result.split(";");
						_self.fc3dList[i].redballs = redballs;
						_self.fc3dList[i].url = 'fc3dDetail/fc3dDetail';
					}
					// console.log("-----------------------");
				}
			});
			uni.request({
				url: 'https://h5.shangchaocai.cn/open/getRecentLottery',
				method: 'POST',
				data: {
					"type": 5,
					"num": 10
				},
				success: res => {
					_self.qlcList = res.data.list;
					for (var i = 0; i < _self.qlcList.length; i++) {
						var balls = [];
						var redballs = [];
						balls = _self.qlcList[i].result.split(";");
						for (var j = 0; j <= balls.length-2; j++) {
							redballs.push(balls[j]);
							_self.qlcList[i].redballs = redballs;
						}
						_self.qlcList[i].blueball = balls[balls.length-1];
						_self.qlcList[i].url = 'qlcDetail/qlcDetail';
						// _self.qlcList[i].url = 'ssqDetail/ssqDetail';
					}
				}
			});
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index
				}
			},
			styleChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.styleType = evt.target.value
				}
			},
			colorChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.activeColor = evt.target.value
				}
			}
		}
	}
</script>

<style scoped>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 0 40upx
	}

	.content {
		display: flex;
		padding: 30upx;
		width: 100%;
		/* justify-content: center; */
		/* align-items: center; */
		/* height: 300upx; */
		/* text-align: center; */
	}

	.color-tag {
		width: 50upx;
		height: 50upx;
	}

	uni-radio-group uni-label {
		padding: 0;
	}

	.uni-list-item__container {
		padding: 24upx 30upx;
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-item__container:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
</style>