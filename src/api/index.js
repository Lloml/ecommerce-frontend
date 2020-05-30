/***
 * Created by Simple on 2018/1/14 0014.
 * Http请求控制器模块
 */

import axios from "axios";
import store from "../store/index";
import router from "../router/index";
import { Loading, Message } from "element-ui";

// axios 配置
axios.defaults.timeout = 15000;
// 配置通用请求动画
let loading = null;

axios.defaults.baseURL = "http://127.0.0.1:8089";
axios.interceptors.request.use(
  config => {
    console.time("ajax请求耗时");
    if (store.state.token !== "") {
      config.headers.Authorization = "Bearer " + store.getters.getToken;
    }

    loading = Loading.service({
      lock: true,
      text: "拼命加载中...",
      background: "rgba(255, 255, 255, .6)"
    });
    config.headers["origin"] = "http://localhost:8080/login";
    return config;
  },
  err => {
    loading.close();
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response && response.data) {
      switch (response.data.code) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit("setToken", "");
          Message.error({
            message: "身份过期，请重新登录"
          });

          setTimeout(() => {
            router.push({
              path: "/login"
            });
          }, 1200);
          break;
        //无权限
        case 403:
          router.replace({
            name: "noAuth",
            query: { redirect: router.currentRoute.fullPath }
          });
      }
    }
    loading.close();
    console.timeEnd("ajax请求耗时");
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit("setToken", "");
          router.push({
            path: "/login"
          });
          break;

        //无权限
        case 403:
          router.replace({
            name: "noAuth",
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
      }
    }
    loading.close();
    console.log(error);
    Message.error(String(error));
    return Promise.reject(error);
  }
);

export default axios;
