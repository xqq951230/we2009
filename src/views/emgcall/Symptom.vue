<template>
	<div id="symptom">
		<my-navbar title="电话急诊"/>
		<img src="@/assets/images/emgcall/3362051587051885721-22.png" alt="" />

		<van-field
			v-model="message"
			type="textarea"
			placeholder="简要描述你的年龄、性别及症状，我们将为你接通对症的专科医生，并确保隐私安全"
			maxlength="500"
			show-word-limit
            @blur="saveMsg"
		/>

		<div class="img-upload">
			<van-uploader v-model="fileList" multiple :max-count="9" 
            :max-size="10 * 1024 * 1024" @oversize="onOversize"
            :before-read="beforeRead"
            />
			<div class="uploader-description" v-if="isDescShow">
				上传图片辅助说明病情
				<br />
				可上传 9 张
			</div>
			<van-cell value=" 无法上传图片？ " @click="showAnswer" />
		</div>
		<div class="next-btn">
			<van-button size="large" color="#00c792" round @click="next"
				>下一步</van-button
			>
		</div>
		<van-overlay :show="overlayShow">
			<div class="overlay-wrapper">
				<div class="tit">请提问后通过丁香医生App上传图片</div>
				<div class="desc">
					由于第三方或浏览器版本限制，图片可能无法上传。请先提交问题。医生回复后，【下载丁香医生App在“我的问诊”内追问并上传图片】，点击下方链接进行下载（若无法下载，请复制链接到浏览器粘贴）
					<br />
					<a src="https://app.dxy.cn/aspirin/index">https://app.dxy.cn/aspirin/index</a>
				</div>
				<div class="btn" @click="closeBtn">我知道了</div>
			</div>
		</van-overlay>
	</div>
</template>

<script>
import { Toast, Dialog } from "vant";
export default {
	data() {
		return {
			message: "",
			fileList: [],
			isDescShow: true,
			overlayShow: false,
		};
	},
	watch: {
		fileList(newVal) {
			if (newVal.length > 0) {
				this.isDescShow = false;
			} else {
				this.isDescShow = true;
			}
		},
    },
    mounted(){
        this.message = localStorage.getItem('symptomDesc')
    },
	methods: {
        beforeRead(file) {
			if (file.type !== "image/jpeg" && file.type !== "image/png") {
				this.$toast("请上传 jpg/png 格式图片");
				return false;
			}
			return true;
		},
        onOversize(){
            Toast('文件大小不能超过10M');
        },
        saveMsg(){
            localStorage.setItem('symptomDesc', this.message)
        },
		showAnswer() {
			this.overlayShow = true;
		},
		next() {
			if (!this.$store.state.userInfo) {
				Dialog.confirm({
					title: "未登录",
					message: "是否前往登录？",
				})
					.then(() => {
						this.$router.push("/login");
					})
					.catch(() => {
						// on cancel
                });
                return;
			}

			if (this.message.length <= 10) {
				Toast("请至少输入10个字");
				return false;
			}
            
			let formData = new FormData();
			[...this.fileList].forEach(item => {
				let byteString = atob(
					item.content.replace(/^data:image\/\w+;base64,/, "")
				);
				let mimeString = item.content
					.split(",")[0]
					.split(":")[1]
					.split(";")[0];
				let ab = new ArrayBuffer(byteString.length);
				let ia = new Uint8Array(ab);
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				let blob = new Blob([ia], { type: mimeString });
				formData.append("uploadFile", blob, Date.now() + ".jpg");
            });
            // [...this.fileList].forEach(item => {
            //     formData.append("uploadFile", item);
            // });
			formData.append("userid", this.$store.state.userInfo.user_id);
			formData.append("desc", this.message);
			formData.append("create_at", Date.parse(new Date()));
			this.axios
				.post("/emgcall/addsymptomimg", formData)
				.then(res => {
					if (res.data.code == 0) {
                        localStorage.setItem('symid', res.data.data.symptom_id)
						this.$router.push("/emgcall/patient-list");
					} else {
						Toast(res.data.message);
					}
				})
				.catch(reason => {
					console.log(reason);
				});
		},
		closeBtn() {
			this.overlayShow = false;
		},
	},
};
</script>

<style scoped>
#symptom >>> .overlay-wrapper .btn::after {
	position: absolute;
	top: -1px;
	left: 0;
	display: block;
	width: 100%;
	height: 1px;
	border-top: 1px solid #d9d9d9;
	-webkit-transform: scaleY(0.5);
	-ms-transform: scaleY(0.5);
	transform: scaleY(0.5);
	-webkit-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	transform-origin: 0 100%;
	content: "";
}

#symptom >>> .overlay-wrapper .btn {
	position: relative;
	color: #1a9f8c;
	padding: 20px 0;
}

#symptom >>> .overlay-wrapper .desc a {
	color: #00c792;
	text-decoration: none;
	line-height: 20px;
}

#symptom >>> .overlay-wrapper .desc {
	padding: 15px 4%;
	color: #666;
	font-size: 14px;
	word-wrap: break-word;
	word-break: break-all;
	line-height: 20px;
}
#symptom >>> .overlay-wrapper .tit {
	padding-top: 10px;
	font-weight: 400;
	font-size: 16px;
}

#symptom >>> .overlay-wrapper {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 112;
	width: 86%;
	max-width: 300px;
	overflow: hidden;
	text-align: center;
	background-color: #fff;
	border-radius: 6px;
}

#symptom >>> .next-btn {
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 10px 16px;
}

#symptom >>> .img-upload .van-cell {
	padding: 0;
	margin-top: 10px;
}

#symptom >>> .img-upload .van-cell span {
	color: #00c792;
	font-size: 12px;
	background-color: #fff;
}

#symptom > img {
	width: 100%;
}

#symptom .img-upload {
	position: relative;
	padding: 4% 10px 4%;
}

#symptom .img-upload::after {
	content: "";
	display: block;
	position: absolute;
	left: 0;
	height: 1px;
	width: 100%;
	background-color: #ebebeb;
	transform: scaleY(0.5);
}

#symptom .img-upload::after {
	bottom: 0;
}

#symptom >>> .img-upload .van-uploader__preview {
	/* flex: 0 0 0.25; */
	margin-bottom: 8px;
}

#symptom >>> .img-upload .van-uploader__preview-delete {
	left: -5px;
	top: -5px;
	width: 18px;
	height: 18px;
	background-color: #00cc96;
	border-radius: 50%;
	border: 2px solid #fff;
}

#symptom >>> .img-upload .van-uploader__preview-delete > i {
	line-height: 18px;
	text-align: center;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	position: relative;
	transform: scale(1);
}

#symptom >>> .img-upload .van-uploader__preview-image img {
	border-radius: 4px;
}

#symptom >>> .img-upload .uploader-description {
	position: absolute;
	height: 80px;
	top: 37px;
	left: 110px;
	font-size: 12px;
	line-height: 20px;
	color: #999;
}
</style>
