<template>
  <div style="margin-left: 20px;margin-right: 20px;">
    <el-select
      v-model="roleIds"
      multiple
      collapse-tags
      placeholder="请选择"
      style="margin-bottom: 20px"
    >
      <el-option
        v-for="item in roleList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-button type="primary" size="mini" @click="saveRoleIds"
      >保存选择</el-button
    >
  </div>
</template>

<script>
import axios from "../api";
export default {
  data() {
    return {
      roleList: [],
      roleIds: []
    };
  },
  props: {
    id: Number
  },
  methods: {
    getRoleList() {
      axios.get(`/api/AdminRole`).then(res => {
        this.roleList = res.data.data;
      });
    },
    getRoleIds() {
      axios.get(`/api/admin/${this.id}/role`).then(res => {
        this.roleIds = res.data.data.map(item => {
          return item.id;
        });
      });
    },
    saveRoleIds() {
      axios.put(`/api/admin/${this.id}/role`, this.roleIds).then(() => {
        this.$message.success("修改成功");
        this.getRoleIds();
      });
    }
  },
  mounted() {
    this.getRoleList();
    this.getRoleIds();
  }
};
</script>

<style scoped></style>
