<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<image src="../../../static/face.jpg" mode="widthFix"></image>
						</view>
						<view class="phone-number">睿</view>
					</view>
					<view class="box-bd">
						<view class="item">
							<view>¥1688</view>
							<view class="text">累计中奖</view>
						</view>
						<view class="item">
							<view>¥1688</view>
							<view class="text">奖金余额</view>
						</view>
						<view class="item">
							<view>¥1688</view>
							<view class="text">累计购彩</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list uni-flex">
				<view class="li noborder uni-column uni-center" >
					<view class="icon"><image src="../../../static/home.svg"></image></view>
					<view>首页</view>
				</view>
				<view class="li noborder uni-column uni-center" >
					<view class="icon"><image src="../../../static/icon_drop_money.svg"></image></view>
					<view>提现</view>
				</view>
				<view class="li noborder uni-column uni-center" >
					<view class="icon"><image src="../../../static/icon_shop_ticket.svg"></image></view>
					<view>购彩</view>
				</view>
			</view>
			<view class="list">
				<view class="li rightArrow" >
					<view class="icon"><image src="../../../static/icon_history.svg"></image></view>
					<view class="text">投注记录</view>
				</view>
				<view class="li rightArrow" >
					<view class="icon"><image src="../../../static/icon_money_detail.svg"></image></view>
					<view class="text">资金明细</view>
				</view>
				<view class="li rightArrow" >
					<view class="icon"><image src="../../../static/icon_information.svg"></image></view>
					<view class="text">个人资料</view>
				</view>
			</view>
			<view class="list">
				<view class="li noborder rightArrow" >
					<view class="icon"><image src="../../../static/icon_help.svg"></image></view>
					<view class="text">新手上路</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
			};
		},
		onLoad() {
		},
		methods: {
			changeSkin(){
				uni.navigateTo({
						url: '../skin-change/skin-change'
				});
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color:#F5F7FB;
	font-size: 30upx;
}
.header{
	background: #fff;
	height: 290upx;
	padding-bottom: 110upx;
	.bg{
		width: 100%;
		height:200upx;
		padding-top:100upx;
		background:linear-gradient(135deg,rgba(248,115,68,1) 0%,rgba(216,61,63,1) 100%);
	}
}
.box{
	width: 650upx;
	height: 280upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(248,115,68,0.2); 
	.box-hd{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		.avator{
			width: 160upx;
			height: 160upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.phone-number{
			width: 100%;
			text-align: center;
		}
	}
	.box-bd{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		.item{
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 0;
			&:last-child{
				border: none;
			}
			.icon{
				width: 60upx;
				height: 60upx;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}
.list-content{
	background: #fff;
}

.list{
	width:100%;
	border-bottom:15upx solid  #f1f1f1;
	background: #fff;
	&:last-child{
		border: none;
	}
	.li{
		width:92%;
		height:100upx;
		padding:0 4%;
		border-bottom:1px solid rgb(243,243,243);
		display:flex;
		align-items:center;
	&.noborder{
		border-bottom:0
		}
		.icon{
			flex-shrink:0;
			width:50upx;
			height:50upx;
			image{
				width:50upx;
				height:50upx;
			}
		}
		.text{
			padding-left:20upx;
			width:100%;
			color:#666;
		}
		.to{
			flex-shrink:0;
			width:40upx;
			height:40upx;
		}
	}
	.rightArrow{
		position: relative;
		&::after{
			font-family: uniicons;
			font-size: 32upx;
			content: '\e583';
			position: absolute;
			right: 30upx;
			top: 50%;
			color: #bbb;
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
		}
		
	}
}
</style>
