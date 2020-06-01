<template>
  <div style="margin-left: 20px;margin-right: 20px;">
    <el-select
      v-model="permissionIds"
      multiple
      collapse-tags
      placeholder="请选择"
      style="margin-bottom: 20px"
    >
      <el-option
        v-for="item in permissionList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-button type="primary" size="mini" @click="savePermissionIds"
      >保存选择</el-button
    >
  </div>
</template>

<script>
import axios from "../api";
export default {
  data() {
    return {
      permissionList: [],
      permissionIds: []
    };
  },
  props: {
    id: Number
  },
  methods: {
    getPermissionList() {
      axios.get(`/api/adminPermission`).then(res => {
        this.permissionList = res.data.data;
      });
    },
    getPermissionIds() {
      axios.get(`/api/adminRole/${this.id}/permission`).then(res => {
        this.permissionIds = res.data.data.map(item => {
          return item.id;
        });
      });
    },
    savePermissionIds() {
      axios
        .put(`/api/adminRole/${this.id}/permission`, this.permissionIds)
        .then(() => {
          this.$message.success("修改成功");
          this.getPermissionIds();
        });
    }
  },
  mounted() {
    this.getPermissionList();
    this.getPermissionIds();
  }
};
</script>

<style scoped></style>
