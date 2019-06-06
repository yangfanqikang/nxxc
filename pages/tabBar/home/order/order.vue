<template>
	<view class="order-page">
		<view class="current-info">
			<text >{{currentTerm}}期截止时间：</text>
			<text class="redClass" :currentDate="currentDate">{{currentDate}}</text>
		</view>
		<view id="btn-group">
			<button type="warn" size="mini" @click="goBack" :disabled="dis1">添加自选号码</button>
			<button type="warn" size="mini" @click="addOne" :disabled="dis2">添加一注机选</button>
			<button type="warn" size="mini" @click="deleteAll">清空投注列表</button>
		</view>
		<view id="bet-detail">
			<view v-for="(item,index) in betData" :key="index" class="bet-info-li">
				<view class="bet-num">
					{{item.redBall}} 
					<text v-if="item.blueBall"> | {{item.blueBall}}</text>
				</view>
				<view class="">
					{{item.shape}} · {{item.zhu}}注 · {{item.money}}元
				</view>
				<image src="../../../../static/icon_close_fill_circle.svg" mode="" @click="deleteOne(index)"></image>
			</view>
		</view>
		<view id="bet-info">
			<view>
				{{2*data.length*multiple}}元 {{data.length}}注 {{multiple}}倍
			</view>
			<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" id="bet-multiple">
				<view>投 {{multiple}} 倍</view>
				<!-- <view class="uni-input">{{array[index].name}}</view> -->
			</picker>
			<view id="btn-sure" @click="orderBtn">
				确 定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTerm:'',
				currentDate:'',
				data:[],
				betData:[],
				info:{},
				array: [{name:'1'},{name: '2'}, {name:'3'}, {name:'4'},{name:'5'},{name: '10'}, {name:'20'}, {name:'50'},{name:'99'}],
				multiple:'1',
				pid:'',
				dis1:false,
				dis2:false,
				cid:'',
				url:''
			};
		},
		methods: {
			orderBtn(){
				var that = this;
				var total = 2*that.data.length*that.multiple;
				uni.redirectTo({
					url:"../pay/pay?total="+total+'&multiple='+that.multiple
				})
			},
			deleteOne(index) {
				this.data.splice(index,1);
				this.betData.splice(index,1);
				if(this.data.length<5){
					this.dis1 = false;
					this.dis2 = false;
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.multiple = this.array[e.target.value].name;
			},
			deleteAll(){
				this.data=[];
				this.betData=[];
				uni.clearStorage();
				if(this.data.length<5){
					this.dis1 = false;
					this.dis2 = false;
				}
			},
			goBack(){
				var that = this;
				uni.redirectTo({
					url: that.url,
					success: res => {
						console.log("sucess");
						console.log(that.url);
					},
					fail: () => {
						console.log("fail");
						console.log(that.url);
					},
					complete: () => {}
				});
			},
			addOne(){
				var that = this;
				that.info = {};
				if(that.data.length <5){
					that.dis1 = false;
					that.dis2 = false;
					if (that.pid == 1) {
						var array1 = new Array(33).fill(0).map((v,i)=>i+1).sort(()=>0.5 - Math.random()).filter((v,i)=>i<6).sort(function(a,b){return a-b});
						var array2 = new Array(16).fill(0).map((v,i)=>i+1).sort(()=>0.5 - Math.random()).filter((v,i)=>i<1).sort(function(a,b){return a-b});
						array1 = array1.map(function(item){if(item<10){return '0'+item}else{return item+""}});
						array2 = array2.map(function(item){if(item<10){return '0'+item}else{return item+""}});
						var sumArr="ds-";
						that.info.shape="单式";
						var allBall=null;
						allBall=sumArr+array1.toString()+"|"+ array2[0] + '-1';
						allBall=allBall.replace("-,","-").replace(",|,","|").replace(",-","-");
						that.info.val=allBall;
						that.info.zhu=1;
						that.info.money=2;
						that.data.push(JSON.stringify(that.info));
						that.info.redBall = array1.join(" ").concat(" ");
						that.info.blueBall = array2[0];
						that.betData.push(that.info)
					}else if(that.pid == 2){
						var sumArr="ds-";
						that.info.shape="单式";
						var allBall=null;
						that.info.zhu=1;
						that.info.money=2;
						var arr2 = '';
						console.log(that.cid);
						if(that.cid=="zhixuan"){
							var a1 = Math.floor(Math.random()*10);
							var a2 = Math.floor(Math.random()*10);
							var a3 = Math.floor(Math.random()*10);
							arr2 = a1 + "," + a2 + "," + a3;
							
						}else if(that.cid=="zusan"){
							console.log("zusan");
							var a1 = Math.floor(Math.random()*10);
							var a2 = Math.floor(Math.random()*10);
							arr2 = a1 + "," + a2 + "," + a2;
						}else if(that.cid=="zuliu"){
							var array1 = new Array(9).fill(0).map((v,i)=>i+1).sort(()=>0.5 - Math.random()).filter((v,i)=>i<4).sort(function(a,b){return a-b});
							arr2 = array1[0]+','+array1[1]+','+array1[2]
						}
						allBall=sumArr+arr2+"|" + '-1';
						console.log(allBall);
						allBall=allBall.replace("-,","-").replace(",|,","|").replace(",-","-");
						that.info.val=allBall;
						that.data.push(JSON.stringify(that.info));
						that.info.redBall = arr2.replace(/,/g," ");
						that.betData.push(that.info)
					}
					uni.setStorageSync("message",JSON.stringify(that.data))
				}else if(that.data.length == 5){
					that.dis1 = true;
					that.dis2 = true;
				}
				
			}
		},
		onBackPress:function(options) {
			if(this.showMask) {  
			 this.showMask = false;  
			 return true;  
		   }else{  
			  uni.showModal({  
				title: '提示',  
				content: '是否退出uni-app？',  
				success: function(res) {  
					if (res.confirm) {  
						// 退出当前应用，改方法只在App中生效  
						plus.runtime.quit();  
					} else if (res.cancel) {  
						console.log('用户点击取消');  
					}  
				}  
			  });  
			  return true  
		   }  
		},
		onLoad(options) {
			var that = this;
			this.currentDate = options.currentDate;
			this.currentTerm = options.currentTerm;
			that.pid = uni.getStorageSync("pid");
			that.cid = uni.getStorageSync("cid");
			that.data = uni.getStorageSync("message")?JSON.parse(uni.getStorageSync("message")):[];
			for (var i = 0; i < that.data.length; i++) {
				that.betData.push(JSON.parse(that.data[i]));
				console.log(that.betData[i].val);
			
				if(that.pid == 1){
					// var divide = that.data[i].val.indexOf("|")
					that.betData[i].redBall = that.betData[i].val.slice(3,that.betData[i].val.indexOf("|")).concat(" ").replace(/,/g," ");
					that.betData[i].blueBall = that.betData[i].val.slice(that.betData[i].val.indexOf("|")+1,that.betData[i].val.lastIndexOf("-"));
					that.url="../ssqBet/ssqBet"
				}else if(that.pid == 4){
					that.betData[i].redBall = that.betData[i].val.slice(3,that.betData[i].val.indexOf("|")-1).concat(" ").replace(/,/g," ");
					that.url="../qlcBet/qlcBet";
				}else if(that.pid == 2){
					if(that.cid=="zhixuan"){
						that.url="../fc3dBet/zhixuan/zhixuan";
					}else if(that.cid== "zusan"){
						that.url="../fc3dBet/zusan/zusan";
					}else if(that.cid == "zuliu"){
						that.url="../fc3dBet/zuliu/zuliu";
					}
					that.betData[i].redBall = that.betData[i].val.slice(3,8).replace(/,/g," ");
				}
			}
			console.log(that.data.length);
			if(that.data.length==5){
				that.dis1 = true;
				that.dis2 = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-page{
	>.current-info{
		height: 70upx;
		display: flex;
		align-items: center;
		background-color: #FFF7CC;
		padding: 0 20upx;
		color: #333;
	}
	#btn-group{
		margin: 20upx;
		display: flex;
		font-size: 24upx;
	}
	#bet-detail{
		background-color: #F5F7FB;
		border-radius: 5px;
		margin: 20upx;
		.bet-info-li{
			position: relative;
			padding: 20upx;
			border-bottom: 1px #ddd solid;
			.bet-num{
				font-size: 34upx;
				color: #DC504E;
			}
			image{
				position: absolute;
				right: 30upx;
				top: 50%;
				transform: translateY(-50%);
				width: 50upx;
				height: 50upx;
			}
		}
	}
	#bet-info{
		box-sizing: border-box;
		padding: 0 20upx;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-flow: row nowrap;
		background-color: #f2f3f9;
		#bet-multiple{
			border:1px #DC504E solid;
			padding:0 15upx;
			background-color: #fff;
			border-radius: 5px;
		}
		#btn-sure{
			background-color: #DC504E;
			font-size: 32upx;
			border-radius: 5px;
			color: #fff;
			width: 160upx;
			text-align: center;
			height: 60upx;
			line-height: 60upx;
		}
	}
}
</style>
