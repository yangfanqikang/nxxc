<template>
	<view class="bet-info">
		<view class="previousNo" :redBall="redBall"  :blueBall="blueBall">
			上期开奖：
			<text class="redClass">{{redBall}}</text>
			<text class="blueClass">{{blueBall}}</text>
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
		<view class="info-bottom">
			<view class="current-info">
				<image src="../static/message.png" mode=""></image>
				<text  :current="current">{{current}}期截止时间：</text>
				<text class="redClass" :currentDate="currentDate">{{currentDate}}</text>
			</view>
			<view class="btn-group">
				<button @click="random01">机选1注</button>
				<button @click="random05" :disabled="tooLarge">机选5注</button>
				<view>
					<view :mount="mount">共 {{mount}} 注</view>
					<view :total="total">共 {{total}} 元</view>
				</view>
				<button @click="btnSure">确定</button>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		name: 'bet-info',
		data() {
			return {
				hide: true,
			}
		},
		props: {
			redBall: {
				type: String,
				default: ''
			},
			blueBall: {
				type: String,
				default: ''
			},
			aitem: {
				type: Array,
				default () {
					return []
				}
			},
			current:{
				type: String,
				default: ''
			},
			currentDate:{
				type: String,
				default: ''
			},
			mount:{
				type:String,
				default: ''
			},
			total:{
				type:String,
				default:''
			},
			tooLarge:{
				type:Boolean,
				defalut: false
			}
		},
		methods: {
			toggle() {
				var that = this;
				that.hide = !that.hide;
			},
			random01(){
				this.$emit('clickItem01');
			},
			random05(){
				this.$emit('clickItem05');
			},
			btnSure(){
				this.$emit('clickSure');
			}
		},
	} 
</script>

<style lang="scss">
	.bet-info{
		position: relative;
		.info-bottom{
			box-sizing: border-box;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background-color: #fff;
			>.current-info{
				height: 70upx;
				display: flex;
				align-items: center;
				background-color: #FFF7CC;
				padding: 0 30upx;
				color: #333;
				>image{
					width: 40upx;
					height: 40upx;
					margin-right: 15upx;
				}
			}
			>.btn-group{
				height: 107upx;
				width: 100%;
				display: flex;
				align-items: center;
				>button{
					height: 70upx;
					border: 1px solid #DC504E;
					color: #DC504E;
					font-size: 32upx;
					line-height: 68upx;
					background-color: #fff;
					&:last-child{
						background-color: #DC504E;
						color: #fff;
					}
				}
			}
		}
		>.previousNo{
			text-align: center;
			height: 70upx;
			background-color: #FFF7CC;
			font-size: 28upx;
			line-height: 70upx;
			color: #999;
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
