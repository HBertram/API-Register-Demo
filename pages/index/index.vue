<template>
	<view class="content">
		<h3 class="title">配置式 RESTFUL Api 使用示例</h3>
		<uni-card title="注册新API">
			<form @submit="formSubmit">
				<view class="input-item">
					<view class="">API名称</view>
					<input class="input" v-model="newApi.name" name="name" placeholder="输入API名称" />
				</view>
				<view class="input-item">
					<view class="">请求方法</view>
					<input class="input" v-model="newApi.method" name="method" placeholder="请求方法" />
				</view>
				<view class="input-item">
					<view class="">URL地址</view>
					<input class="input" v-model="newApi.url" name="url" placeholder="URL地址" />
				</view>
				<view class="uni-btn-v">
					<button @click="confirm">生成</button>
				</view>
			</form>
		</uni-card>
		<uni-list v-for="registerApi in registerd">
			<uni-section :title="registerApi.name"></uni-section>
			<uni-list-item title="请求类型" :rightText="registerApi.method" :show-arrow="false"></uni-list-item>
			<uni-list-item v-if="registerApi.url" title="URL" :rightText="API_URL + '/' + registerApi.url" :show-arrow="false"></uni-list-item>
			<uni-list-item v-if="registerApi.urlFunc" title="URL函数" :rightText="API_URL + '/' + registerApi.urlFunc({id:1,page:0,size:5})" :show-arrow="false"></uni-list-item>
			<uni-list-item :show-arrow="false">
				<button class="btn" @click="testApi(registerApi.name)">点击测试</button>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import { API_URL, registerApis } from "@/api/api.js"
	import registerd from "@/api/apisToRegister"
	export default {
		data() {
			return {
				registerd: registerd,
				API_URL: API_URL,
				newApi: {
					method: "get",
					name: "test",
					url: "https://kunpeng.csdn.net/ad/template/1618?positionId=426&queryWord="
				}
			}
		},
		onLoad() {

		},
		methods: {
			registerApis: registerApis,
			showFunc(func) {
				uni.showModal({
					content: func.toString(),
					showCancel: false
				})
			},
			confirm() {
				this.$set(this.registerd, this.newApi.name, {...this.newApi})
				this.$set(this.api, this.newApi.name, this.registerApis([{ ...this.newApi }])[0])
			},
			testApi(name) {
				this.api[name]({id: 1, page: 0, size: 5}).then(r => {
					uni.showModal({
						title: "api." + name + "测试成功",
						showCancel: false,
						content: JSON.stringify(r)
					})
				}).catch(e => {
					uni.showModal({
						title: "api." + name + "测试失败",
						showCancel: false,
						content: JSON.stringify(e)
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx;
		justify-content: center;
		.title {
			margin: 80rpx auto;
		}
		.btn {
			width: 100%;
		}
		.input-item {
			margin: 15rpx 0;
			border-bottom: 1px solid #c2c2c2;
			.input {
				margin: 20rpx 0;
			}
		}
	}
</style>
