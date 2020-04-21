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
      <a-button @click="handleAdd" v-has="'material:add'" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('material')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-button type="primary" icon="plus" @click="batchCompages">组合</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" v-has="'material:storageAdd'" @click="handleStorageAdd"><a-icon type="plus"/>添加库存</a-menu-item>
          <a-menu-item key="2" v-has="'material:compages'" @click="batchCompages"><a-icon type="delete"/>组合</a-menu-item>
          <a-menu-item key="3" v-has="'material:delete'" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
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
              <a-menu-item title="详情" @click="detail(record.id)">
                <a>详情</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <material-modal ref="modalForm" @ok="modalFormOk"></material-modal>

        <a-row :gutter="24">
          <a-col>
            <j-modal
              :visible.sync="modal.visible"
              :width="800"
              :title="modal.title"
              :fullscreen.sync="modal.fullscreen"
            >
              <template v-for="item in items">
                <div >
                <li style="display: inline-block">商品名称：{{item.name}}</li>
                <li style="display: inline-block">　数量：</li>
                <input style="display: inline-block" type="text"  v-model="item.number">
                <Button style="display: inline-block" @click="delCompages(item.id)" >删除</Button>
                </div>
              </template>
              <div>
               <Button @click="addCompages()">添加</Button>
              </div>
              <div slot="footer">
    	            <Button @click="hideModel()">关闭</Button>
                  <Button type="primary" @click="save">保存</Button>
              </div>
            </j-modal>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col>
            <j-modal
              :visible.sync="modal2.visible"
              :width="800"
              :title="modal2.title"
              :fullscreen.sync="modal2.fullscreen"
            >
              <template v-for="item in items">
                <div >
                <li style="display: inline-block">商品名称：{{item.name}}</li>               
                </div>                
              </template>
              <template>
               <li style="display: inline-block">　数量：</li>
                <input id="storageNumber" style="display: inline-block" type="text" >
              </template>
              <div slot="footer">
    	            <Button @click="hideModel2()">关闭</Button>
                  <Button type="primary" @click="save2">保存</Button>
              </div>
            </j-modal>
          </a-col>
        </a-row>

  </a-card>

 

</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MaterialModal from './modules/MaterialModal'
  import { colAuthFilter } from "@/utils/authFilter"

  import JInput from '@/components/jeecg/JInput.vue';
  import {getAction,httpAction,postAction} from '@/api/manage'

  export default {
    name: "MaterialList",
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
        dialogVisible: false,
        modal: {
          visible: false,
          fullscreen: false,
        },
        modal2: {
          visible: false,
          fullscreen: false,
        },
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:30,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'名称',
            align:"center",
            dataIndex: 'name',
            width:100
          },          
          {
            title:'库存',
            align:"center",
            dataIndex: 'storage',
            width:100
          },
          {
            title:'成本',
            align:"center",
            dataIndex: 'cost',
            width:80
          },
          {
            title:'零售价',
            align:"center",
            dataIndex: 'retailprice',
            width:80
          },
          {
            title:'备注',
            align:"center",
            dataIndex: 'remark',
            width:80
          },
         /* {
            title:'最低售价',
            align:"center",
            dataIndex: 'lowprice',
            width:80
          },
          {
            title:'预设售价一',
            align:"center",
            dataIndex: 'presetpriceone',
            width:80
          },*/
          {
            title:'组合',
            align:"center",
            dataIndex: 'combination',
            width:50
          },       
          {
            title:'创建日期',
            align:"center",
            dataIndex: 'createTime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            },
            width:100
          },
         /* {
            title:'创建人登录名称',
            align:"center",
            dataIndex: 'createBy'
          },
          {
            title:'更新人登录名称',
            align:"center",
            dataIndex: 'updateBy'
          },
          {
            title:'更新日期',
            align:"center",
            dataIndex: 'updateTime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'所属部门',
            align:"center",
            dataIndex: 'sysOrgCode'
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
          },*/
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
          list: "/food/material/list",
          delete: "/food/material/delete",
          deleteBatch: "/food/material/deleteBatch",
          exportXlsUrl: "/food/material/exportXls",
          importExcelUrl: "food/material/importExcel",
          compagesUrl: "food/material/compages",
          queryByIdsUrl: "food/material/queryByIds",
          storageAddUrl: "food/material/storageAdd",
          querydDetailByIdUrl: "food/material/querydDetailById"
        },
        dictOptions:{},
        tableScroll:{x :10*80+50}
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
      batchCompages(row) {
          this.modal.title="组合商品";
          this.modal.visible=true;
          this.items=[];
          var ids = "";
          for (var a = 0; a < this.selectedRowKeys.length; a++) {
            ids += this.selectedRowKeys[a] + ",";
          }
          var that = this;
          getAction(that.url.queryByIdsUrl, {ids: ids}).then((res) => {
              if (res.success) {
                  res.result.findIndex( r=> {
                    var item = new Object();
                      item.id=r.id;
                      item.name = r.name;
                      item.number= 1;
                    this.items.push(item);
                  })
                }
          });

      },
      hideModel(){
        this.modal.visible=false;
      },
      save(rows){
         var that = this;
         var arr=this.items;
         var item=[];
         for(var j=0,len=arr.length;j<len;j++){
                console.log(arr[j]);
                var id=arr[j].id;
                var amount=arr[j].number;
                console.log(id+"   "+amount);
                var it = new Object();
                it.id=id;
                it.amount=amount;
                item.push(id);

         }

          var formData=encodeURI(JSON.stringify(arr));

          var Url=this.url.compagesUrl;
    
          getAction(Url, {items:formData}).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.loadData();
                that.onClearSelected();
              } else {
                that.$message.warning(res.message);
              }
          }).finally(() => {
              that.loading = false;
          });

         },
      save2(rows){
         var that = this;
         var arr=this.items;
         var item=[];
         var number=document.getElementById("storageNumber").value;
         console.log("number="+number);
         for(var j=0,len=arr.length;j<len;j++){
                console.log(arr[j]);
                var id=arr[j].id;
                var it = new Object();
                it.id=id;
                it.amount=number;
                item.push(id);

         }

          var formData=encodeURI(JSON.stringify(arr));

          var Url=this.url.storageAddUrl;

          getAction(Url, {items:formData,amount:number}).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.loadData();
                that.onClearSelected();
              } else {
                that.$message.warning(res.message);
              }
          }).finally(() => {
              that.loading = false;
          });

      },
      hideModel2(){
        this.modal2.visible=false;
      },
      handleStorageAdd(){
          this.modal2.title="添加库存";
          this.modal2.visible=true;
          this.items=[];
          var ids = "";
          for (var a = 0; a < this.selectedRowKeys.length; a++) {
            ids += this.selectedRowKeys[a] + ",";
          }
          var that = this;
          getAction(that.url.queryByIdsUrl, {ids: ids}).then((res) => {
              if (res.success) {
                  res.result.findIndex( r=> {
                    var item = new Object();
                      item.id=r.id;
                      item.name = r.name;
                      item.number= 1;
                    this.items.push(item);
                  })
                }
          });

        },
        detail(record){
              console.log(record);
            var that = this;
             getAction(that.url.querydDetailByIdUrl, {id:record}).then((res) => {
              if (res.success) {
                  var html="";
                  res.result.findIndex( r=> {
                    console.log(r);
                     html+="商品："+r.name+"  数量："+r.unit+"\n";
                  });
                  alert(html);
                }
              });
              

        },
      　addCompages(){

        },
        delCompages(id){
            alert(id);
        }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>