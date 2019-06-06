<template lang="html">
	<view class="pay">
		<view class="orderTotal">
			<text>订单</text>
			<text>{{total}}元</text>
		</view>
		<view class="payMethod">
			<text>选择支付方式</text>
			<view class="uni-list">
				<radio-group @change="radioChange" class="radio-group">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view class="ptext-img">
							<image :src="item.imgSrc" mode=""></image>
							<text>{{item.name}}</text>
						</view>
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<button type="warn" @click="payM">支 付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total:'',
				multiple:'',
				items:[
					{imgSrc:'../../../../static/icon_prizeMoney2.png', value:'1',name:'彩金支付'},
					{imgSrc:'../../../../static/icon_balance.png', value:'2',name:'余额支付'},
					{imgSrc:'../../../../static/icon_wechat.png',  value:'3',name:'微信支付'},
				],
				current:2,
			};
		},
		onLoad(options) {
			this.total = options.total;
			this.multiple = options.multiple;
			console.log(options);
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			payM(){
				uni.redirectTo({
					url:'success/success?total='+this.total+'&multiple='+this.multiple
				})
				
			}
    }
	}
</script>

<style lang="scss">
.pay{
	.orderTotal{
		@include flexRowSBC;
		height: 100upx;
		font-size: 32upx;
		padding: 0 30upx;
	}
	.payMethod{
		>text{
			height: 50upx;
			line-height: 50upx;
			background-color: #F2F3F9;
			padding: 0 30upx;
			width: 100%;
			display: block;
		}
		.radio-group{
			image{
				width: 72upx;
				height: 72upx;
				margin-right: 15upx;
			}
			.ptext-img{
				@include flexRowSBC(flex-start);
			}
		}
	}
	>button{
		margin-top: 100upx;
		width: 80%;
	}
}
</style>
