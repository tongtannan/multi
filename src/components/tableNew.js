// import CommonInterface from '@/utils/interface';
// const NewInterface = new CommonInterface('/' + new Date().getTime() + '/');
let NewInterface = null;

export default {
  beforeCreate() {
    const { CommonInterface } = this;
    NewInterface = new CommonInterface();
  },
  created() {
    const { noLoadInit, tr } = this.propTable;
    // 初始化table
    !noLoadInit && this.init();
    // 初始化空表单
    const emptyFormObj = Object.create(null);
    for (const val of tr) {
      const { prop } = val;
      emptyFormObj[prop] = '';
    }
    this['emptyFormObj'] = emptyFormObj;
  },
  mounted() {
    // 获取表单下拉框/radio等数据
    const { selectOptions } = this;
    if (Object.keys(selectOptions).length) {
      for (const key in selectOptions) {
        const value = selectOptions[key];
        const url = value['url'];
        url &&
          NewInterface.get(url).then(res => {
            value['options'] = res;
          });
      }
    }
  },
  beforeDestroy() {
    NewInterface.cancelToken();
  },
  methods: {
    // table数据请求方法
    init() {
      let method = 'get';
      const {
        loading,
        initMethod,
        initSrc,
        initProp,
        rebuildData,
        pageTotalProp,
        hidePage
      } = this.propTable;
      if (loading) {
        this.loading = true;
      }
      if (initMethod && initMethod !== 'get') {
        method = initMethod;
      }
      const { page, size } = this.page;
      const interfaceUrl = hidePage
        ? initSrc
        : `${initSrc}?page=${page}&size=${size}`;
      NewInterface[method](interfaceUrl, this.params)
        .then(res => {
          const tableData = res[initProp];
          if (rebuildData) {
            rebuildData(tableData);
          }
          this.propTable.data = tableData;
          this.totalElements = res[pageTotalProp];
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.page.page = val - 1;
      this.init();
    },
    // pageSize 改变时会触发
    handleSizeChange(size) {
      this.page = {
        page: 0,
        size
      };
      this.init();
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.selectionList = val;
      this.$emit('handleSelectionChange', val);
    },
    // 排序
    sortChange(val) {
      const order = val.order;
      this.page.field = val.prop;
      this.page.order = order === 'ascending' ? 'ASC' : 'DESC';
      this.init();
    },
    // 操作
    handleOperation(rowFun, row) {
      if (['defaultDelete', 'defaultModify', 'deleteline'].includes(rowFun)) {
        this[rowFun](row);
      } else {
        // 特殊操作
        this.$emit('emitOperation', {
          row,
          rowFun
        });
      }
    },
    // 新建
    handleNew() {
      this.formObj = JSON.parse(JSON.stringify(this.emptyFormObj));
      this.dialogTitle = '新建';
      this.dialogTableVisible = true;
    },
    // 批量删除
    handleDeleteRows() {
      const { selectionList } = this;
      if (selectionList.length) {
        const ids = selectionList.map(item => item.id).join(',');
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            NewInterface.post(this.propTable.batchDeleteSrc, {
              ids
            })
              .then(() => {
                this.init();
              })
              .catch(() => {});
          })
          .catch(() => {});
      } else {
        this.$message({
          type: 'error',
          message: '请先选择'
        });
      }
    },
    // 删除
    delete(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          NewInterface.delete(`${this.propTable.deleteSrc}${val.id}`)
            .then(() => {
              this.init();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    // 删除行（不发送请求）
    deleteline(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('deleteline', val);
        })
        .catch(() => {});
    },
    // 修改
    defaultModify(val) {
      this.formObj = val;
      this.dialogTitle = '修改';
      this.dialogTableVisible = true;
    },
    // 新建、修改提交
    handleSubmit() {
      console.log(this.formObj);
      this.$refs['defaultForm'].validate(valid => {
        if (valid) {
          const { dialogMethod, dialogSrc } = this.propTable;
          const interfaceMethod = dialogMethod || 'put';
          NewInterface[interfaceMethod](dialogSrc, this.formObj)
            .then(() => {
              this.init();
            })
            .catch(() => {})
            .finally(() => {
              this.dialogTableVisible = false;
            });
        } else {
          //   this.$message({
          //     type: 'error',
          //     message: '格式不正确'
          //   });
          return false;
        }
      });
    },
    // 搜索
    select(val) {
      console.log(val);
    },
    // 序号
    indexMethod(index) {
      return this.page.page * this.page.size + index + 1;
    },
    // 合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const { objectSpanMethod } = this.propTable;
      objectSpanMethod && objectSpanMethod(row, column, rowIndex, columnIndex);
      // examble
      // if (columnIndex === 0) {
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
      // this.$emit('onMergeRowOrColumn', {
      //   row,
      //   column,
      //   rowIndex,
      //   columnIndex
      // });
    },
    // 点击某个单元格时触发
    cellClick(row, column) {
      if (
        column.className === 'classname-from' ||
        column.className === 'classname-click'
      ) {
        this.$emit('cellClick', {
          val: row,
          label: column.label
        });
      }
    },
    // 点击某一行时触发的函数
    // *** 按下左键然后移动鼠标到其它列放开左键，会有报错 -- 优化：添加点击行参数，
    rowClick(row, event, column) {
      if (
        !column ||
        column.type === 'selection' ||
        column.columnKey === 'operation' ||
        column.type === 'expand'
      ) {
        return;
      }
      this.$emit('onRowClick', {
        row,
        event,
        column
      });
      // if (this.table.isClickChangeColor) {
      //   for (const val of document.querySelectorAll('.el-table tr')) {
      //     if (val.classList) {
      //       val.classList.remove('success-row');
      //     }
      //   }
      // if (document.querySelectorAll('.el-table tr').classList) {
      //     document.querySelectorAll('.el-table tr').classList.remove('success-row')
      //   }
      //   this.table.data.forEach((item, idx) => {
      //     if (Row == item) {
      //       document
      //         .querySelectorAll('.el-table__row')
      //         [idx].classList.add('success-row');
      //     }
      //   });
      // }
    },
    // 双击某一行时触发的函数
    rowDblclick(row, column, event) {
      if (
        !column ||
        column.type === 'selection' ||
        column.columnKey === 'operation' ||
        column.type === 'expand'
      ) {
        return;
      }
      this.$emit('onRowDbClick', {
        row,
        event,
        column
      });
    }
  }
};
