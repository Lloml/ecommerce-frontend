<template>
  <div>
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
      <el-table-column label="操作">
        <template slot-scope="scope"
          ><el-button
            type="primary"
            v-if="scope.row.status === 1"
            @click="deliverDialog(scope.row)"
            >发货</el-button
          >
          <el-button
            type="primary"
            v-if="scope.row.status === 2"
            @click="deliverDialog(scope.row)"
            >修改物流</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="订单发货"
      :visible.sync="deliverDialogVisible"
      width="30%"
    >
      <el-form :model="currentOrder">
        <el-form-item label="物流公司" prop="deliveryCompany">
          <el-input v-model="currentOrder.deliveryCompany"></el-input>
        </el-form-item>
        <el-form-item label="物流单号" prop="deliverySn">
          <el-input v-model="currentOrder.deliverySn"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deliverDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deliver">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../api";

export default {
  data() {
    return {
      tableData: [],
      deliverDialogVisible: false,
      currentOrder: { deliverySn: "", deliveryCompany: "" }
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
    },
    deliverDialog(order) {
      this.deliverDialogVisible = true;
      this.currentOrder = order;
    },
    deliver() {
      this.currentOrder.status = 2;
      axios.put("/api/order", this.currentOrder).then(
        () => {
          this.$message.success("发货成功");
          this.deliverDialogVisible = false;
        },
        e => {
          this.$message.error(String(e));
        }
      );
    }
  }
};
</script>

<style scoped></style>
