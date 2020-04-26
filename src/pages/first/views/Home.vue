<template>
  <div>
    <child v-model="childInput"></child>{{ childInput }}
    <el-table-package :propTable="propTable">
      <template #planSn="{item}"> {{ item.planSn }}1 </template>
    </el-table-package>
    <!-- <img src="@/assets/img/test.png" alt="" /> -->
    <button @click="handleJump">111</button>
  </div>
</template>

<script>
import { setToken } from '@/utils/auth';
export default {
  beforeCreate() {
    this['propTable'] = {
      noLoadInit: false, // 初始化是否加载数据
      hidePage: false, // 不需要分页
      initSrc: '/api/projectPlan/', // 初始化table接口地址
      initMethod: 'post', // 初始化table接口method,默认get
      initProp: 'content', // 数据属性 res[initProp]
      pageTotalProp: 'totalElements', // 分页总数prop
      rebuildData: null, // 数据重构 --- data void
      deleteSrc: '/api/projectPlan/', // 删除操作接口地址
      batchDeleteSrc: '/api/projectPlan/batchDel', // 批量删除操作接口地址
      dialogMethod: 'put', // 新建删除method,默认put
      dialogSrc: '/api/projectPlan/', // 新建删除接口地址
      objectSpanMethod: null, // 合并单元格
      loading: true, // 加载中动画
      hasShowSummary: false, // 是否显示表位合计行
      rowClassName: null, // 特殊行classname --- row, rowIndex
      border: true, // 是否带有纵向边框,拖拽功能需设置为true
      isDefaultHandles: true, // 是否显示默认新建/删除操作
      isSelection: true, // 是否显示多选框
      hasSelect: false, // 有无选中功能
      hasExpand: false, // 有无展开行功能
      isDefaultDialog: true, // 使用默认新建/修改弹框
      formLabelWidth: '120px', // 弹框表单label宽度
      rules: {
        planSn: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        planStartTime: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ]
      }, // 弹框表单rules
      tr: [
        // 表头数据
        // className --- 列的class名
        // fixed固定 --- true, left, right
        // sortable排序 ---  true, false, 'custom'
        // tooltip ---  true, false
        // resizable是否可以通过拖动改变宽度 -- 默认true
        // headerAlign表头对齐方式 --- left/center/right
        // align表格对齐方式 --- left/center/right
        // type表单类型 --- input datetime switch select 默认input
        // inputType input类型 --- textarea number
        // select 下拉框数据请求地址 ---url label value
        {
          label: '头像',
          prop: 'planSn',
          className: 'classname-image',
          show: 'template', // slot特殊列
          inputType: 'textarea'
        },
        {
          label: '预算',
          prop: 'projectBudget',
          className: 'classname',
          // width: '90',
          show: true,
          tooltip: true,
          align: 'center',
          inputType: 'number'
        },
        {
          label: '时间',
          prop: 'planStartTime',
          className: 'classname',
          // width: '90',
          show: true,
          align: 'center',
          type: 'datetime'
        },
        {
          label: '是否',
          prop: 'projectType',
          className: 'classname',
          // width: '90',
          show: true,
          align: 'center',
          type: 'switch'
        },
        {
          label: '用户',
          prop: 'onwer',
          className: 'classname',
          // width: '90',
          show: true,
          align: 'center',
          type: 'select',
          select: {
            options: [
              {
                id: 0,
                name: 'test'
              }
            ],
            url: '/api/projectPlan/findAllUser',
            label: 'name',
            value: 'id'
          }
        },
        {
          label: '单选',
          prop: 'radio',
          className: 'classname',
          // width: '90',
          show: true,
          align: 'center',
          type: 'radio',
          select: {
            options: [
              {
                id: '11',
                name: '备选项1'
              },
              {
                id: '12',
                name: '备选项2'
              }
            ],
            url: '/api/projectPlan/findAllUser',
            label: 'name',
            value: 'id'
          }
        }
      ],
      data: [], // 表格数据 如需添加行class,处理数据时则需要传入class名数组
      hasOperation: true, // 有无操作功能
      operation: {
        // 操作功能
        label: '操作', // 操作列的行首文字
        width: '320', // 操作列的宽度
        className: 'operation', // 操作列的class名
        data: [
          // 操作列数据
          // Fun --- defaultModify  defaultDelete
          {
            label: '修改', // 按钮文字
            Fun: 'defaultModify', // 点击按钮后触发的父组件事件
            size: 'mini', // 按钮大小
            classname: 'show-modify',
            icon: 'el-icon-edit', // 按钮的类名
            type: 'danger' // 按钮颜色
          },
          {
            label: '重置密码', // 按钮文字
            Fun: 'reset', // 点击按钮后触发的父组件事件
            size: 'mini', // 按钮大小
            classname: 'show-reset',
            icon: 'el-icon-refresh'
          },
          {
            label: '删除', // 按钮文字
            Fun: 'defaultDelete', // 点击按钮后触发的父事件
            size: 'mini', // 按钮大小
            classname: 'show-delete',
            icon: 'el-icon-delete'
          }
        ]
      },
      expands: [
        // 展开行数据
        {
          id: '1',
          label: 'label',
          prop: 'prop'
        }
      ],
      getSummaries(param) {
        // 自定义表位合计行数据
        // *** 此函数传入param参数
        console.log(param);
        // *** 最后返回一个数组，合计行会显示数组中的内容
        return [];
      }
    };
  },
  mounted() {
    setToken('testtoken');
  },
  data() {
    return {
      childInput: '1'
    };
  },
  methods: {
    handleJump() {
      setToken(new Date().getTime());

      // this.$router.push('/other');
      // this.$router.push({
      //   name: 'hby',
      //   params: {
      //     id: 111
      //   }
      // });
    }
  }
};
</script>
