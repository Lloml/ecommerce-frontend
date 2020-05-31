<template
  ><el-container style="height: 100%">
    <el-aside width="250px">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 100%"
        @select="selectItem"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品</span>
          </template>
          <el-menu-item index="product">商品列表</el-menu-item>
          <el-menu-item index="1-2" disabled>添加商品</el-menu-item>
          <el-menu-item index="1-3" disabled>商品分类</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单</span>
          </template>
          <el-menu-item index="order">订单列表</el-menu-item>
          <el-menu-item index="2-2" disabled>退货申请处理</el-menu-item>
          <el-menu-item index="2-3" disabled>退货原因处理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限</span>
          </template>
          <el-menu-item index="admin">用户</el-menu-item>
          <el-menu-item index="role">角色</el-menu-item>
          <el-menu-item index="permission">权限</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main style="overflow: auto">
      <div :is="currentView"></div>
    </el-main>
  </el-container>
</template>

<script>
import product from "../components/product";
import order from "../components/order";
import admin from "../components/admin";
import role from "../components/role";
import permission from "../components/permission";
export default {
  data() {
    return {
      currentView: "product"
    };
  },
  components: {
    product,
    order,
    admin,
    role,
    permission
  },
  methods: {
    selectItem(index) {
      this.currentView = index;
      console.log(index);
    }
  },
  computed: {
    getHeight() {
      return window.innerHeight - 25;
    }
  }
};
</script>
