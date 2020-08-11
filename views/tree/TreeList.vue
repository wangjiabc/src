<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

        </a-row>
      </a-form>
    </div>

    <div class="content-right">
      <div v-show="num==0">
    <!-- 操作按钮区域 -->
    <div class="table-operator">
     <!-- <a-button @click="setNew()" type="primary" icon="plus">新增</a-button> -->
      <a-button @click="addPut()" type="primary" icon="plus">新增目录</a-button>
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
          <a @click="setPut(record)">添加子目录</a>
          <a-divider type="vertical" />
          <a @click="addCompages(record)">添加商品到目录</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => del(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
      </div>
    </div>

  <div v-show="num==1">
    <template>
      
    </template>
  </div>
    <tree-modal ref="modalForm" @ok="modalFormOk"></tree-modal>

    <a-row :gutter="24">
          <a-col>
            <j-modal
              :visible.sync="modal3.visible"
              :width="1200"
              :title="modal3.title"
              :fullscreen.sync="modal3.fullscreen"
            >

            <a-table
                ref="table"
              size="middle"
                bordered
                rowKey="id"
                :columns="columns2"
                :dataSource="dataSource"
                :pagination="ipagination"
                :loading="loading"
                :rowSelection="{fixed:true,selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                :scroll="tableScroll"
                @change="handleTableChange">
              </a-table> 

            <div slot="footer">
    	            <Button @click="hideModel3()">关闭</Button>
                  <Button type="primary" @click="addCompagesSave()">确定</Button>
            </div>
            </j-modal>
          </a-col>
     </a-row>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import TreeModal from './modules/TreeModal'
  import {getAction} from '@/api/manage'

  export default {
    name: "TreeList",
    mixins:[JeecgListMixin],
    components: {
      TreeModal
    },
    data () {
      return {
        description: 'tree管理页面',
        modal3: {
          visible: false,
          fullscreen: false,
        },
        catalog:0,
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
            dataIndex: 'username'
          },
       /*   {
            title:'lft',
            align:"center",
            dataIndex: 'lft'
          },
          {
            title:'rgt',
            align:"center",
            dataIndex: 'rgt'
          },*/
          {
            title:'层级',
            align:"center",
            dataIndex: 'level'
          },
          {
            title:'id',
            align:"center",
            dataIndex: 'id'
          },
          {
            title:'上级id',
            align:"center",
            dataIndex: 'pid'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        columns2: [
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
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:260,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/tree/tree/list?column=createTime&order=asc",
          delete: "/tree/tree/delete",
          deleteBatch: "/tree/tree/deleteBatch",
          exportXlsUrl: "/tree/tree/exportXls",
          importExcelUrl: "tree/tree/importExcel",
          new:"/tree/tree/insertTree",
          put:"/tree/tree/addTree",
          addPut:"/tree/tree/addRootTree",
          delChildTree:"/tree/tree/delChildTree",
          list2: "/food/material/list?column=storage&order=asc",
          list3: "/tree/tree/list?column=createTime&order=asc"
        },
        dictOptions:{},
        num:0,
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
      setNew(){
        var that=this;
        getAction(this.url.new,
           {userName:'aaaaa',pId:1}).then((res) => {
             console.log(res);
              if (res.success) {
                    this.$message.success(res.message);
                    that.loadData();

              }
           });

      },
      setPut(record){
          
        var that=this;
        var name = prompt("请输入名称");
        console.log(name);
        getAction(this.url.put,
           {userName:name,pId:record.id}).then((res) => {
             console.log(res);
              if (res.success) {
                this.$message.success(res.message);
                that.loadData();
              }
           });

      },
      addPut(){
        var that=this;
        var name = prompt("请输入名称");
        console.log(name);
         getAction(this.url.addPut,
           {userName:name}).then((res) => {
             console.log(res);
              if (res.success) {
                this.$message.success(res.message);
                that.loadData();
              }
           });
      },
      del(record){

        var that=this;
        getAction(this.url.delChildTree,
           {id:record.id}).then((res) => {
             console.log(res);
              if (res.success) {
                    this.$message.success(res.message);
                    that.loadData();

              }
           });

      },
      hideModel3(){
        this.modal3.visible=false;
        this.url.list=this.url.list3;
        getAction(this.url.list3, this.queryParam).then(res => {
                this.dataSource = res.result.records
                this.ipagination.total = res.result.total;
        })
      },
      addCompages(record){
            this.modal3.title="";
            this.modal3.visible=true;
            this.items=[];
            this.url.list=this.url.list2;
            getAction(this.url.list2, this.queryParam).then(res => {
                this.dataSource = res.result.records
                this.ipagination.total = res.result.total;
            });
            this.catalog=record.id;
        },

     addCompagesSave(){

              this.modal3.visible=false;
              this.url.list=this.url.list3;
              getAction(this.url.list3, this.queryParam).then(res => {
                  this.dataSource = res.result.records
                  this.ipagination.total = res.result.total;
              })            
              var ids =new Array();
               for (var a = 0; a < this.selectedRowKeys.length; a++) {
                    ids += this.selectedRowKeys[a] + ",";
              }
              var that = this;
              console.log(ids);
              var itemsstring=encodeURI(JSON.stringify(this.selectedRowKeys));
              getAction("/food/material/updateCatalog", {catalog:this.catalog,items: itemsstring}).then((res) => {
              if (res.success) {
                    alert(res.message);
                  }else{
                    alert("失败");
                  }
                
              });
        },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>