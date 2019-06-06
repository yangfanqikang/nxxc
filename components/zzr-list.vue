<template>
	<view>
		<navigator class="zzr-list" v-for="(item,index) in items" :key="index" :url="item.url + '?index=' + item.result+'&term_no='+item.term_no">
			<view class="zzr-list-top">
				<text>{{item.term_no}}期</text>
				<text>{{item.term_no}}</text>
			</view>
			<view class="zzr-list-content">
				<view v-for="(ball,ballIndex) in item.redballs" :key="ballIndex">
						{{ball}}
				</view>
				<view v-if="item.blueball">
					{{item.blueball}}
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		props: {
			items : {
				type: Array,
				default () {
					return []
				}
			},
			balls : {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			dataClick(){
                let that = this;
                var items = JSON.stringify(that.items); // 这里转换成 字符串
                uni.navigateTo({
                    url:'ssqDetail/ssqDetail?index='+items
                })
            }
		},
	}
</script>

<style lang="scss">
.zzr-list{
	padding: 30upx 0;
	border-bottom: 1px #eee solid;
	.zzr-list-top{
		display: flex;
		box-sizing: border-box;
		width: 690upx;
		flex-flow: row nowrap;
		justify-content: space-between;
		font-size: 32upx;
		color: #666;
		line-height: 64upx;
	}
	
	.zzr-list-content{
		display: flex;
		position: relative;
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
			&:last-child{
				border: 1px solid #5C7EE8;
				color: #5C7EE8;
			}
		}
		&::after{
			font-family: uniicons;
			font-size: 32upx;
			content: '\e583';
			position: absolute;
			right: 0upx;
			top: 50%;
			color: #bbb;
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
		}
	}
}
</style>
