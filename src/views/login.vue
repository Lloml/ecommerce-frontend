<template>
  <div style="width: 600px;margin: 0 auto;top: 30%;position: relative">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="{
        username: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }]
      }"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-link type="primary" style="margin-left: 300px" href="/register"
          >没有账户？点此处注册</el-link
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "../api/index";

export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          axios
            .post("/api/login", {
              username: this.form.username,
              password: this.form.password
            })
            .then(
              res => {
                this.$store.commit("setToken", res.data["jwtToken"]);
                localStorage.setItem("token", res.data["jwtToken"]);
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data["data"])
                );
                if (res.data.code === 200) {
                  this.$router.replace("/");
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
                return res.data;
              },
              e => {
                if (e.response.status === 400) {
                  this.$message.error("账号或者密码错误");
                } else {
                  this.$message.error(String(e));
                }
              }
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped></style>
