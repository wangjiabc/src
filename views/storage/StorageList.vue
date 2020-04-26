<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
            <j-input placeholder="请输入账号模糊查询" v-model="queryParam.name"></j-input>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="download" @click="handleExportXls('material')">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{fixed:true,selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :scroll="tableScroll"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="图片不存在" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <material-modal ref="modalForm" @ok="modalFormOk"></material-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MaterialModal from './modules/StorageModal'
  import JInput from '@/components/jeecg/JInput.vue';
  import { colAuthFilter } from "@/utils/authFilter";

  export default {
    name: "StorageList",
    mixins:[JeecgListMixin],
    components: {
      MaterialModal,
      JInput
    },
    created() {
          this.disableMixinCreated=true;
          this.columns = colAuthFilter(this.columns,'materialList:');
          this.loadData();
          this.initDictConfig();
     },
    data () {
      return {
        description: 'material管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'名称',
            align:"center",
            dataIndex: 'name'
          },
          {
            title:'单位-单个',
            align:"center",
            dataIndex: 'unit'
          },
          {
            title:'库存',
            align:"center",
            dataIndex: 'storage'
          },
                    {
            title:'实库',
            align:"center",
            dataIndex: 'realStorage'
          },
          {
            title:'差异',
            align:"center",
            dataIndex: 'storageDiff'
          },
          {
            title:'盘库时间',
            align:"center",
            dataIndex: 'checkTime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'成本',
            align:"center",
            dataIndex: 'cost'
          },
          {
            title:'零售价',
            align:"center",
            dataIndex: 'retailprice'
          },        
          {
            title:'是否组合',
            align:"center",
            dataIndex: 'combination'
          },       
          {
            title:'创建日期',
            align:"center",
            dataIndex: 'createTime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },        
          {
            title:'备注',
            align:"center",
            dataIndex: 'remark'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/food/material/list?column=storage&order=asc",
          delete: "/food/material/delete",
          deleteBatch: "/food/material/deleteBatch",
          exportXlsUrl: "/food/material/exportXls",
          importExcelUrl: "food/material/importExcel",
        },
        dictOptions:{},
        tableScroll:{x :18*80+50}
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initDictConfig(){
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>