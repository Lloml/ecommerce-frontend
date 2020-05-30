<template>
  <el-table :data="tableData">
    <el-table-column prop="id" label="id"> </el-table-column>
    <el-table-column prop="nickName" label="昵称"> </el-table-column>
    <el-table-column prop="username" label="用户名"> </el-table-column>
    <el-table-column prop="pic" label="图片" width="200">
      <template slot-scope="scope">
        <img width="128px" :src="scope.row.icon" />
      </template>
    </el-table-column>
    <el-table-column prop="email" label="邮箱"> </el-table-column>
  </el-table>
</template>

<script>
import axios from "../api";

export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      axios.get("/api/admin").then(res => {
        this.tableData = res.data.data;
      });
    }
  }
};
</script>

<style scoped></style>
