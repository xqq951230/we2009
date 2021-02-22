<template>
	<div id="login" :style="{ height: clientHeight }">
		<div class="container">
			<el-form
				:model="ruleForm"
				status-icon
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
			>
				<el-form-item label="用户名" prop="username">
					<el-input
						v-model="ruleForm.username"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input
						type="password"
						v-model="ruleForm.password"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>提交</el-button
					>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		var validateUser = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入账号"));
			} else {
				callback();
			}
		};
		var validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				if (!this.passWordReg.test(value)) {
					callback(
						new Error("密码必须为6位以上字母开头的字母数字组合")
					);
				}
				callback();
			}
		};
		return {
			passWordReg: /^[a-zA-Z][a-zA-Z0-9]{5,}/,
			clientHeight: "",
			ruleForm: {
				username: 'admin',
				password: 'zd123456',
			},
			rules: {
				username: [{ validator: validateUser, trigger: "blur" }],
				password: [{ validator: validatePass, trigger: "blur" }],
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    console.log(valid)
                    localStorage.setItem("hasLogin", true);
                    this.$router.push('/');
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
	mounted() {
		this.clientHeight = document.documentElement.clientHeight + "px";
	},
};
</script>

<style scoped lang="scss">
$mainColor: #2d3a4b;

#login {
	background-color: $mainColor;
	width: 100%;
	position: relative;
	.container {
		width: 500px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
