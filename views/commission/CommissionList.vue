<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="4" :lg="5" :md="8" :sm="20">
            <a-form-item label="选择分类" >

              <select v-model="selectUserValue" @change="selectFn">
            <option :value="list.text" v-for="list in dictOptionsUser">{{list.text}}</option>
            </select>
            
          </a-form-item>
          </a-col>

          <a-col :xl="4" :lg="7" :md="8" :sm="24">
            <a-form-item label="名称">
            <j-input placeholder="请输入账号模糊查询" v-model="queryParam.name"></j-input>
            </a-form-item>
          </a-col>

          <a-col :xl="3" :lg="3" :md="8" :sm="24">
            <a-form-item label="库存">
              <a-select  @change='forAllChange'>
                <a-select-option value=''>全部</a-select-option>
                <a-select-option value='1'>有库存</a-select-option>
                <a-select-option value='0'>无库存</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :xl="3" :lg="3" :md="8" :sm="24">
            <a-form-item label="是否组合">
              <a-select  @change='forAllChange2'>
                <a-select-option value=''>全部</a-select-option>
                <a-select-option value='1'>组合</a-select-option>
                <a-select-option value='0'>单件</a-select-option>
              </a-select>
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

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <template slot="avatarslot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user"/>
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

        </span>


      </a-table>
    </div>
    <!-- table区域-end -->

    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

    <password-modal ref="passwordmodal" @ok="passwordModalOk"></password-modal>

    <sys-user-agent-modal ref="sysUserAgentModal"></sys-user-agent-modal>

    <!-- 用户回收站 -->
    <user-recycle-bin-modal :visible.sync="recycleBinVisible" @ok="modalFormOk"/>

  </a-card>
</template>

<script>
  import UserModal from './modules/UserModal'
  import {putAction,getFileAccessHttpUrl} from '@/api/manage';
  import {frozenBatch} from '@/api/api'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import SysUserAgentModal from "./modules/SysUserAgentModal";
  import JInput from '@/components/jeecg/JInput'
  import {getAction,httpAction,postAction} from '@/api/manage'

  export default {
    name: "CommissionList",
    mixins: [JeecgListMixin],
    components: {
      SysUserAgentModal,
      UserModal,
      JInput
    },
    mounted(){
         getAction("tree/tree/selectNotChilde", {}).then((res) => {             
              if (res.success) {
                  res.result.findIndex( r=> {
                    console.log("res===="+r);
                    var item = new Object();
                      //item.id=r.ID;
                      item.text=r.username;
                      //item.value = r.PHONENUM;
                      var object = new Object();
                      object.id=r.id;
                      if(r.EMAIL!=null){
                          this.email=r.EMAIL;
                      }
                      item.value=JSON.stringify(object); 
                    this.dictOptionsUser.push(item);
                    
                  })
                }
                console.log("dictOptionsUser="+this.dictOptionsUser);
          });

    },
    data() {
      return {
        description: '这是用户管理页面',
        queryParam: {},
        recycleBinVisible: false,
        dictOptionsUser:[],
        selectUserValue:"",
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
          imgerver: window._CONFIG['staticDomainURL'],
          syncUser: "/process/extActProcess/doSyncUser",
          list: "/food/material/list?column=storage&order=asc",
          delete: "/sys/user/delete",
          deleteBatch: "/sys/user/deleteBatch",
          exportXlsUrl: "/sys/user/exportXls",
          importExcelUrl: "sys/user/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      getAvatarView: function (avatar) {
        return getFileAccessHttpUrl(avatar,this.url.imgerver,"http")
      },

      batchFrozen: function (status) {
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！');
          return false;
        } else {
          let ids = "";
          let that = this;
          let isAdmin = false;
          that.selectionRows.forEach(function (row) {
            if (row.username == 'admin') {
              isAdmin = true;
            }
          });
          if (isAdmin) {
            that.$message.warning('管理员账号不允许此操作,请重新选择！');
            return;
          }
          that.selectedRowKeys.forEach(function (val) {
            ids += val + ",";
          });
          that.$confirm({
            title: "确认操作",
            content: "是否" + (status == 1 ? "解冻" : "冻结") + "选中账号?",
            onOk: function () {
              frozenBatch({ids: ids, status: status}).then((res) => {
                if (res.success) {
                  that.$message.success(res.message);
                  that.loadData();
                  that.onClearSelected();
                } else {
                  that.$message.warning(res.message);
                }
              });
            }
          });
        }
      },
      handleMenuClick(e) {
        if (e.key == 1) {
          this.batchDel();
        } else if (e.key == 2) {
          this.batchFrozen(2);
        } else if (e.key == 3) {
          this.batchFrozen(1);
        }
      },
      handleFrozen: function (id, status, username) {
        let that = this;
        //TODO 后台校验管理员角色
        if ('admin' == username) {
          that.$message.warning('管理员账号不允许此操作！');
          return;
        }
        frozenBatch({ids: id, status: status}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      handleChangePassword(username) {
        this.$refs.passwordmodal.show(username);
      },
      handleAgentSettings(username){
        this.$refs.sysUserAgentModal.agentSettings(username);
        this.$refs.sysUserAgentModal.title = "用户代理人设置";
      },
      handleSyncUser() {
      },
      passwordModalOk() {
        //TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
      },
      selectFn(e){
            console.log(e);
            console.log(e.target.selectedIndex);
            console.log(e.target.value);
            for(var j = 0,len=this.dictOptionsUser.length; j < len; j++) {
                  var item = this.dictOptionsUser[j];                 
                  var object=JSON.parse(item.value);
                  var uid=object.id;
                  if(j==e.target.selectedIndex){
                    this.queryParam.catalog=uid;                  
                    break;
                  }
            } 
            
            console.log(this.queryParam);
        },
        forAllChange(value){
          this.queryParam.storage0=value
        },
        forAllChange2(value){
          this.queryParam.combination=value
        }
    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>