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
          <a @click="printer(record)">打印</a> 

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

    <a-row :gutter="24">
          <a-col>
            <j-modal
              :visible.sync="modal.visible"
              :width="1200"
              :title="modal.title"
              :fullscreen.sync="modal.fullscreen"
            >
<template>
  <a-card>
    <div>
      <a-button v-print="'#pdfDom'" type="primary">打印</a-button>
      <div
        class="tables"
      >
        <div style="width: 1000px" id="pdfDom">
          <p align="center" class="title">{{email}}销售单</p>
          <div style="width: 100%;">
            <div style="width: 100%;margin-bottom: 10px;">
              <div style="width: 35%;float: left" >客户电话:{{phoneNum}}</div>
              <div style="width: 35%;float: left" >订单号:{{orderNumber}}</div>
              <div style="width: 30%;float: left" >传真:{{fax}}</div>
            </div>
          </div>
          <div style="width: 100%;">
            <div style="width: 100%;margin-bottom: 10px;">
              <div style="width: 35%;float: left" >交货地址:{{address}}</div>
            </div>
          </div>
          <div style="width: 100%;">
            <div style="width: 40%;float: left">客户名称:{{realName}}</div>
            <div style="width: 40%;float: left">收款类型:{{typeName}}</div>
            <div style="width: 20%;float: right">收款日期:{{date}}</div>
          </div>
          <table class="table" id="printpdf">
            <tr >
              <td colspan="1" width="40" height="50">序号</td>
              <td colspan="2" width="300" height="50">名称/规格</td>
              <td colspan="2" width="220">数量</td>
              <td colspan="2" width="220">单价</td>
              <td colspan="2" width="200">总价</td>
              <td colspan="2" width="170">备注</td>
            </tr>
            <tr v-for="(item,index) in receiptData" :key="index">
              <td colspan="1" width="40" height="50">1</td>
              <td colspan="2" width="300" height="50">{{ item.name }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tNumber" >{{ item.number }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRetailprice">{{ item.retailprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tTotalprice">{{ item.totalprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRemark">{{ item.remark }}</td>
            </tr>
            <tr v-for="(item2,index2) in receiptData2" :key="'info-2'+index2">
            <td colspan="1" width="40" height="50">2</td>
              <td colspan="2" width="300" height="50">{{ item2.name }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tNumber2" >{{ item2.number }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRetailprice2">{{ item2.retailprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tTotalprice2">{{ item2.totalprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRemark2">{{ item2.remark }}</td>
            </tr>
            <tr v-for="(item3,index3) in receiptData3" :key="'info-3'+index3">
            <td colspan="1" width="40" height="50">3</td>
              <td colspan="2" width="300" height="50">{{ item3.name }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tNumber3" >{{ item3.number }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRetailprice3">{{ item3.retailprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tTotalprice3">{{ item3.totalprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRemark3">{{ item3.remark }}</td>
            </tr>
            <tr v-for="(item4,index4) in receiptData4" :key="'info-4'+index4">
            <td colspan="1" width="40" height="50">4</td>
              <td colspan="2" width="300" height="50">{{ item4.name }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tNumber4" >{{ item4.number }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRetailprice4">{{ item4.retailprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tTotalprice4">{{ item4.totalprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRemark4">{{ item4.remark }}</td>
            </tr>
            <tr v-for="(item5,index5) in receiptData5" :key="'info-5'+index5">
            <td colspan="1" width="40" height="50">5</td>
              <td colspan="2" width="300" height="50">{{ item5.name }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tNumber5" >{{ item5.number }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRetailprice5">{{ item5.retailprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tTotalprice5">{{ item5.totalprice }}</td>
              <td colspan="2" width="220" contentEditable="true" id="tRemark5">{{ item5.remark }}</td>
            </tr>
            <tr>
              <td colspan="2" width="100" height="30" >金额合计(大写)</td>
              <td colspan="3" width="200" height="30" >{{totalBig}}</td>
              <td colspan="2" width="100" height="30" >金额合计(小写)</td>
              <td colspan="3" width="200" height="30" >{{total}}</td>
            </tr>
          </table>
          <div style="width: 100%;margin-bottom: 10px;">
            <div style="width: 35%;float: left">备注：请仔细核对货物型号和数量，并签字回传</div>
          </div>
          <div style="width: 100%;margin-bottom: 10px;">
            <div style="width: 35%;float: left">制单：{{realName}}</div>
            <div style="width: 50%;float: left">收货盖章签署：</div>
          </div>
        </div>
      </div>
    </div>
    </a-card>
      </template>
            </j-modal>
          </a-col>
    </a-row>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import AccountheadModal from './modules/AccountheadModal'
  import JInput from '@/components/jeecg/JInput.vue'
  import {getAction} from '@/api/manage'
  import Print from 'vue-print-nb'
  import Vue from 'vue'
  Vue.use(Print); 

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
        receiptData: [],
        receiptData2: [],
        receiptData3: [],
        receiptData4: [],
        receiptData5: [],
        realName:"",
        orderNumber:"",
        typeName:"",
        date:"",
        email:"",
        phoneNum:"",
        address:"",
        fax:"",
        totalBig:"",
        total:"",
        modal: {
            visible: false,
            fullscreen: false,
        },
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
            width:130,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/accounthead/accounthead/list",
          delete: "/accounthead/accounthead/delete",
          deleteBatch: "/accounthead/accounthead/deleteBatch",
          exportXlsUrl: "/accounthead/accounthead/exportXls",
          importExcelUrl: "accounthead/accounthead/importExcel",
          queryByIdsUrl: "accounthead/accounthead/queryById",
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
      },
      printer(record){
        this.modal.visible=true;
        this.receiptData=[];
        this.receiptData2=[];
        this.receiptData3=[];
        this.receiptData4=[];
        this.receiptData5=[];
        getAction(this.url.queryByIdsUrl,
           {id: record.id}).then((res) => {
              if (res.success) {
                  console.log(res.result);
                  var accountheads=res.result.accountheads;
                  var result=res.result;
                  this.totalBig=result.ALLTotalprice;
                  this.realName=result.realname;
                  this.total=result.allTotalprice;
                  this.address=result.address;
                  this.phoneNum=result.phone;
                  this.orderNumber=result.billno;
                  this.email=result.email;
                  var i=0;
                  accountheads.findIndex( r=> {                  
                      var item = new Object();
                      item.id=r.id;
                      item.name = r.materialName;
                      item.retailprice= r.changeamount;
                      item.number=r.count;
                      item.totalprice=r.totalprice;
                      item.remark=r.remark;
                      switch(i){
                                case 0: this.receiptData.push(item);
                                break;
                                case 1: this.receiptData2.push(item);
                                break;
                                case 2: this.receiptData3.push(item);
                                break;
                                case 3: this.receiptData4.push(item);
                                break;
                                case 4: this.receiptData5.push(item);
                                break;
                      }
                      i++;
                  })

                }               
          });

      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
  .table p {
    text-align: center;
    margin: 10px 0;
    color: #000c17;
    font-size: 18px;
  }
  .table{
    border-style: solid;
    border-width: 1.0pt;
    font-variant: normal;
  }
  td{
    border-style: solid;
    border-width: 1.0pt;
  }
  .centent > p{
    float: left;
    font-size: 18px;
    font-variant: normal;
    color: #000c17;
  }
  .tables{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #pdfDom{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .title{
    font-size: 30px;
    font-variant: normal;
  }
</style>