<template>
  <div class="el-table-package">
    <template>
      <p v-if="propTable.isDefaultHandles" class="table-row__handle">
        <el-button type="primary " icon="el-icon-plus" @click="handleNew"
          >新建</el-button
        >
        <el-button type="danger" icon="el-icon-delete" @click="handleDeleteRows"
          >删除</el-button
        >
      </p>
      <el-table
        :stripe="!propTable.hideStripe"
        :show-summary="propTable.hasShowSummary"
        :summary-method="propTable.getSummaries"
        ref="elTable"
        :data="propTable.data"
        tooltip-effect="dark"
        :border="propTable.border"
        style="width: 100%"
        :row-class-name="propTable.rowClassName"
        :span-method="objectSpanMethod"
        header-row-class-name="thClassName"
        :class="{ elTableNoneBorder: propTable.noneBorder }"
        @selection-change="handleSelectionChange"
        @cell-click="cellClick"
        @sort-change="sortChange"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column
          v-if="propTable.isSelection"
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          type="index"
          width="40"
          v-if="propTable.index"
          :label="propTable.indexName"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column type="expand" v-if="propTable.hasExpand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item
                :label="item.label"
                v-for="item in propTable.expands"
                :key="item.key"
              >
                <span>{{ props.row[item.prop] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <template v-for="(item, idx) in propTable.tr">
          <el-table-column
            v-if="item.show === 'template'"
            :label="item.label"
            :class-name="item.className"
            :key="'tr-' + idx"
            :sortable="item.sortable ? 'custom' : false"
            :width="item.width"
            :min-width="item.minWidth"
            :header-align="item.headerAlign || 'center'"
            :align="item.align || 'left'"
          >
            <template slot-scope="scope">
              <slot
                :item="scope.row[item.prop] ? scope.row : scope.row"
                :name="item.prop"
              ></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.show && item.show !== 'template'"
            :label="item.label"
            :prop="item.prop"
            :class-name="item.className"
            :key="'tr-' + idx"
            :sortable="item.sortable || false"
            :width="item.width"
            :min-width="item.minWidth"
            :show-overflow-tooltip="item.tooltip"
            :header-align="item.headerAlign || 'center'"
            :align="item.align || 'left'"
          >
          </el-table-column>
        </template>
        <el-table-column
          column-key="operation"
          :label="propTable.operation.label"
          :width="propTable.operation.width"
          :min-width="propTable.operation.minWidth"
          :class-name="propTable.operation.className"
          :resizable="false"
          :header-align="propTable.tr[0].headerAlign || 'center'"
          v-if="propTable.hasOperation"
        >
          <template slot-scope="scope">
            <el-button
              v-for="(item, iOpera) in propTable.operation.data"
              :class="item.classname"
              :key="'btn-' + iOpera"
              :size="item.size"
              :type="item.type"
              :icon="item.icon - align - justify"
              @click.stop="handleOperation(item.Fun, scope.row)"
            >
              {{ item.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.page + 1"
      :page-sizes="[5, 10, 20, 30, 40]"
      :page-size="page.size"
      layout=" prev, pager, next, sizes"
      v-if="!propTable.hidePage"
      :total="totalElements"
    >
    </el-pagination>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogTableVisible"
      v-if="propTable.isDefaultDialog"
    >
      <el-form :model="formObj" :rules="propTable.rules" ref="defaultForm">
        <el-form-item
          v-for="(item, iRule) in propTable.tr"
          :label="item.label"
          :label-width="propTable.formLabelWidth"
          :key="'rule-' + iRule"
          :prop="item.prop"
        >
          <el-input
            :type="item.inputType"
            v-model="formObj[item.prop]"
            autocomplete="off"
            v-if="!item.type || item.type === 'input'"
          ></el-input>
          <el-date-picker
            v-model="formObj[item.prop]"
            type="datetime"
            placeholder="选择日期时间"
            v-else-if="item.type === 'datetime'"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="timestamp"
          >
          </el-date-picker>
          <el-switch
            v-model="formObj[item.prop]"
            v-else-if="item.type === 'switch'"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <el-select
            v-model="formObj[item.prop]"
            placeholder="请选择"
            v-else-if="item.type === 'select'"
          >
            <el-option
              v-for="childOption in selectOptions[item.prop]['options']"
              :key="childOption[selectOptions[item.prop]['value']]"
              :label="childOption[selectOptions[item.prop]['label']]"
              :value="childOption[selectOptions[item.prop]['value']]"
            >
            </el-option>
          </el-select>
          <el-radio-group
            v-model="formObj[item.prop]"
            v-else-if="item.type === 'radio'"
          >
            <el-radio
              v-for="childOption in selectOptions[item.prop]['options']"
              :key="childOption[selectOptions[item.prop]['value']]"
              :label="childOption[selectOptions[item.prop]['value']]"
              >{{ childOption[selectOptions[item.prop]['label']] }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import ElTable from 'element-ui/packages/table'
// import ElTableColumn from 'element-ui/packages/table-column'
// import ElForm from 'element-ui/packages/form'
// import ElFormItem from 'element-ui/packages/form-item'
// import ElButton from 'element-ui/packages/button'
// import ElPagination from 'element-ui/packages/pagination'
import mixinMethod from './tableNew';
export default {
  name: 'ElTablePackage',
  // components: {
  //   ElTable,
  //   ElTableColumn,
  //   ElForm,
  //   ElFormItem,
  //   ElButton,
  //   ElPagination
  // },
  mixins: [mixinMethod],
  props: {
    propTable: Object
  },
  data() {
    const selectOptions = Object.create(null);
    for (const val of this.propTable.tr) {
      const { prop, select } = val;
      if (select) {
        const { url, label, value, options } = select;
        selectOptions[prop] = {
          options: options || [],
          url,
          label,
          value
        };
      }
    }
    console.log(selectOptions);
    return {
      page: {
        page: 0,
        size: 10
      },
      totalElements: 0,
      loading: false,
      params: {},
      selectionList: [],
      dialogTitle: '新建',
      dialogTableVisible: false,
      formObj: {},
      selectOptions
    };
  },
  watch: {
    dialogTableVisible: function(newVal) {
      !newVal && this.$refs['defaultForm'].resetFields();
    }
  }
};
</script>

<style lang="less" stoped>
.el-table-package {
  padding: 0.1rem;
  .table-row__handle {
    margin-bottom: 0.1rem;
  }
  // 上左
  .el-table--border {
    border: 1px solid #ccc;
    margin-bottom: 0.1rem;
  }
  // 表头样式
  .el-table__header {
    background: rgb(14, 137, 183);
  }
  .el-table th {
    height: 0.2rem;
    padding: 0.1rem 0;
    background: rgb(14, 137, 183);
    // 右下
    border-color: #ccc;
    border-width: 1px;
    &:nth-last-child(2) {
      border-right: none;
    }
    & > .cell {
      color: #ccc;
      font: bold 0.14rem/0.2rem arial, sans-serif;
    }
  }
  // 表格样式
  .el-table td {
    height: 0.2rem;
    padding: 0.1rem 0;
    background: #ebeef5;
    // 右下
    border-color: #ccc;
    border-width: 1px;
    & > .cell {
      color: #909399;
      font: bold 0.14rem/0.2rem arial, sans-serif;
    }
  }
  // 双数行背景
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f2f6fc;
  }
  .el-pagination {
    text-align: end;
  }
}
</style>
