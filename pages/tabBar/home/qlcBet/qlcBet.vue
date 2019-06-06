<template>
	<view id="qlcBet">
		<betInfo :redBall="redBall" :blueBall="blueBall" :aitem="list" :currentDate="currentDate" :current="currentTerm" :mount="mount" :total="total" @clickItem01="random01" @clickItem05="random05" @clickSure="clickSure"></betInfo>
		<view id="all-ball-info">
			<view>
				<view>至少选择7个红球</view>
				<view id="all-red-balls">
					<view v-for="(rb,index) in allRB" :key="index" @click="toggleRB(index)" :class="{redActive:rb.selected}">
						{{rb.index}}
					</view>
				</view>
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
					{index:'01',selected: false},{index:'02',selected: false},{index:'03',selected: false},{index:'04',selected: false},
					{index:'05',selected: false},{index:'06',selected: false},{index:'07',selected: false},{index:'08',selected: false},
					{index:'09',selected: false},{index:'10',selected: false},{index:'11',selected: false},{index:'12',selected: false},
					{index:'13',selected: false},{index:'14',selected: false},{index:'15',selected: false},{index:'16',selected: false},
					{index:'17',selected: false},{index:'18',selected: false},{index:'19',selected: false},{index:'20',selected: false},
					{index:'21',selected: false},{index:'22',selected: false},{index:'23',selected: false},{index:'24',selected: false},
					{index:'25',selected: false},{index:'26',selected: false},{index:'27',selected: false},{index:'28',selected: false},
					{index:'29',selected: false},{index:'30',selected: false}],
				mount:'',
				total:'',
				info:{},
				data:[]
			};
		},
		methods: {
			toggleRB(index) {
				var that = this;
				this.allRB[index].selected = !this.allRB[index].selected;
				that.$options.methods.sumMoney(that);
			},
			random01(){
				this.allRB.map(function(item){return item.selected=false});
				this.mount = '1';
				this.total = '2';
				var array1 = new Array(30).fill(0).map((v,i)=>i+1).sort(()=>0.5 - Math.random()).filter((v,i)=>i<7).sort(function(a,b){return a-b});
				array1 = array1.map(function(item){if(item<10){return '0'+item}else{return item+""}});
				for (var i = 0; i < array1.length; i++) {
					this.allRB[array1[i]-1].selected = true;
				}
			},
			clickSure(){
				var that = this;
				that.$options.methods.condition(that);
			},
			condition(that){
				that.data = uni.getStorageSync("message")?JSON.parse(uni.getStorageSync("message")):[];
				var arr2 = [];
				for (var i = 0; i < that.allRB.length; i++) {
					if (that.allRB[i].selected) {
						arr2.push(that.allRB[i].index)
					}
				}
				var a2 = arr2.length;
				var sumArr="ds-";
				that.info.shape="单式";
				//如果还没有选择，那么单复式都可以选择
				if (that.data.length === 0) {
				}else{
					if (a2>7) {
						uni.showToast({
							title: '不能选择复式',
							duration: 2000,
							icon: 'none'
						});
						
					} else{
						that.mount = 1;
						that.total = 2;
					}
				}
				//红球至少6个，蓝球至少1个
				if (a2<7) {
					uni.showToast({
						title: '不符合要求',
						duration: 2000,
						icon: 'none'
					});
				//红复式和蓝复式全复式都可以
				}else if(a2>7){
					sumArr="fs-";
					that.info.shape="复式";
				}
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
							data: '4',
							success: function () {
								uni.redirectTo({
									 url: '../order/order?currentTerm='+that.currentTerm+'&currentDate='+that.currentDate
								})
							}
						});
					}
				});
			},
			sumMoney(that){
				var arr2 = [];
				for (var i = 0; i < that.allRB.length; i++) {
					if (that.allRB[i].selected) {
						arr2.push(that.allRB[i])
					}
				}
				var a2 = arr2.length;
				if (a2>6){
					that.mount = that.$options.methods.factorial(a2,7)/that.$options.methods.factorial(7,7);
					that.total = 2*that.mount;
				}
			},
			factorial(m,n){
				var num = 1;
				var count = 0;
				for(var i = m;i > 0;i--){
					if(count == n){//当循环次数等于指定的相乘个数时，即跳出for循环
						break;
					}
					num = num * i;
					count++;
				}
				return num;
			},
			random05(){
				var that = this;
				this.allRB.map(function(item){return item.selected=false});
				this.mount = '5';
				this.total = '10';
				for (var i = 0; i < 5; i++) {
					var array1 = new Array(30).fill(0).map((v,i)=>i+1).sort(()=>0.5 - Math.random()).filter((v,i)=>i<7).sort(function(a,b){return a-b});
					array1 = array1.map(function(item){if(item<10){return '0'+item}else{return item+""}});
					var sumArr="ds-";
					this.info.shape="单式";
					var allBall=null;
					allBall=sumArr+array1+ '-1';
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
							data: '4',
							success:function(res){
								uni.redirectTo({
									 url: '../order/order?currentTerm='+that.currentTerm+'&currentDate='+that.currentDate
								})
							}
						})
						
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
					"type": 5,
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
					type:5
				},
				success: res => {
					console.log(res.data)
					that.currentTerm = res.data.term_no;
					that.currentDate = res.data.stop_sale_time;
					uni.request({
						url: 'https://h5.shangchaocai.cn/h5/getLastTerm',
						method: 'POST',
						data: {
							type:5,
							term_no:that.currentTerm-1
						},
						success: res => {
							console.log(res.data);
							var result = res.data.result.split(";");
							that.blueBall = res.data.result.split(";")[result.length-1];
							console.log(that.blueBall);
							that.redBall = result.slice(0,result.length-1).join(" ").concat(" ");
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
#qlcBet{
	padding-bottom: 180upx;
	#all-ball-info{
		padding: 0 30upx;
		#all-blue-balls{
			margin-top: 15upx;
			.blueActive{
				border:none;
				color: #fff;
				background-color: #238BDC;
			}
			>view{
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 69upx;
				height: 69upx;
				border-radius: 70upx;
				color: #238BDC;
				border: #238BDC 1px solid;
				box-sizing: border-box;
				margin-right: 30upx;
				margin-bottom: 30upx;
			}
		}
		#all-red-balls{
			margin-top: 15upx;
			.redActive{
				border:none;
				color: #fff;
				background-color: #DC504E;
			}
			
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
			}
		}
	}
}
</style>
