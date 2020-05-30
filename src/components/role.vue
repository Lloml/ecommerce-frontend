<template>
  <el-table :data="tableData">
    <el-table-column prop="id" label="id"> </el-table-column>
    <el-table-column prop="name" label="名称"> </el-table-column>
    <el-table-column prop="description" label="描述"> </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="200"
      :formatter="
        (row, column, cellValue) => {
          let da = new Date(cellValue);
          let year = da.getFullYear() + '年';
          let month = da.getMonth() + 1 + '月';
          let date = da.getDate() + '日';
          return [year, month, date].join('-');
        }
      "
    >
    </el-table-column>
    <el-table-column label="标签" width="200">
      <template slot-scope="scope">
        <el-form>
          <el-form-item label="是否启用">
            <el-switch v-model="scope.row.status"></el-switch>
          </el-form-item>
        </el-form>
      </template> </el-table-column></el-table
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
      axios.get("/api/AdminRole").then(res => {
        this.tableData = res.data.data;
      });
    }
  }
};
</script>

<style scoped></style>
