<template>
	<view>
		<!-- <page-head :title="title"></page-head> -->
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map :latitude="latitude" :longitude="longitude" :markers="covers" :scale="12">
                </map>
			</view>
		</view>
		<view class="uni-list">
			<navigator class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key" url="detailMap/detailMap">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
						<view class="uni-media-list-logo">
							<image :src="value.img"></image>
						</view>
						<!-- <view class="uni-media-list-body">
							<view class="location-des1">
								<view class="uni-media-list-text-top">{{value.name}}</view>
								<image src="../../../static/icon_location.png" mode=""></image>
							</view>
							<view class="location-des2"> 
								<view class="uni-media-list-text-bottom uni-ellipsis">{{value.address}}</view>
								<text>{{value.dist}}</text>
							</view>
						</view> -->
						<view class="uni-media-list-body">
							<view class="location-des1">
								<view class="uni-media-list-text-top">{{value.name}}</view>
								<view class="uni-media-list-text-bottom uni-ellipsis">{{value.address}}</view>
							</view>
							<view class="location-des2">
								<image src="../../../static/icon_location.png" mode=""></image>
								<text>{{value.dist}}</text>
							</view>
						</view>
					</view>
			</navigator>
		</view>
	</view>
	<!-- <view>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <map :latitude="latitude" :longitude="longitude" :markers="covers">
                </map>
            </view>
        </view>
    </view> -->
</template>
<script>
	
	export default {
		data() {
			return {
				title: 'map',
				latitude: 0,
				longitude: 0,
				covers: [],
				list: []
			}
		},
		onLoad: function() {
			var _self = this;
			console.log(_self.title);
			uni.getLocation({
				success: function(res) {
					// this.myMap=res.data;
					var lat = 39.909;
					var lon = 116.39742;
					_self.latitude = lat;
					_self.longitude = lon;
					uni.request({
						url: 'https://www.easy-mock.com/mock/5c90925ed3d19731516d2dec/www.zouzhirui.xyz/store_manage/list',
						method: 'POST',
						data: {
							"lat": lat,
							"lon": lon
						},
						success: res => {
							console.log(res.data);
							_self.list=res.data.list;
							for (var i = 0; i < res.data.list.length; i++) {
								var obj1 = {}
								obj1.longitude = parseFloat(res.data.list[i].longitude);
								obj1.latitude = parseFloat(res.data.list[i].latitude);
								obj1.iconPath = '../../../static/location@3x.png';
								_self.covers.push(obj1);
								
							}
							// console.log(_self.covers);
						}
					});
				}
			});
		},
		// data() {
  //       return {
  //           title: 'map',
  //           latitude: 39.909,
  //           longitude: 116.39742,
  //           covers: [{
  //               latitude: 39.909,
  //               longitude: 116.39742,
  //               iconPath: '../../../static/location@3x.png'
  //           }, {
  //               latitude: 39.90,
  //               longitude: 116.39,
  //               iconPath: '../../../static/location@3x.png'
  //           }]
  //       }
    // },
    methods: {

    }
	}
</script>
<style scoped>
	map {
		width: 100%;
		height: 350upx;
	}
	.uni-media-list-body{
		height: 100upx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
	.location-des1,.location-des2{
		height: 100upx;
		display: flex;
		flex: 9;
		flex-direction: column; 
		justify-content: space-between;
	}
	.location-des2{
		flex: 1;
		text-align: center;
	}
	.location-des2>image{
		width: 40upx;
		height: 50upx;
		margin: 0 auto;
	}
	.location-des2>text{
		color: #999;
	}
</style>
