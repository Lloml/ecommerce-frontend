<template>
  <avue-crud
    :data="tableData"
    v-model="form"
    :option="option"
    @row-save="rowSave"
    @row-update="rowUpdate"
    @row-del="rowDel"
  >
  </avue-crud>
</template>

<script>
import axios from "../api";
export default {
  data() {
    return {
      tableData: [],
      form: {},
      option: {
        title: "权限",
        page: false,
        align: "center",
        menuAlign: "center",
        border: true,
        index: "序号",
        column: [
          {
            label: "名称",
            prop: "name"
          },
          {
            label: "路径",
            prop: "value"
          },
          {
            label: "创建时间",
            prop: "createTime",
            disabled: true,
            type: "date",
            display: false,
            formatter: (row, column, cellValue) => {
              if (!cellValue || cellValue === "") {
                return "";
              }
              let da = new Date(cellValue);
              let year = da.getFullYear() + "年";
              let month = da.getMonth() + 1 + "月";
              let date = da.getDate() + "日";
              return [year, month, date].join("-");
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get("/api/adminPermission", {}).then(res => {
        this.tableData = res.data.data;
      });
    },
    rowSave(row, done, loading) {
      axios
        .post("/api/adminPermission", row)
        .then(() => {
          this.$message.success("新增成功");
          done();
          this.getList();
        })
        .catch(e => {
          this.$message.error(String(e));
          loading();
        });
    },
    rowUpdate(row, index, done, loading) {
      axios
        .put("/api/adminPermission", row)
        .then(() => {
          this.$message.success("修改成功");
          done();
          this.getList();
        })
        .catch(e => {
          this.$message.error(String(e));
          loading();
        });
    },
    rowDel(row) {
      axios
        .delete("/api/adminPermission/" + row.id)
        .then(() => {
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(e => {
          this.$message.error(String(e));
        });
    }
  }
};
</script>

<style scoped></style>
