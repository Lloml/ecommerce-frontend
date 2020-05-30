<template>
  <el-table :data="tableData">
    <el-table-column prop="id" label="id"> </el-table-column>
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="value" label="路径"></el-table-column>
    <el-table-column label="标签" width="200">
      <template slot-scope="scope">
        <el-form>
          <el-form-item label="是否启用">
            <el-switch v-model="scope.row.status"></el-switch>
          </el-form-item>
        </el-form> </template></el-table-column></el-table
></template>

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
      axios.get("/api/adminPermission").then(res => {
        this.tableData = res.data.data;
      });
    }
  }
};
</script>

<style scoped></style>
