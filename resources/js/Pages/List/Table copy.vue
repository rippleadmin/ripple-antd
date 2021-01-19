<template>
  <div>
    <!-- <table>
      <thead>
        <tr>
          <th v-for="column in columns">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td v-for="column in columns">{{ item[column.key] }}</td>
        </tr>
      </tbody>
    </table> -->

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="true"
      :rowSelection="rowSelection"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="description" slot-scope="text">
        <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a href="#" @click.prevent>配置</a>
          <a-divider type="vertical" />
          <a href="#" @click.prevent>订阅报警</a>
        </template>
      </span>
    </s-table>
  </div>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/AntdComponents'
// import { getRoleList, getServiceList } from '@/api/manage'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '规则编号',
    dataIndex: 'no'
  },
  {
    title: '描述',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true,
    customRender: (text) => text + ' 次'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  components: {
    STable,
    Ellipsis
  },
  // props: {
  //   title: {
  //     type: String,
  //     required: true
  //   },
  //   columns: {
  //     type: Array,
  //     required: true
  //   },
  //   data: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data () {
    this.columns = columns
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getServiceList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk () {
      // const form = this.$refs.createModal.form
      // this.confirmLoading = true
      // form.validateFields((errors, values) => {
      //   if (!errors) {
      //     console.log('values', values)
      //     if (values.id > 0) {
      //       // 修改 e.g.
      //       new Promise((resolve, reject) => {
      //         setTimeout(() => {
      //           resolve()
      //         }, 1000)
      //       }).then(res => {
      //         this.visible = false
      //         this.confirmLoading = false
      //         // 重置表单数据
      //         form.resetFields()
      //         // 刷新表格
      //         this.$refs.table.refresh()

      //         this.$message.info('修改成功')
      //       })
      //     } else {
      //       // 新增
      //       new Promise((resolve, reject) => {
      //         setTimeout(() => {
      //           resolve()
      //         }, 1000)
      //       }).then(res => {
      //         this.visible = false
      //         this.confirmLoading = false
      //         // 重置表单数据
      //         form.resetFields()
      //         // 刷新表格
      //         this.$refs.table.refresh()

      //         this.$message.info('新增成功')
      //       })
      //     }
      //   } else {
      //     this.confirmLoading = false
      //   }
      // })
    },
    handleCancel () {
      this.visible = false

      // const form = this.$refs.createModal.form
      // form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
