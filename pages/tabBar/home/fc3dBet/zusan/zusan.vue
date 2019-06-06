<template>
	<view id="fc3dBet-zusan">
		<betInfo :redBall="redBall" :blueBall="blueBall" :aitem="list" :currentDate="currentDate" :current="currentTerm" :mount="mount" :total="total" @clickItem01="random01" @clickItem05="random05"  @clickSure="clickSure"></betInfo>
		<view class="all-ball-info">
			<view>
				<view>选一个单号和一个重号</view>
				<view class="all-red-balls">
					<view class="hundred">
						单
					</view>
					<view class="options">
						<view v-for="(rb,index1) in allRB" :key="index1" @click="toggleRB(index1)" :class="{redActive:rb.selected}">
							{{rb.index}}
						</view>
					</view>
				</view>
				<view class="all-red-balls">
					<view class="hundred ten">
						重
					</view>
					<view class="options">
						<view v-for="(rb,index2) in allRT" :key="index2" @click="toggleRT(index2)" :class="{redActive:rb.selected}">
							{{rb.index}}
						</view>
					</view>
				</view>
				<!-- <view id="all-blue-balls">
					<view v-for="(bb,index) in allBB" :key="index" @click="toggleBB(index)" :class="{blueActive:bb.selected}">
						{{bb.index}}
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import betInfo from '@/components/bet-info'
	export default {
		components: {
			betInfo
		},
		data() {
			return {
				currentDate: '',
				currentTerm: '',
				redBall:'',
				blueBall:'',
				list:[],
				allRB: [
					{index:'0',selected: false},{index:'1',selected: false},{index:'2',selected: false},{index:'3',selected: false},{index:'4',selected: false},
					{index:'5',selected: false},{index:'6',selected: false},{index:'7',selected: false},{index:'8',selected: false},{index:'9',selected: false}],
				allRT: [
					{index:'0',selected: false},{index:'1',selected: false},{index:'2',selected: false},{index:'3',selected: false},{index:'4',selected: false},
					{index:'5',selected: false},{index:'6',selected: false},{index:'7',selected: false},{index:'8',selected: false},{index:'9',selected: false}],
				mount:'',
				total:'',
				info:{},
				data:[]
			};
		},
		methods: {
			toggleRB(index) {
				var that = this;
				this.allRB.map(function(item){return item.selected=false});
				this.allRB[index].selected = !this.allRB[index].selected;
				that.$options.methods.sumMoney(that);
			},
			toggleRT(index) {
				var that = this;
				this.allRT.map(function(item){return item.selected=false});
				this.allRT[index].selected = !this.allRT[index].selected;
				that.$options.methods.sumMoney(that);
			},
			sumMoney(that){
				var arr1 = that.allRB.find((value, index, array) =>value.selected==true);
				var arr2 = that.allRT.find((value, index, array) =>value.selected==true);
				if(arr1 &&  arr2){
					that.mount=1;
					that.total=2;
				}else{
					that.mount=0;
					that.total=0;
				}
			},
			clickSure(){
				var that = this;
				that.data = uni.getStorageSync("message")?JSON.parse(uni.getStorageSync("message")):[];
				var arr1 = that.allRB.find((value, index, array) =>value.selected==true);
				var arr2 = that.allRT.find((value, index, array) =>value.selected==true);
				if(arr1 &&  arr2){
					var arr2 = arr1.index+","+arr2.index+","+arr2.index+"";
					var sumArr="ds-";
					that.info.shape="单式";
					var allBall=null;
					allBall=sumArr+arr2+"|" + '-1';
					console.log(allBall);
					allBall=allBall.replace("-,","-").replace(",|,","|").replace(",-","-");
					that.info.val=allBall;
					that.info.zhu=that.mount;
					that.info.money=that.total;
					that.data.push(JSON.stringify(that.info));
					uni.setStorage({
						key: 'message',
						data: JSON.stringify(that.data),
						success: function () {
							uni.setStorage({
								key: 'pid',
								data: '2',
								success: function () {
									uni.setStorageSync('cid', 'zusan');
									uni.redirectTo({
										 url: '../../order/order?currentTerm='+that.currentTerm+'&currentDate='+that.currentDate
									})
								}
							});
						}
					});
				}else{
					uni.showToast({
						title: '不符合要求',
						duration: 2000,
						icon: 'none'
					});
				}
			},
			random01(){
				this.allRB.map(function(item){return item.selected=false});
				this.allRT.map(function(item){return item.selected=false});
				this.mount = '1';
				this.total = '2';
				// var array1 = new Array(10).fill(0).map((v,i)=>i).sort(()=>0.5 - Math.random()).filter((v,i)=>i<1).sort(function(a,b){return a-b});
				// var array2 = new Array(10).fill(0).map((v,i)=>i).sort(()=>0.5 - Math.random()).filter((v,i)=>i<1).sort(function(a,b){return a-b});
				// var array3 = new Array(10).fill(0).map((v,i)=>i).sort(()=>0.5 - Math.random()).filter((v,i)=>i<1).sort(function(a,b){return a-b});
				var a1 = Math.floor(Math.random()*10);
				var a2 = Math.floor(Math.random()*10);
				this.allRB[a1].selected = true;
				this.allRT[a2].selected = true;
			},
			random05(){
				var that = this;
				this.allRB.map(function(item){return item.selected=false});
				this.allRT.map(function(item){return item.selected=false});
				this.mount = '5';
				this.total = '10';
				for (var i = 0; i < 5; i++) {
					var array1 = new Array(10).fill(0).map((v,i)=>i).sort(()=>0.5 - Math.random()).filter((v,i)=>i<2).sort(function(a,b){return a-b});
					var a1 = array1[0]+',';
					var a2 = array1[1]+',';
					var aString=a1.concat(a2).concat(a2)+'';
					console.log(aString);
					var sumArr="ds-";
					this.info.shape="单式";
					var allBall=null;
					allBall=sumArr + aString + '-1';
					allBall=allBall.replace("-,","-").replace(",|,","|").replace(",-","-");
					this.info.val=allBall;
					this.info.zhu=1;
					this.info.money=2;
					this.data.push(JSON.stringify(this.info));
				}
				uni.setStorage({
					key: 'message',
					data: JSON.stringify(this.data),
					success: function () {
						uni.setStorage({
							key: 'pid',
							data: '2',
							success: function () {
								console.log(that.currentDate);
								uni.redirectTo({
									 url: '../../order/order?currentTerm=' + that.currentTerm + '&currentDate=' + that.currentDate
								})
							}
						});
					}
				});
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
					that.list = res.data.list;
					console.log(that.list);
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
					console.log(res.data)
					that.currentTerm = res.data.term_no;
					that.currentDate = res.data.stop_sale_time;
					uni.request({
						url: 'https://h5.shangchaocai.cn/h5/getLastTerm',
						method: 'POST',
						data: {
							type:3,
							term_no:that.currentTerm-1
						},
						success: res => {
							console.log(res.data);
							that.redBall = res.data.result.split(";").join(" ");
							// that.blueBall = res.data.blue;
						},
						fail: () => {},
						complete: () => {}
					});
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
</script>

<style lang="scss">
#fc3dBet-zusan{
	padding-bottom: 180upx;
	.all-ball-info{
		padding: 0 30upx;
		.all-red-balls{
			margin-top: 15upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 200upx;
			>.hundred{
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				font-size: 48upx;
				color: #fff;
				background:linear-gradient(135deg,rgba(253,235,113,1),rgba(248,216,0,1));
				box-shadow: 0 10upx 30upx rgba(251,227,63,0.5);
			}
			.ten{
				background:linear-gradient(135deg,rgba(171,220,255,1),rgba(3,150,255,1));
				box-shadow: 0 10upx 30upx rgba(3,150,255,0.5);
			}
			.single{
				background:linear-gradient(135deg,rgba(250,165,135,1),rgba(237,96,92,1));
				box-shadow: 0 10upx 30upx rgba(237,96,92,0.5);
			}
			>.options{
				width: 75%;
				display: flex;
				flex-flow: wrap row; 
				justify-content: space-between;
				>view{
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 69upx;
					height: 69upx;
					border-radius: 70upx;
					color: #DC504E;
					border: #DC504E 1px solid;
					box-sizing: border-box;
					margin-right: 30upx;
					margin-bottom: 30upx;
					&:nth-child(n+5){
						margin-bottom: 0;
					}
				}
				.redActive{
					border:none;
					color: #fff;
					background-color: #DC504E;
				}
			}
		}
	}
}
</style>
