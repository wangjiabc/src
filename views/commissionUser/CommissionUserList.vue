<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">

        <a-row :gutter="24">
        <a-col :xl="6" :lg="8" :md="8" :sm="20">
            <a-form-item label="选择员工"  >

              <select v-model="selectUserValue" @change="selectFn">
            <option :value="list.text" v-for="list in dictOptionsUser">{{list.text}}</option>
            </select>
            
          </a-form-item>
        </a-col>
          <a-col :xl="5" :lg="5" :md="8" :sm="20">
            <a-form-item label="开始时间">
              <j-date placeholder="请选择开始时间" v-model="queryParam.startDate"></j-date>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="5" :md="8" :sm="20">
            <a-form-item label="结束时间">
              <j-date placeholder="请选择结束时间" v-model="queryParam.endDate"></j-date>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="5" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>

      </a-form>
      
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a type="primary" style="margin-right: 20px;margin-top: 10px;float:right" id="allCommion" >总经费</a>
      <a type="primary" style="margin-right: 20px;margin-top: 10px;float:right" id="allCost" >销售总额</a>
      <a-button type="primary" icon="download" @click="handleExportXls('commission_user')">导出</a-button>
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

    <commissionUser-modal ref="modalForm" @ok="modalFormOk"></commissionUser-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import CommissionUserModal from './modules/CommissionUserModal'
  import JInput from '@/components/jeecg/JInput.vue'
  import JDate from '@/components/jeecg/JDate.vue'
  import JSearchSelectTag from '@/components/dict/JSearchSelectTag'
  import {getAction} from '@/api/manage'

  export default {
    name: "CommissionUserList",
    mixins:[JeecgListMixin],
    components: {
      CommissionUserModal,
      JInput,
      JSearchSelectTag,
      JDate
    },
    mounted(){
         
         getAction(this.url.getAllAccountUrl, {}).then((res) => { 
           if (res.success) {
              console.log(res.result);
              document.getElementById('allCost').innerHTML ="销售总金额:"+res.result.ALLACCOUNT;
           }
         });

          getAction(this.url.getAllCommissionUrl, {}).then((res) => { 
           if (res.success) {
              console.log(res.result);
              document.getElementById('allCommion').innerHTML ="总经费:"+res.result.CommissionAmount;
           }
         });

         getAction("/commissionUser/commissionUser/selectGroupUser", {}).then((res) => {             
              if (res.success) {
                 var item = new Object();
                      //item.id=r.ID;
                      item.text="";
                      //item.value = r.PHONENUM;
                      var object = new Object();
                  var object = new Object();
                      object.userId=null;
                      item.value=JSON.stringify(object); 
                    this.dictOptionsUser.push(item);
                    
                  res.result.findIndex( r=> {
                    console.log("res====",r);
                    var item = new Object();
                      //item.id=r.ID;
                      item.text=r.realName;
                      //item.value = r.PHONENUM;
                      var object = new Object();
                      object.userId=r.userId;
                      item.value=JSON.stringify(object); 
                    this.dictOptionsUser.push(item);
                    
                  })
                }
                console.log("dictOptionsUser="+this.dictOptionsUser);
          });
    },
    data () {
      return {
        dictOptionsUser:[],
        selectUserValue:"",
        description: 'commission_user管理页面',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
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
          
         /* {
            title:'所属部门',
            align:"center",
            dataIndex: 'sysOrgCode'
          },
          {
            title:'org_code',
            align:"center",
            dataIndex: 'orgCode'
          },
          {
            title:'material_id',
            align:"center",
            dataIndex: 'materialId'
          },
          {
            title:'depart_id',
            align:"center",
            dataIndex: 'departId'
          },
          */
          {
            title:'名称',
            align:"center",
            dataIndex: 'username'
          },
           {
            title:'工作经费',
            align:"center",
            dataIndex: 'commissionAmount'
          },
          {
            title:'商品名称',
            align:"center",
            dataIndex: 'materialName'
          },
          {
            title:'billno',
            align:"center",
            dataIndex: 'billno'
          },
          {
            title:'部门',
            align:"center",
            dataIndex: 'departName'
          },
          {
            title:'创建人',
            align:"center",
            dataIndex: 'createBy'
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
            title:'更新人',
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
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/commissionUser/commissionUser/list",
          delete: "/commissionUser/commissionUser/delete",
          deleteBatch: "/commissionUser/commissionUser/deleteBatch",
          exportXlsUrl: "/commissionUser/commissionUser/exportXls",
          importExcelUrl: "commissionUser/commissionUser/importExcel",
          getAllAccountUrl:"/accounthead/accounthead/getAllAccount",
          getAllCommissionUrl:"/commissionUser/commissionUser/getAllCommission",
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
       selectFn(e){
            console.log(e);
            console.log(e.target.selectedIndex);
            console.log(e.target.value);
            for(var j = 0,len=this.dictOptionsUser.length; j < len; j++) {
                  var item = this.dictOptionsUser[j];                 
                  var object=JSON.parse(item.value);
                  var uid=object.userId;
                  if(j==e.target.selectedIndex){
                    this.queryParam.userId=uid;                  
                    break;
                  }
            } 
            console.log(this.queryParam);
        },
        searchQuery() {

        this.$refs.queryParam = this.queryParam
         var search="";
         if(this.queryParam.startDate!=null)
            search+="&startDate="+this.queryParam.startDate;

        console.log("queryParam="+JSON.stringify(this.queryParam));
        console.log("search="+this.queryParam.startDate);

        
         getAction(this.url.list, this.queryParam).then(res => {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total;
        })
        
          this.queryParam.column="createTime";
          this.queryParam.order="desc";

         getAction(this.url.getAllAccountUrl, this.queryParam).then((res) => { 
           if (res.success) {
              console.log(res.result);
              document.getElementById('allCost').innerHTML ="销售总金额:"+res.result.ALLACCOUNT;
           }
         });

        getAction(this.url.getAllCommissionUrl, this.queryParam).then((res) => { 
           if (res.success) {
              console.log(res.result);
              document.getElementById('allCommion').innerHTML ="总经费:"+res.result.CommissionAmount;
           }
         });


      }
    },
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>