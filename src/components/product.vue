<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="编号" width="180"> </el-table-column>
    <el-table-column prop="pic" label="图片" width="200">
      <template slot-scope="scope">
        <img width="128px" :src="scope.row.pic" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称" width="300"> </el-table-column>
    <el-table-column prop="price" label="价格" width="300"> </el-table-column>
    <el-table-column label="标签" width="200">
      <template slot-scope="scope">
        <el-form>
          <el-form-item label="是否上架">
            <el-switch v-model="scope.row.publishStatus"></el-switch>
          </el-form-item>
          <el-form-item label="新品">
            <el-switch v-model="scope.row.newStatus"></el-switch>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "../api/index";
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("/api/product/list", {}).then(res => {
        this.tableData = res.data.data;
      });
    }
  }
};
</script>

<style scoped></style>
