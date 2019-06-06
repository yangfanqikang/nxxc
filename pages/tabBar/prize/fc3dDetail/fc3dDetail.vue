<template>
	<view>
		<view class="prizeInfo">
			<view class="num-text">
				<text>第{{term_no}}期</text>
				<text>{{term_no}}</text>
			</view>
			<view class="prizeBall">
				<view v-for="(redBall,index) in redBalls" :key="index">
					{{redBall}}
				</view>
				<view v-if="blueBall">{{blueBall}}</view>
			</view>
		</view>
		<view class="prizeMoney">
			<view class="prizeMoney1">
				<view class="">
					本期销量/元
				</view>
				<text>327800026.00</text>
			</view>
			<view class="prizeMoney2">
				<view class="">
					奖池金额/元
				</view>
				<text>462800026.00</text>
			</view>
		</view>
		<view class="tabHeader">奖项设置</view>
		<view class="prizeSet">
			<view class="theader">
				<view class="tr">
					<view class="td">奖级</view>
					<view class="td">获奖人数/人</view>
					<view class="td">金额/元</view>
				</view>
			</view>
			<view class="tbody">
				<view class="tr" v-for="(tabItem,index) in tableData" :key="index">
					<view class="td">{{tabItem.prizeType}}</view>
					<view class="td">{{tabItem.amount}}</view>
					<view class="td">{{tabItem.total}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				term_no: '',
				redBalls: [],
				blueBall:'',
				tableData:[
					{prizeType:'单选',amount: '8761',total: '1040'},
					{prizeType:'组三',amount: '23849',total: '99179.00'},
					{prizeType:'组六',amount: '123849',total: '199179.00'},
					
				]
			}
		},
		methods: {
			
		},
		onLoad(options) {
			var that = this;
            //that.data = JSON.parse(options.index); // 字符串转对象
            that.term_no = options.term_no;
			var arr = options.index.split(";");
			console.log(arr);
			var redBalls = [];
			for (var i = 0; i <= arr.length-1; i++) {
				redBalls.push(arr[i]);
			}
			that.redBalls=redBalls;
			console.log(that.redBalls);
			
        }
	}
</script>

<style lang="scss">
.prizeInfo{
	// height: 377upx;
	padding: 24upx;
	>view:nth-child(1){
		display: flex;
		justify-content: space-between;
		color: #666;
		font-size: 32upx;
		margin-bottom: 36upx;
		>text:last-child{
			color: #999;
		}
	}
	.prizeBall{
		display: flex;
		margin-bottom: 12upx;
		>view{
		width: 54upx;
		height: 54upx;
		// background-color: red;
		border-radius: 50%;
		margin-right: 20upx;
		line-height: 54upx;
		text-align: center;
		border: 1px solid #E73F3F;
		color: #E73F3F;
		// &:last-child{
		// 	border: 1px solid #5C7EE8;
		// 	color: #5C7EE8;
		// }
	}
	}
}
.prizeMoney{
	// height: 208upx;
	box-sizing: border-box;
	padding: 24upx;
	background-color: #f2f3f9;
	display: flex;
	justify-content: space-between;
	>view{
		width: 50%;
		>view{
			padding-left: 56upx;
			background: url("../../../../static/icon_prizeMoney.png");
			background-repeat: no-repeat;
			background-position: left center;
			background-size: 42upx 42upx;
			
		}
		>text{
			font-size: 42upx;
			color: #DC504E;
		}
	}
}
.tabHeader{
	width: 100%;
	background-color: #DC504E;
	height: 64upx;
	line-height: 64upx;
	text-align: center;
	font-size: 32upx;
	color: #fff;
}
.prizeSet{
	.tr{
		display: flex;
		&:nth-child(2n){
			background-color: #f2f3f9;
		}
		>.td{
			text-align: center;
			height: 80upx;
			line-height: 80upx;
		}
		>.td:nth-child(1){
			width: 25%;
		}
		>.td:nth-child(2){
			width: 50%;
		}
		>.td:nth-child(3){
			width: 25%;
		}
	}
	.theader{
		>.tr{
			background-color: #f2f3f9;
			font-size: 32upx;
			color: #333;
		}
	}
}
</style>
