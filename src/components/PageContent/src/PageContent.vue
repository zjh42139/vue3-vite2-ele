<template>
  <div class="page-content">
    <BaseTable
      v-model:pageQuery="pageQuery"
      :table-data="tableData"
      :data-count="dataCount"
      v-bind="tableConfig"
      @selection-change="handleSelectionChange"
    >
      <template #headerOperation>
        <el-button v-if="allowCreate" type="primary">
          <el-icon> <plus /> </el-icon>新建用户
        </el-button>
      </template>
      <template #status="scope">
        <el-tag v-if="scope.row.enable" type="success">启用</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formateTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formateTime(scope.row.updateAt) }}</strong>
      </template>
      <template #operation>
        <el-button v-if="allowUpdate" size="small" type="text">
          <el-icon> <edit /> </el-icon>编辑
        </el-button>
        <el-button v-if="allowDelete" size="small" type="text">
          <el-icon> <delete /> </el-icon>删除
        </el-button>
      </template>
      <template v-for="item in dynamicSlots" :key="item.prop" #[item.slotName]="scope">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
  import BaseTable from '@/components/BaseTable/index';
  import { Edit, Delete, Plus } from '@element-plus/icons-vue';
  import { computed, PropType, ref, watch } from 'vue';
  import { useSystemStore } from '@/store/modules/main/system';
  import type { IPageName, ITableConfig } from '../types';
  import type { IPageQuery } from '@/components/BaseTable/types';
  import { usePermission } from '@/hooks/usePermission';

  const pageQuery = ref<IPageQuery>({
    currentPage: 0,
    pageSize: 10,
  });

  const props = defineProps({
    tableConfig: {
      type: Object as PropType<ITableConfig>,
      required: true,
    },
    pageName: {
      type: String as PropType<IPageName>,
      required: true,
    },
  });

  const systemStore = useSystemStore();

  const allowCreate = usePermission(props.pageName, 'create');
  const allowUpdate = usePermission(props.pageName, 'update');
  const allowDelete = usePermission(props.pageName, 'delete');
  const allowQuery = usePermission(props.pageName, 'query');

  const getPageData = (query: any = {}) => {
    allowQuery &&
      systemStore.getPageListAction({
        pageName: props.pageName,
        queryInfo: {
          offset: pageQuery.value.currentPage * pageQuery.value.pageSize,
          size: pageQuery.value.pageSize,
          ...query,
        },
      });
  };
  getPageData();
  watch(pageQuery, () => getPageData());

  const tableData = computed(() => systemStore.pageList(props.pageName));
  const dataCount = computed(() => systemStore.pageCount(props.pageName) ?? 0);

  const handleSelectionChange = (selection: any[]) => {
    console.log(selection);
  };

  const dynamicSlots = props.tableConfig.columnProps.filter((column) => column.isDynamicSlot);

  defineExpose({
    getPageData,
  });
</script>

<style lang="scss" scoped>
  .page-content {
    border-top: 20px solid #f5f5f5;
    padding: 1.25rem;
  }
</style>
