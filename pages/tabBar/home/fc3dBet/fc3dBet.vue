<template>
	<view id="fc3dBet">
		<view class="previousNo">
			上期开奖:{{previousNo}}
		</view>
		<view class="award-table" :class="{hideClass : hide}">
		    <view class="award-header">
				<view class="award-tr">
					<view class="award-td">期号</view>
					<view class="award-td">开奖号码</view>
				</view>
		    </view>
		    <view class="awardBody">
				<view class="award-tr" v-for="(aitem,index) in aitem" :key="index">
					<view class="award-td">第{{aitem.term_no}}期</view>
					<view class="award-td">{{aitem.result}}</view>
				</view>
		    </view>
		</view>
		<view class="toggleButton" @click="toggle"><image src="../../../../static/icon-dropdown.png" /></view>
		<view class="fc3d-btn">
			<navigator url="zhixuan/zhixuan" open-type="redirect">直选</navigator>
			<navigator url="zusan/zusan" open-type="redirect">组三</navigator>
			<navigator url="zuliu/zuliu" open-type="redirect">组六</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				previousNo:'',
				hide: true,
				aitem: {
					type: Array,
					default () {
						return []
					}
				},
			}
		},
		methods: {
			toggle() {
				var that = this;
				that.hide = !that.hide;
			}
		},
		onLoad() {
			var that = this;
			uni.request({
				url: 'https://h5.shangchaocai.cn/open/getRecentLottery',
				method: 'POST',
				data: {
					"type": 3,
					"num": 10
				},
				success: res => {
					that.aitem = res.data.list;
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: 'https://h5.shangchaocai.cn/h5/getCurrentTerm',
				method: 'POST',
				data: {
					type:3
				},
				success: res => {
					var current = res.data.term_no;
					uni.request({
						url: 'https://h5.shangchaocai.cn/h5/getLastTerm',
						method: 'POST',
						data: {
							type:3,
							term_no: current-1
						},
						success: res => {
							that.previousNo = res.data.result.split(";").join(" ");
						},
						fail: () => {},
						complete: () => {}
					});
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
#fc3dBet{
	>.previousNo{
		text-align: center;
		height: 70upx;
		background-color: #FFF7CC;
		font-size: 28upx;
		line-height: 70upx;
		color: #999;
	}
	.fc3d-btn{
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
		>navigator{
			width: 25%;
			border: 1px solid #dc504e;
			border-radius: 5px;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			color: #dc504e;
		}
	}
	>.hideClass{
		display: none;
	}
	>.award-table{
		.award-header{
			border-bottom: 1px solid #F5F7FB;
			color: #999;
		}
		.award-tr{
			display: flex;
			height: 60upx;
			align-items: center;
			font-size: 28upx;
			>.award-td{
				width: 50%;
				text-align: center;
			}
			&:nth-child(2n){
				background-color: #F5F7FB;
			}
		}
	}
	>.toggleButton{
		text-align: center;
		>image{
			width: 153upx;
			height: 25upx;
			vertical-align: top
		}
	}
}
</style>
