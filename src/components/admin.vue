<template>
  <avue-crud
    :data="tableData"
    v-model="form"
    :option="option"
    @row-save="rowSave"
    @row-update="rowUpdate"
    @row-del="rowDel"
  >
    <template slot="role" slot-scope="scope">
      <RoleSelect :id="scope.row.id"></RoleSelect>
    </template>
    <template slot="icon" slot-scope="scope">
      <img :src="scope.row.icon" width="100px" />
    </template>
  </avue-crud>
</template>

<script>
import axios from "../api";
import RoleSelect from "./RoleSelect";
export default {
  components: { RoleSelect },
  data() {
    return {
      tableData: [],
      form: {},
      option: {
        title: "用户",
        page: false,
        align: "center",
        menuAlign: "center",
        border: true,
        index: "序号",
        column: [
          {
            label: "用户名",
            prop: "username",
            editDisabled: true
          },
          { label: "密码", prop: "password", hide: true, editDisplay: false },
          {
            label: "昵称",
            prop: "nickName"
          },
          {
            label: "图片",
            prop: "icon",
            slot: true
          },
          {
            label: "邮箱",
            prop: "email"
          },
          {
            label: "角色配置",
            prop: "role",
            slot: true,
            width: "400px",
            display: false
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
      axios.get("/api/admin", {}).then(res => {
        this.tableData = res.data.data;
      });
    },
    rowSave(row, done, loading) {
      axios
        .post("/api/admin", row)
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
        .put("/api/admin", row)
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
        .delete("/api/admin/" + row.id)
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
