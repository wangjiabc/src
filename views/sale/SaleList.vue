<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-row :gutter="20">
      <a-col :sm="50" :md="14" :xl="10" :style="{ marginBottom: '20px' }">
        <chart-card :loading="loading" title="扫码出售" class="img3">
          <a-input style='width: 90%;ime-mode:disabled' @pressEnter="showModal" @change='onchange' v-model="openId" :disabled="false"></a-input>
        </chart-card>
      </a-col>
    </a-row>
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="名称">
            <j-input placeholder="请输入名字模糊查询" v-model="queryParam.name"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button type="primary" icon="download" @click="handleExportXls('material')">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"  @click="handleAllSale"><a-icon type="appstore"/>批量出售</a-menu-item>
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
          <a @click="handleSale(record)">出售</a>
           <a-divider type="vertical" />
           <a @click="detail(record.id)">详情</a>
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
              <div style="width: 35%;float: left" id="phoneNum">客户电话:</div>
              <div style="width: 35%;float: left" >订单号:{{orderNumber}}</div>
              <div style="width: 30%;float: left" id="fax">传真:</div>
            </div>
          </div>
          <div style="width: 100%;">
            <div style="width: 100%;margin-bottom: 10px;">
              <div style="width: 35%;float: left" id="address">交货地址:</div>
            </div>
          </div>
          <div style="width: 100%;">
            <div style="width: 40%;float: left">客户名称 : 
              <a  style="width: 80%;display: inline-block">
                <j-search-select-tag　placeholder=""
                      v-model="selectUserValue"　:dictOptions="dictOptionsUser"　@change="selectFn($event)">
                </j-search-select-tag>
              </a>
            </div>
            <div style="width: 40%;float: left">收款类型:
              <a  style="width: 30%;display: inline-block">
                <j-search-select-tag　placeholder=""
                      v-model="selectTypeValue"　:dictOptions="dictOptionsType">
                </j-search-select-tag>
              </a>
            </div>
            <div style="width: 20%;float: right">收款日期:{{new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate()}}</div>
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
              <td colspan="3" width="200" height="30" id="totalBig"></td>
              <td colspan="2" width="100" height="30" >金额合计(小写)</td>
              <td colspan="3" width="200" height="30" id="total"></td>
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
          <div slot="footer">
                  <Button style="width: 20%;float: left" @click="calculate()">自动计算</Button>
    	            <Button style="width: 10%;" @click="hideModel()">关闭</Button>
                  <Button style="width: 10%;"　type="primary" @click="save()">保存</Button>
          </div>
      </template>
            </j-modal>
          </a-col>
    </a-row>


  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MaterialModal from './modules/SaleModal'
  import JInput from '@/components/jeecg/JInput.vue';
  import { colAuthFilter } from "@/utils/authFilter"
  import {getAction} from '@/api/manage'
  import Print from 'vue-print-nb'
  import Vue from 'vue'
  import ChartCard from '@/components/ChartCard'
  import ACol from 'ant-design-vue/es/grid/Col'
  import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
  import MiniArea from '@/components/chart/MiniArea'
  import MiniProgress from '@/components/chart/MiniProgress'
  import LineChartMultid from '@/components/chart/LineChartMultid'
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import Trend from '@/components/Trend'
  import JDate from '@/components/jeecg/JDate'
  import store from '@/store/'
  Vue.use(Print); 
  import JSearchSelectTag from '@/components/dict/JSearchSelectTag'
  import {
    getLoginfo,
    getVisitInfo,
    loadOilHistory,
    chartList,
    queryStaNoticeVo,
    updateOrderTableStatus,
    getNotice,
    getUserGetOrder,
    postChangeGood
  } from '@/api/api'
  export default {
    name: "SaleList",
    mixins:[JeecgListMixin],
    components: {
      MaterialModal,
      JInput,
      JSearchSelectTag,
      ATooltip,
      ACol,
      ChartCard,
      MiniArea,
      MiniProgress,
      Trend,
      LineChartMultid,
      HeadInfo,
      JDate
    },
    created() {
          this.disableMixinCreated=true;
          this.columns = colAuthFilter(this.columns,'materialList:');
          this.loadData();
          this.initDictConfig();
     },
    mounted(){
        getAction(this.url.selectGroupUserUrl, {}).then((res) => {             
              if (res.success) {
                  res.result.findIndex( r=> {
                    console.log("res===="+r);
                    var item = new Object();
                      //item.id=r.ID;
                      item.text=r.SUPPLIER;
                      //item.value = r.PHONENUM;
                      var object = new Object();
                      object.phone=r.PHONENUM;
                      object.id=r.ID;
                      object.address=r.ADDRESS;
                      object.fax=r.FAX;
                      if(r.EMAIL!=null){
                          this.email=r.EMAIL;
                      }
                      item.value=JSON.stringify(object); 
                    this.dictOptionsUser.push(item);
                  })
                }
          });

         getAction(this.url.selectSysUserUrl, {}).then((res) => {           
              if (res.success) {
                  console.log("res=="+res.result.realname); 
                  this.realName=res.result.realname;
                }
              });
    },   
    data () {
      return {
        description: 'material管理页面',
        // 表头
         modal: {
          visible: false,
          fullscreen: false,
        },
        selectUserValue:"",
        dictOptionsUser:[],
        selectTypeValue:"",
        dictOptionsType:[{
          text:"现金",
          value:"1"
        },{
          text:"微信支付",
          value:"2"
        },{
          text:"支付宝",
          value:"3"
        },{
          text:"银联",
          value:"4"
        }],
        email:"",
        realName:"",
        orderNumber:"",
        openId: '',
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
         /* {
            title:'实库',
            align:"center",
            dataIndex: 'realStorage',
            width:100
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:180,
            scopedSlots: { customRender: 'action' }
          }
        ],
        tableData: [],
      Receipt: {
        ownerName: '',
        buildArea: '',
        payType: '',
        payUserId: '',
        payTime: '',
        payUsername: '',
        payStatus: '',
        refundAmount: '',
        refundTime: '',
        tenantId: '',
        deptId: '',
        remarks: '',
        phone: '',
        startTime: '',
        endTime: '',
        price: '',
        startRecord: '',
        endRecord: '',
        area: '',
        amount: '',
        DiscountAmount: '',
        actualAmount: '',
        billNo: '',
        employeeName: '',
        roomNo: ''
      },
      receiptData: [],
      receiptData2: [],
      receiptData3: [],
      receiptData4: [],
      receiptData5: [],
      billNo: 0,
        url: {
          list: "/food/material/list?column=sale&order=desc",
          delete: "/food/material/delete",
          deleteBatch: "/food/material/deleteBatch",
          exportXlsUrl: "/food/material/exportXls",
          importExcelUrl: "food/material/importExcel",
          querydDetailByIdUrl: "food/material/querydDetailById",
          selectGroupUserUrl: "supplier/supplier/selectGroupUser",
          selectSysUserUrl: "supplier/supplier/selectSysUser",
          queryByIdsUrl: "food/material/queryByIds",
          sale: "/food/material/sale"
        },
        dictOptions:{},
        tableScroll:{x :10*100+50}
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
      handleSale(record) {
        /*this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "商品出售";
        this.$refs.modalForm.disableSubmit = false;*/
        var that = this;
        this.modal.visible=true;
        var ids = "";
        ids += record.id + ",";
        this.receiptData=[];
        this.orderNumber=this.randomNumber();
        getAction(that.url.queryByIdsUrl, {ids: ids}).then((res) => {
              console.log(res.result);
              if (res.success) {
                  res.result.findIndex( r=> {
                    var item = new Object();
                      item.id=r.id;
                      item.name = r.name;
                      item.retailprice= r.retailprice;
                      item.number=1;
                      item.totalprice=item.retailprice*item.number;
                    this.receiptData.push(item);
                  })
                }
                console.log(this.receiptData);
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
                     html+="商品："+r.name+"  数量："+r.unit+"  库存："+r.storage+"\n";
                  });
                  alert(html);
                }
              });
              

        },
        receipt (id) {
            getAction("/accounthead/accounthead/print", {id:id}).then((res) => {
              console.log(res)
              const blob = new Blob([res], { type: 'application/pdf' })
              const url = URL.createObjectURL(blob)
              printJS({
                  printable: url,
                  type: 'pdf'
                })
            });
        },
        hideModel(){
          this.modal.visible=false;
        },
        onchange() {

        },
        showModal() {
        if (this.openId == '') {
          alter("请录入客户信息!")
        } else {
          if (this.openId.endsWith('_')) {
            this.openId = this.openId.substring(0, this.openId.length - 1)
           }

        var that = this;
        this.modal.visible=true;
        var ids = "";
        ids += this.openId + ",";
        this.receiptData=[];
        this.orderNumber=this.randomNumber();
        getAction(that.url.queryByIdsUrl, {ids: ids}).then((res) => {
              console.log(res.result);
              if (res.success) {
                  res.result.findIndex( r=> {
                    var item = new Object();
                      item.id=r.id;
                      item.name = r.name;
                      item.retailprice= r.retailprice;
                      item.number=1;
                      item.totalprice=item.retailprice*item.number;
                    this.receiptData.push(item);
                  })
                }
                console.log(this.receiptData);
          });

          this.openId=''

         }
        },
        save(){
          
          var supplierId;
          var supplier;
          try{
            var json = JSON.parse(this.selectUserValue);
            supplierId=json.id;
            for(var j = 0,len=this.dictOptionsUser.length; j < len; j++) {
                  var item = this.dictOptionsUser[j];                 
                  var object=JSON.parse(item.value);
                  var uid=object.id;
                  if(uid==supplierId){
                    supplier=item.text;
                    break;
                  }
            } 
          }catch(e){
              alert("请选择客户");
          }
          //console.log(this.selectTypeValue + supplierId +supplier);
          var type=this.selectTypeValue;
          var that=this;


          var arr=[];
          
          var id=this.receiptData[0].id;
          var number=document.getElementById("tNumber").innerText;
          var retailprice=document.getElementById("tRetailprice").innerText;
          var totalprice=document.getElementById("tTotalprice").innerText;
          var remark=document.getElementById("tRemark").innerText;

          var object = new Object();
          object.orderNumber=this.orderNumber;
          object.id=id;
          object.number=number;
          object.retailprice=retailprice;
          object.totalprice=totalprice;
          object.remark=remark;
          object.supplierId=supplierId;
          object.supplier=supplier;
          if(type!=null&&type!=""){
            object.type=type;
            object.income=1;
          }
          arr.push(object);

          if(this.receiptData2.length>0){
          id=this.receiptData2[0].id;
          number=document.getElementById("tNumber2").innerText;
          retailprice=document.getElementById("tRetailprice2").innerText;
          totalprice=document.getElementById("tTotalprice2").innerText;
          remark=document.getElementById("tRemark2").innerText;

          if(id!=null){

            var object = new Object();
            object.orderNumber=this.orderNumber;
            object.id=id;
            object.number=number;
            object.retailprice=retailprice;
            object.totalprice=totalprice;
            object.remark=remark;
            object.supplierId=supplierId;
            object.supplier=supplier;
            object.type=type;
          
            arr.push(object);

          }
          }

          if(this.receiptData3.length>0){
          id=this.receiptData3[0].id;
          number=document.getElementById("tNumber3").innerText;
          retailprice=document.getElementById("tRetailprice3").innerText;
          totalprice=document.getElementById("tTotalprice3").innerText;
          remark=document.getElementById("tRemark3").innerText;

          if(id!=null){

            var object = new Object();
            object.orderNumber=this.orderNumber;
            object.id=id;
            object.number=number;
            object.retailprice=retailprice;
            object.totalprice=totalprice;
            object.remark=remark;
            object.supplierId=supplierId;
            object.supplier=supplier;
            object.type=type;
          
            arr.push(object);

          }
          }
          if(this.receiptData4.length>0){
          id=this.receiptData4[0].id;
          number=document.getElementById("tNumber4").innerText;
          retailprice=document.getElementById("tRetailprice4").innerText;
          totalprice=document.getElementById("tTotalprice4").innerText;
          remark=document.getElementById("tRemark4").innerText;

          if(id!=null){

            var object = new Object();
            object.orderNumber=this.orderNumber;
            object.id=id;
            object.number=number;
            object.retailprice=retailprice;
            object.totalprice=totalprice;
            object.remark=remark;
            object.supplierId=supplierId;
            object.supplier=supplier;
            object.type=type;
          
            arr.push(object);

          }
          }
          if(this.receiptData5>0){
          id=this.receiptData5[0].id;
          number=document.getElementById("tNumber5").innerText;
          retailprice=document.getElementById("tRetailprice5").innerText;
          totalprice=document.getElementById("tTotalprice5").innerText;
          remark=document.getElementById("tRemark5").innerText;

          if(id!=null){

            var object = new Object();
            object.orderNumber=this.orderNumber;
            object.id=id;
            object.number=number;
            object.retailprice=retailprice;
            object.totalprice=totalprice;
            object.remark=remark;
            object.supplierId=supplierId;
            object.supplier=supplier;
            object.type=type;
          
            arr.push(object);

          }
          }
          
          var formData=encodeURI(JSON.stringify(arr));

          getAction(this.url.sale,{items:formData}).then((res)=>{
              if(res.success){    
                that.$emit('ok');
                that.$message.success(res.message);
                this.modal.visible=false;
              }else{
                that.$message.warning(res.message);
                this.modal.visible=false;
              }
            }).finally(() => {
              this.modal.visible=false;
            })
        },
        handleAllSale(row) {
          this.modal.visible=true;
          this.items=[];
          this.cmpagesItems=[];
          this.orderNumber=this.randomNumber();
          var ids = "";
          for (var a = 0; a < this.selectedRowKeys.length; a++) {
              console.log(this.selectedRowKeys[a]);
              ids += this.selectedRowKeys[a] + ",";
          }
          var that = this;
          this.receiptData=[];
          this.receiptData2=[];
          this.receiptData3=[];
          this.receiptData4=[];
          this.receiptData5=[];
          getAction(that.url.queryByIdsUrl,
           {ids: ids}).then((res) => {
              if (res.success) {
                  var i=0;
                  res.result.findIndex( r=> {                  
                      var item = new Object();
                      item.id=r.id;
                      item.name = r.name;
                      item.retailprice= r.retailprice;
                      item.number=1;
                      item.totalprice=item.retailprice*item.number;
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
        },
        selectFn(e){
            console.log(e);
            var json = JSON.parse(e);
            var supplierId=json.id;
            for(var j = 0,len=this.dictOptionsUser.length; j < len; j++) {
                  var item = this.dictOptionsUser[j];                 
                  var object=JSON.parse(item.value);
                  var uid=object.id;
                  if(uid==supplierId){
                    var supplier=item.text;
                    document.getElementById('phoneNum').innerHTML = "客户电话:"+object.phone;
                    document.getElementById('fax').innerHTML = "客户传真:"+object.fax;
                    document.getElementById('address').innerHTML = "交货地址:"+object.address;
                    break;
                  }
            } 
        },
        randomNumber() {
            const now = new Date()
            let month = now.getMonth() + 1
            let day = now.getDate()
            let hour = now.getHours()
            let minutes = now.getMinutes()
            let seconds = now.getSeconds()
            let r=Math.random().toString().slice(-6).toString()
            return now.getFullYear().toString() + month.toString() + 
                  day.toString() + hour.toString() + minutes.toString() + seconds.toString() + r
      },
      calculate(){
        var total=0;
        var  number=document.getElementById("tNumber").innerText;
        var  retailprice=document.getElementById("tRetailprice").innerText;
        var  totalprice=number*retailprice;
        total+=totalprice;
        document.getElementById("tTotalprice").innerText=totalprice.toFixed(2);

        if(this.receiptData2.length>0){
          number=document.getElementById("tNumber2").innerText;
          retailprice=document.getElementById("tRetailprice2").innerText;
          totalprice=number*retailprice;
          total+=totalprice;
          document.getElementById("tTotalprice2").innerText=totalprice.toFixed(2);
        }

        if(this.receiptData3.length>0){
          number=document.getElementById("tNumber3").innerText;
          retailprice=document.getElementById("tRetailprice3").innerText;
          totalprice=number*retailprice;
          total+=totalprice;
          document.getElementById("tTotalprice3").innerText=totalprice.toFixed(2);
        }

        if(this.receiptData4.length>0){
          number=document.getElementById("tNumber4").innerText;
          retailprice=document.getElementById("tRetailprice4").innerText;
          totalprice=number*retailprice;
          total+=totalprice;
          document.getElementById("tTotalprice4").innerText=totalprice.toFixed(2);
        }

        if(this.receiptData5.length>0){
          number=document.getElementById("tNumber5").innerText;
          retailprice=document.getElementById("tRetailprice5").innerText;
          totalprice=number*retailprice;
          total+=totalprice;
          document.getElementById("tTotalprice5").innerText=totalprice.toFixed(2);
        }

        const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(total);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

        var totalBig=s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');

        document.getElementById("totalBig").innerText=totalBig;
        document.getElementById("total").innerText=total.toFixed(2);


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

   .img1 {
    background-image: url("../../assets/index1.png");
  }

  .img2 {
    background-image: url("../../assets/index2.png");
  }

  .img3 {
    background-image: url("../../assets/index3.png");
  }

  .circle-cust {
    position: relative;
    top: 28px;
    left: -100%;
  }

  .modal-info {
    min-height: 900px !important;
  }

  .orderInfo {
    display: flex;
    line-height: 2;

  }

  .orderInfo .info-title {
    width: 20%;
  }

  .orderInfo .info-content {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
  }

  .orderInfo .info-content .box {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
  }

  .orderInfo .info-content .box .title {
    width: 20%;
  }

  .orderInfo .info-content .box .content {
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    text-align: right;
  }

  .xian {
    width: 100%;
    height: 1px;
    margin: 5px 0;
    background: #ccc;
  }

  .order-details .title {
    line-height: 2;
  }

  .text {
    color: #2990ff;
    font-size: 15px;
  }

  .notice {
    margin-bottom: 5px;
  }

  .ant-modal-content {}

  .salesCard {
    width: 100%;
    height: 300px;
  }

  .time-box {
    display: inline-block;
    margin-left: 10px;
  }

  .change-box {
    display: flex;
    margin-bottom: 10px;
  }

  .change-box .change-text {
    width: 30%;
    vertical-align: center;
  }

  .right-three {
    width: 30px;
    height: 30px;
    float: right;
  }

  .right-three img {
    width: 100%;
    height: 100%;
  }

  .chart-card-box {
    margin: 0 auto;
  }

</style>