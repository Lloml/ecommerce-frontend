<template>
  <el-table :max-height="750" :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="编号" width="180"> </el-table-column>
    <el-table-column prop="orderSn" label="订单编号" width="300">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="提交时间"
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
    <el-table-column
      prop="payAmount"
      label="订单金额"
      width="200"
      :formatter="
        (row, column, cellValue) => {
          return cellValue + ' $';
        }
      "
    >
    </el-table-column>
    <el-table-column
      prop="payType"
      label="支付方式"
      width="200"
      :formatter="
        (row, column, cellValue) => {
          if (cellValue === 0) {
            return '未支付';
          }
          if (cellValue === 1) {
            return '支付宝';
          }
          if (cellValue === 2) {
            return '微信';
          }
        }
      "
    >
    </el-table-column>
    <el-table-column
      prop="status"
      label="订单状态"
      width="200"
      :formatter="
        (row, column, cellValue) => {
          if (cellValue === 0) {
            return '待付款';
          }
          if (cellValue === 1) {
            return '待发货';
          }
          if (cellValue === 2) {
            return '已发货';
          }
          if (cellValue === 3) {
            return '已完成';
          }
          if (cellValue === 4) {
            return '已关闭';
          }
          if (cellValue === 5) {
            return '无效订单';
          }
        }
      "
    >
    </el-table-column>
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
    this.getData();
  },
  methods: {
    getData() {
      axios.get("/api/order/list", {}).then(res => {
        this.tableData = res.data.data;
      });
    }
  }
};
</script>

<style scoped></style>
