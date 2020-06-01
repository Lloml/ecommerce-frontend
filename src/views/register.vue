<template>
  <div style="width: 600px;margin: 0 auto;top: 20%;position: relative">
    <el-form
      ref="registerForm"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          show-password
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码" prop="checkPassword">
        <el-input
          v-model="form.checkPassword"
          show-password
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="form.phoneNumber"
          ><el-button slot="append" @click="getVerificationCode">{{
            buttonContent
          }}</el-button></el-input
        >
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input v-model="form.verificationCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "../api";

export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPassword !== "") {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        checkPassword: "",
        phoneNumber: "",
        verificationCode: ""
      },
      rules: {
        username: [{ required: true, message: "用户名不能为空" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        phoneNumber: [
          {
            pattern: /^1[3456789]\d{9}$/,
            required: true,
            message: "请输入正确的电话"
          }
        ],
        verificationCode: [
          {
            pattern: /^\d{6}$/,
            required: true,
            message: "请输入六位验证码"
          }
        ]
      },
      buttonContent: "发送验证码"
    };
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          axios.post("/api/register", this.form).then(
            res => {
              if (res.data.code === 200) {
                this.$message.success("注册成功，请登录");
                this.$router.replace("/");
                return res.data;
              } else {
                this.$message.error(res.data.message);
                return res.data;
              }
            },
            e => {
              this.$message.error(String(e));
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getVerificationCode() {
      this.$refs.registerForm.validateField("phoneNumber", valid => {
        console.log(valid);
        if (valid === "") {
          axios
            .post("/api/register/getVerificationCode", {
              phoneNumber: this.form.phoneNumber
            })
            .then(
              res => {
                if (res.data["code"] === 200) {
                  this.$message.success("验证码发送成功");
                } else {
                  this.$message.error(res.data["message"]);
                }
                this.countDown(60);
              },
              e => {
                this.$message.error(String(e));
                this.countDown(60);
              }
            );
        }
      });
    },
    countDown(i) {
      i = i - 1;
      this.buttonContent = i + "秒后重新发送";
      if (i === 0) {
        this.buttonContent = "重新发送";
        return;
      }
      setTimeout(() => {
        this.countDown(i);
      }, 1000);
    }
  }
};
</script>

<style scoped></style>
