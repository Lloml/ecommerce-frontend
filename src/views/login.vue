<template>
  <div style="width: 600px;margin: 200px auto auto;">
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
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
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
