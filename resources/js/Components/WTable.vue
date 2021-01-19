<template>
  <a-table
    :rowKey="rowKey"
    :columns="columns"
    :data-source="data"
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
  >
    <span slot="action" slot-scope="text, record">
      <a>編輯</a>
      <a-divider type="vertical" />
      <a>刪除</a>
    </span>
  </a-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    modelKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: []
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
    formatColumns(columns) {
      return columns.map(column => {
        // Key
        column.dataIndex = JSON.parse(JSON.stringify(column.key))

        // Title
        column.title = JSON.parse(JSON.stringify(column.label))
        delete column.label

        return column
      }).concat({
        title: '操作',
        key: 'action',
        scopedSlots: {
          customRender: 'action'
        }
      })
    },
    formatData(data) {
      return data.map(item => {
        // Key
        item[this.rowKey] = JSON.parse(JSON.stringify(item[this.modelKey]))

        return item
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
