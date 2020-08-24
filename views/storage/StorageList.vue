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
          <a-menu-item key="1" @click="batch"><a-icon type="delete"/>一键对库</a-menu-item>
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
<a-row :gutter="24">
          <a-col>
            <j-modal
              :visible.sync="modal2.visible"
              :width="800"
              :title="modal2.title"
              :fullscreen.sync="modal2.fullscreen"
            >
              <template v-for="item in items">
                <div class="modal">
                  <div class="tit">
                    <li style="width: 20%;display: inline-block">商品名称：{{item.name}}</li>   
                    <li class="bbb" style="width: 10%;display: inline-block">库存：</li>  
                    <input style="size:5;display: inline-block" type="text"  v-model="item.storage">   
                    <li class="bbb" style="width: 10%;display: inline-block">实库：</li>  
                    <input style="size:5;display: inline-block" type="text" v-model="item.realStorage">         
                  </div>  
                </div>              
              </template>
              <div slot="footer">
    	            <Button @click="hideModel2()">关闭</Button>
                  <Button type="primary" @click="save2">保存</Button>
              </div>
            </j-modal>
          </a-col>
     </a-row>
    <material-modal ref="modalForm" @ok="modalFormOk"></material-modal>



  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MaterialModal from './modules/StorageModal'
  import JInput from '@/components/jeecg/JInput.vue';
  import { colAuthFilter } from "@/utils/authFilter";
  import {getAction,httpAction,postAction} from '@/api/manage'

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
        items: [],
        description: 'material管理页面',
        // 表头
        modal2: {
          visible: false,
          fullscreen: false,
        },
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
          list: "/food/material/list?column=storage&order=asc&combination=0",
          delete: "/food/material/delete",
          deleteBatch: "/food/material/deleteBatch",
          exportXlsUrl: "/food/material/exportXls",
          importExcelUrl: "food/material/importExcel",
          queryByIdsUrl: "food/material/queryByIds",
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
      },
      batch(){
        this.modal2.title="一键对库";
          this.modal2.visible=true;
          this.items=[];
          this.cmpagesItems=[];
          var ids = "";
          for (var a = 0; a < this.selectedRowKeys.length; a++) {
            ids += this.selectedRowKeys[a] + ",";
          }
          console.log("ids="+ids);
          var that = this;
          getAction(that.url.queryByIdsUrl, {ids: ids}).then((res) => {
              if (res.success) {
                  res.result.findIndex( r=> {
                    console.log(r);
                    var item = new Object();
                      item.id=r.id;
                      item.name = r.name;
                      item.storage=Number(r.storage);
                      item.realStorage=Number(r.realStorage);
                    this.items.push(item);
                  })
                }
          });
      },
      hideModel2(){
        this.modal2.visible=false;
      },
      save2(rows){
         var that = this;
         var arr=this.items;
         var item=[];
         for(var j=0,len=arr.length;j<len;j++){
                console.log(arr[j]);
                var id=arr[j].id;
                var it = new Object();
                it.id=id;
                item.push(id);

         }

          var formData=encodeURI(JSON.stringify(arr));

          var Url=this.url.storageAddUrl;

          getAction("/storageLog/storageLog//check", {items:formData}).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.loadData();
                that.onClearSelected();
                this.modal2.visible=false;
              } else {
                that.$message.warning(res.message);
              }
          }).finally(() => {
              that.loading = false;
              this.modal2.visible=false;
          });

      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>