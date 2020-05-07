<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
            <j-input placeholder="请输入账号模糊查询" v-model="queryParam.detail"></j-input>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="download" @click="handleExportXls('accounthead')">导出</a-button>
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
         <!-- <a @click="handleEdit(record)">编辑</a> -->

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

    <accounthead-modal ref="modalForm" @ok="modalFormOk"></accounthead-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import AccountheadModal from './modules/AccountheadModal'
  import JInput from '@/components/jeecg/JInput.vue';

  export default {
    name: "AccountheadList",
    mixins:[JeecgListMixin],
    components: {
      AccountheadModal,
      JInput
    },
    data () {
      return {
        description: 'accounthead管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:50,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'单据编号',
            align:"center",
            dataIndex: 'billno',
            width:220
          },
           {
            title:'客户名称',
            align:"center",
            dataIndex: 'supplier'
          },
          {
            title:'商品名称',
            align:"center",
            dataIndex: 'materialName'
          },
          {
            title:'数量',
            align:"center",
            dataIndex: 'count'
          },
          {
            title:'合计金额',
            align:"center",
            dataIndex: 'totalprice'
          },
          {
            title:'单据日期',
            align:"center",
            dataIndex: 'billtime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'详情',
            align:"center",
            dataIndex: 'detail',
            width:300
          },
           {
            title:'支付方式',
            align:"center",
            dataIndex: 'payName'
          },

          {
            title:'备注',
            align:"center",
            dataIndex: 'remark'
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
            title:'创建人登录名称',
            align:"center",
            dataIndex: 'createBy'
          },         
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:100,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/accounthead/accounthead/list",
          delete: "/accounthead/accounthead/delete",
          deleteBatch: "/accounthead/accounthead/deleteBatch",
          exportXlsUrl: "/accounthead/accounthead/exportXls",
          importExcelUrl: "accounthead/accounthead/importExcel",
        },
        dictOptions:{},
        tableScroll:{x :20*80+50}
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