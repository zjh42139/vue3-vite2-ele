<template>
  <BaseTable
    v-model:pageQuery="pageQuery"
    :table-data="tableData"
    :data-count="dataCount"
    v-bind="tableConfig"
    @selection-change="handleSelectionChange"
    @pageQueryChange="handlePageQueryChange"
  >
    <template #headerOperation>
      <el-button type="primary">
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
      <el-button size="small" type="text">
        <el-icon> <edit /> </el-icon>编辑
      </el-button>
      <el-button size="small" type="text">
        <el-icon> <delete /> </el-icon>删除
      </el-button>
    </template>
  </BaseTable>
</template>

<script setup lang="ts">
  import BaseTable from '@/components/BaseTable/index';
  import { Edit, Delete, Plus } from '@element-plus/icons-vue';
  import { computed, PropType, ref, watch } from 'vue';
  import { useSystemStore } from '@/store/modules/main/system';
  import type { IPageName, ITableConfig } from '../types';
  import type { IPageQuery } from '@/components/BaseTable/types';

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

  const getPageData = (query: any = {}) => {
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
  const dataCount = computed(() => systemStore.pageCount(props.pageName));

  const handleSelectionChange = (selection: any[]) => {
    console.log(selection);
  };

  defineExpose({
    getPageData,
  });
</script>

<style lang="scss" scoped></style>
