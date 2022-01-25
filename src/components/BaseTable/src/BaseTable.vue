<template>
  <div class="table-header">
    <slot name="header">
      <div class="title">{{ title }}</div>
      <div class="operation">
        <slot name="headerOperation"></slot>
      </div>
    </slot>
  </div>

  <el-table
    :data="tableData"
    style="width: 100%"
    border
    v-bind="childrenProps"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="showCheckColumn" align="center" type="selection" width="60"></el-table-column>
    <el-table-column v-if="showIndexColumn" label="序号" align="center" type="index" width="80"></el-table-column>
    <template v-for="column in columnProps" :key="column.prop">
      <el-table-column v-bind="column" align="center" show-overflow-tooltip>
        <template #default="scope">
          <slot :name="column.slotName" :row="scope.row">{{ scope.row[column.prop] }}</slot>
        </template>
      </el-table-column>
    </template>
  </el-table>

  <div v-if="showPagination" class="table-footer">
    <slot name="footer">
      <el-pagination
        :current-page="pageQuery.currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { IPageQuery } from '../types';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    tableData: {
      type: Array,
      required: true,
    },
    pageQuery: {
      type: Object as PropType<IPageQuery>,
      default: () => ({
        currentPage: 0,
        pageSize: 10,
      }),
    },
    dataCount: {
      type: Number,
      required: true,
    },
    columnProps: {
      type: Array as PropType<any[]>,
      required: true,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showCheckColumn: {
      type: Boolean,
      default: false,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
  });

  const emit = defineEmits(['selectionChange', 'update:pageQuery']);

  const handleSelectionChange = (selection: any[]) => {
    emit('selectionChange', selection);
  };

  const handleSizeChange = (pageSize: number) => {
    emit('update:pageQuery', { ...props.pageQuery, pageSize });
  };
  const handleCurrentChange = (currentPage: number) => {
    emit('update:pageQuery', { ...props.pageQuery, currentPage });
  };
</script>

<style lang="scss" scoped>
  .table-header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .operation {
      align-items: center;
    }
  }

  .table-footer {
    margin-top: 15px;

    .el-pagination {
      text-align: right;
    }
  }
</style>
