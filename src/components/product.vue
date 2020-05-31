<template>
  <avue-crud
    :data="tableData"
    v-model="form"
    :option="option"
    @row-save="rowSave"
    @row-update="rowUpdate"
    @row-del="rowDel"
  >
    <template slot="pic" slot-scope="scope">
      <img :src="scope.row.pic" width="100px" />
    </template>
  </avue-crud>
</template>

<script>
import axios from "../api/index";
export default {
  data() {
    return {
      tableData: [],
      form: {},
      option: {
        title: "产品",
        page: false,
        align: "center",
        menuAlign: "center",
        border: true,
        column: [
          {
            label: "货号",
            prop: "productSn"
          },
          {
            label: "名称",
            prop: "name"
          },
          {
            label: "图片",
            prop: "pic",
            slot: true
          },
          {
            label: "价格(￥)",
            prop: "price"
          },
          {
            label: "是否上架",
            prop: "publishStatus",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: 0
              },
              {
                label: "是",
                value: 1
              }
            ]
          },
          {
            label: "是否新品",
            prop: "newStatus",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: 0
              },
              {
                label: "是",
                value: 1
              }
            ]
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
      axios.get("/api/product", {}).then(res => {
        this.tableData = res.data.data;
      });
    },
    rowSave(row, done, loading) {
      axios
        .post("/api/product", row)
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
        .put("/api/product", row)
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
        .delete("/api/product/" + row.id)
        .then(() => {
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(e => {
          this.$message.error(String(e));
        });
    }
  },
  computed: {
    getHeight() {
      return window.innerHeight - 58;
    }
  }
};
</script>

<style scoped></style>
