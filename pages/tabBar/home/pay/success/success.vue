<template>
	<view class="paySucess">
		<view class="lotteryType">
			<text>支付成功</text>
			<view class="betDetail">
				<view class="betType">
					<image :src="imgSrc" mode=""></image>
					<view class="">
						<view>{{lotteryType}}</view>
						<view>投注金额：¥{{total}}</view>
					</view>
				</view>
				<view class="">
					<view>第2019668期</view>
					<view>待开奖</view>
				</view>
			</view>
		</view>
		<view class="lotteryNum">
			<view class="lengthMul">
                选号详情：<text class="redClass">{{data.length}}</text>注<text class="redClass">{{multiple}}</text>倍
			</view>
			<view class="all-ball-info">
				<view v-for="(item1,index) in betData" :key="index">
					<view v-for="(item2,index2) in item1.redBall" :key="index2">
						{{item2}}
					</view>
					<view v-if="item1.blueBall">
						{{item1.blueBall}}
					</view>
				</view>
			</view>
		</view>
		<view class="timeNum">
			<text>下单时间：{{orderTime}}</text>
			<text>订单编号：1012201807041603546</text>
		</view>
		<view class="btn-group">
			<button type="default" @click="goHome">返回首页</button>
			<button type="warn" @click="goBack">继续投注</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pid:'',
				multiple:'1',
				lotteryType:'',
				total:'',
				url:'',
				data:[],
				betData:[],
				orderTime:'',
				imgSrc:''
			};
		},
		onLoad(options) {
			var that = this;
			that.orderTime = new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString();
			console.log(that.orderTime);
			that.pid = uni.getStorageSync("pid");
			that.data = uni.getStorageSync("message")?JSON.parse(uni.getStorageSync("message")):[];
			that.total = options.total;
			that.multiple = options.multiple;
			console.log(that.data);
			for (var i = 0; i < that.data.length; i++) {
				that.betData.push(JSON.parse(that.data[i]));
				console.log(that.betData[i].val);
			
				if(that.pid == 1){
					// var divide = that.data[i].val.indexOf("|")
					that.betData[i].redBall = that.betData[i].val.slice(3,that.betData[i].val.indexOf("|")).split(",");
					console.log(that.betData[i].redBall);
					that.betData[i].blueBall = that.betData[i].val.slice(that.betData[i].val.indexOf("|")+1,that.betData[i].val.lastIndexOf("-"));
					that.url="../../ssqBet/ssqBet";
					that.lotteryType='双色球';
					that.imgSrc = '../../../../../static/ssq.png'
				}else if(that.pid == 4){
					that.betData[i].redBall = that.betData[i].val.slice(3,that.betData[i].val.indexOf("|")-1).split(",");
					that.url="../../qlcBet/qlcBet";
					that.lotteryType='七乐彩';
					that.imgSrc = '../../../../../static/qlc.png'
				}else if(that.pid == 2){
					if(that.cid=="zhixuan"){
						that.url="../../fc3dBet/zhixuan/zhixuan";
					}else if(that.cid== "zusan"){
						that.url="../../fc3dBet/zusan/zusan";
					}else if(that.cid == "zuliu"){
						that.url="../../fc3dBet/zuliu/zuliu";
					}
					that.lotteryType='福彩3D';
					that.imgSrc = '../../../../../static/3d.png';
					that.betData[i].redBall = that.betData[i].val.slice(3,8).replace(/,/g," ");
				}
			}
		},
		methods:{
			goHome(){
				uni.switchTab({
					url: '/pages/tabBar/home/home'
				});
			},
			goBack(){
				uni.redirectTo({
					url: this.url,
				});
			}
		},
		onHide() {
			uni.clearStorage();
		}
	}
</script>

<style lang="scss">
.lotteryType{
	padding-top: 44upx;
	padding-left: 30upx;
	padding-right: 30upx;
	color: #fff;
	font-size: 32upx;
	height:333upx;
	background:linear-gradient(135deg,rgba(248,115,68,1) 0%,rgba(216,61,63,1) 100%);
	>text{
		line-height: 98upx;
	}
	.betDetail{
		margin-top: 20upx;
		@include flexRowSBC;
		.betType{
			@include flexRowSBC(flex-start);
			image{
				width: 125upx;
				height: 125upx;
				margin-right: 15upx;
			}
		}
	}
}
.lotteryNum{
	.lengthMul{
		line-height: 80upx;
	}
		padding: 15upx 30upx;
		>.all-ball-info{
			>view{
				@include flexRowSBC(flex-start);
				margin-bottom: 20upx;
				>view{
					margin-right: 20upx;
					width:69upx;
					height:69upx;
					color: #fff;
					line-height: 69upx;
					text-align: center;
					background:radial-gradient(circle,rgba(252,127,128,1),rgba(186,3,7,1));
					border-radius:50%;
					&:last-child{
						background:radial-gradient(circle,rgba(29,226,219,1),rgba(92,126,232,1));
					}
				}
				
			}
		}
	}
	.timeNum{
		background-color: #f2f3f9;
		padding: 15upx 30upx;
		margin: 30upx 0;
		>text{
			display: block
		}
	}
	.btn-group{
		margin-top: 100upx;
		display: flex
	}
</style>
