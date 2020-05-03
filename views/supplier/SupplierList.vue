<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('supplier')">导出</a-button>
      <a-button type="primary" icon="edit" @click="setname()">设置公司名称</a-button>
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

    <supplier-modal ref="modalForm" @ok="modalFormOk"></supplier-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SupplierModal from './modules/SupplierModal'
  import {getAction} from '@/api/manage'

  export default {
    name: "SupplierList",
    mixins:[JeecgListMixin],
    components: {
      SupplierModal
    },
    data () {
      return {
        description: 'supplier管理页面',
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
            title:'客户名称',
            align:"center",
            dataIndex: 'supplier'
          },
        /*  {
            title:'联系人',
            align:"center",
            dataIndex: 'contacts'
          },*/
          {
            title:'联系电话',
            align:"center",
            dataIndex: 'phonenum'
          },
          {
            title:'地址',
            align:"center",
            dataIndex: 'address'
          },          
         /* {
            title:'电子邮箱',
            align:"center",
            dataIndex: 'email'
          },*/
          {
            title:'传真',
            align:"center",
            dataIndex: 'fax'
          },
          {
            title:'备注',
            align:"center",
            dataIndex: 'description'
          },
         /* {
            title:'是否系统自带 0==系统 1==非系统',
            align:"center",
            dataIndex: 'isystem'
          },
          {
            title:'类型',
            align:"center",
            dataIndex: 'type'
          },
          {
            title:'启用',
            align:"center",
            dataIndex: 'enabled'
          },
          {
            title:'预收款',
            align:"center",
            dataIndex: 'advancein'
          },
          {
            title:'期初应收',
            align:"center",
            dataIndex: 'beginneedget'
          },
          {
            title:'期初应付',
            align:"center",
            dataIndex: 'beginneedpay'
          },
          {
            title:'累计应收',
            align:"center",
            dataIndex: 'allneedget'
          },
          {
            title:'累计应付',
            align:"center",
            dataIndex: 'allneedpay'
          },
          
          {
            title:'手机',
            align:"center",
            dataIndex: 'telephone'
          },
          
          {
            title:'纳税人识别号',
            align:"center",
            dataIndex: 'taxnum'
          },
          {
            title:'开户行',
            align:"center",
            dataIndex: 'bankname'
          },
          {
            title:'账号',
            align:"center",
            dataIndex: 'accountnumber'
          },
          {
            title:'税率',
            align:"center",
            dataIndex: 'taxrate'
          },
          {
            title:'创建日期',
            align:"center",
            dataIndex: 'createTime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },*/
          {
            title:'创建人登录名称',
            align:"center",
            dataIndex: 'createBy'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/supplier/supplier/list",
          delete: "/supplier/supplier/delete",
          deleteBatch: "/supplier/supplier/deleteBatch",
          exportXlsUrl: "/supplier/supplier/exportXls",
          importExcelUrl: "supplier/supplier/importExcel",
          editNameUrl: "/supplier/supplier/editName"
        },
        dictOptions:{},
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initDictConfig(){
      },
      setname(){
        var name = prompt("请输入公司名称");
        console.log(name);
        getAction(this.url.editNameUrl, {email: name}).then((res) => {
              if (res.success) {
                  
                }
          });

      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>