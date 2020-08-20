<template>

<a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: calc(100% - 25px);overflow: auto;padding-bottom: 20px;">

  <a-row :gutter="10">
    <a-col :md="12" :sm="24">
      <a-card :bordered="false">
        <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
          <a-alert type="info" :showIcon="true">
            <div slot="message">
              当前选择：<span v-if="this.currSelected.title">{{ getCurrSelectedTitle() }}</span>
              <a v-if="this.currSelected.title" style="margin-left: 10px" @click="onClearSelected">取消选择</a>
            </div>
          </a-alert>
          <a-input-search @search="onSearch" style="width:100%;margin-top: 10px" placeholder="请输入部门名称"/>
          <!-- 树-->
          <a-col :md="10" :sm="24">
            <template>
              <a-dropdown :trigger="[this.dropTrigger]" @visibleChange="dropStatus">
               <span style="user-select: none">
            <a-tree
              checkable
              multiple
              @select="onSelect"
              @check="onCheck"
              @rightClick="rightHandle"
              :selectedKeys="selectedKeys"
              :checkedKeys="checkedKeys"
              :treeData="departTree"
              :checkStrictly="checkStrictly"
              :expandedKeys="iExpandedKeys"
              :autoExpandParent="autoExpandParent"
              @expand="onExpand"/>
                </span>
                <!--新增右键点击事件,和增加添加和删除功能-->
                <a-menu slot="overlay">
                  <a-menu-item @click="handleAdd(3)" key="1">添加</a-menu-item>
                  <a-menu-item @click="handleDelete" key="2">删除</a-menu-item>
                  <a-menu-item @click="closeDrop" key="3">取消</a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-col>
        </div>
      </a-card>
      <!---- author:os_chengtgen -- date:20190827 --  for:切换父子勾选模式 =======------>
      <div class="drawer-bootom-button">
        <a-dropdown :trigger="['click']" placement="topCenter">
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="switchCheckStrictly(1)">父子关联</a-menu-item>
            <a-menu-item key="2" @click="switchCheckStrictly(2)">取消关联</a-menu-item>
            <a-menu-item key="3" @click="checkALL">全部勾选</a-menu-item>
            <a-menu-item key="4" @click="cancelCheckALL">取消全选</a-menu-item>
            <a-menu-item key="5" @click="expandAll">展开所有</a-menu-item>
            <a-menu-item key="6" @click="closeAll">合并所有</a-menu-item>
          </a-menu>
          <a-button>
            树操作 <a-icon type="up" />
          </a-button>
        </a-dropdown>
      </div>
      <!---- author:os_chengtgen -- date:20190827 --  for:切换父子勾选模式 =======------>
    </a-col>
    <a-col :md="12" :sm="24">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="基本信息" key="1" >
          <a-card :bordered="false">
            <a-form :form="form">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="机构名称">
                <a-input placeholder="请输入机构/部门名称" v-decorator="['departName', validatorRules.departName ]"/>
              </a-form-item>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上级部门">
                <a-tree-select
                  style="width:100%"
                  :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                  :treeData="treeData"
                  :disabled="disable"
                  v-model="model.parentId"
                  placeholder="无">
                </a-tree-select>
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="机构编码">
                <a-input disabled placeholder="请输入机构编码" v-decorator="['orgCode', validatorRules.orgCode ]"/>
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="机构类型">
                <template v-if="orgCategoryDisabled">
                  <a-radio-group v-decorator="['orgCategory',validatorRules.orgCategory]" placeholder="请选择机构类型">
                    <a-radio value="1">
                      公司
                    </a-radio>
                  </a-radio-group>
                </template>
                <template v-else>
                  <a-radio-group v-decorator="['orgCategory',validatorRules.orgCategory]" placeholder="请选择机构类型">
                    <a-radio value="2">
                      部门
                    </a-radio>
                    <a-radio value="3">
                      岗位
                    </a-radio>
                  </a-radio-group>
                </template>
              </a-form-item>
             
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="commissionType">
                <template >
                  <a-radio-group v-decorator="['commissionType',validatorRules.commissionType]" placeholder="请选择机构类型">
                    <a-radio value="0">
                      0
                    </a-radio>
                  </a-radio-group>
                </template>
                <template >
                  <a-radio-group v-decorator="['commissionType',validatorRules.commissionType]" placeholder="请选择机构类型">
                    <a-radio value="1">
                      1
                    </a-radio>
                  </a-radio-group>
                </template>
                <template>
                  <a-radio-group v-decorator="['commissionType',validatorRules.commissionType]" placeholder="请选择机构类型">
                    <a-radio value="2">
                      2
                    </a-radio>
                  </a-radio-group>
                </template>
              </a-form-item>
              
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="amount">
                <a-input placeholder="amount" v-decorator="['amount', {'initialValue':''}]"/>
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="percentage">
                <a-input placeholder="percentage" v-decorator="['percentage', {'initialValue':''}] "/>
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="备注">
                <a-textarea placeholder="请输入备注" v-decorator="['memo', {'initialValue':''}]"/>
              </a-form-item>
            </a-form>
            <div class="anty-form-btn">
              <a-button @click="emptyCurrForm" type="default" htmlType="button" icon="sync">重置</a-button>
              <a-button @click="submitCurrForm" type="primary" htmlType="button" icon="form">修改并保存</a-button>
            </div>
          </a-card>
        </a-tab-pane>
      <!--  <a-tab-pane tab="部门权限" key="2" forceRender>
          <depart-auth-modal ref="departAuth"/>
        </a-tab-pane>  -->
      </a-tabs>

    </a-col>
    <depart-modal ref="departModal" @ok="loadTree"></depart-modal>
  </a-row>

</a-drawer>

</template>

<script>
  import DepartModal from './DepartModal'
  import pick from 'lodash.pick'
  import {queryDepartTreeList,queryDepartCommisionTreeList, searchByKeywords, deleteByDepartId} from '@/api/api'
  import {httpAction, deleteAction} from '@/api/manage'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import DepartAuthModal from './DepartAuthModal'
  const columns = [
    {
      title: '机构名称',
      dataIndex: 'departName'
    },
    {
      title: '机构类型',
      align: 'center',
      dataIndex: 'orgType'
    },
    {
      title: '机构编码',
      dataIndex: 'orgCode',
    },
    {
      title: 'commissionType',
      dataIndex: 'commissionType'
    },
    {
      title: 'amount',
      dataIndex: 'amount'
    },
    {
      title: 'percentage',
      dataIndex: 'percentage'
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'action',
      scopedSlots: {customRender: 'action'}
    }
  ]
  export default {
    name: "UserModal",
    components: {
      DepartAuthModal,
      DepartModal
    },
    data () {
      return {
        departDisabled: false, //是否是我的部门调用该页面
        roleDisabled: false, //是否是角色维护调用该页面
        modalWidth:1200,
        drawerWidth:1000,
        modaltoggleFlag:true,
        confirmDirty: false,
        selectedDepartKeys:[], //保存用户选择部门id
        checkedDepartKeys:[],
        checkedDepartNames:[], // 保存部门的名称 =>title
        checkedDepartNameString:"", // 保存部门的名称 =>title
        resultDepartOptions:[],
        userId:"", //保存用户id
        disableSubmit:false,
        userDepartModel:{userId:'',departIdList:[]}, // 保存SysUserDepart的用户部门中间表数据需要的对象
        dateFormat:"YYYY-MM-DD",
        iExpandedKeys: [],
        loading: false,
        autoExpandParent: true,
        currFlowId: '',
        currFlowName: '',
        disable: true,
        treeData: [],
        visible: false,
        departTree: [],
        rightClickSelectedKey: '',
        hiding: true,
        model: {},
        dropTrigger: '',
        depart: {},
        columns: columns,
        disableSubmit: false,
        checkedKeys: [],
        selectedKeys: [],
        autoIncr: 1,
        currSelected: {},

        allTreeKeys:[],
        checkStrictly: true,
        departIdShow:false,
        departIds:[], //负责部门id
        title:"操作",
        visible: false,
        model: {},
        roleList:[],
        selectedRole:[],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        uploadLoading:false,
        confirmLoading: false,
        headers:{},
        form:this.$form.createForm(this),
        picUrl: "",
        validatorRules: {
          departName: {rules: [{required: true, message: '请输入机构/部门名称!'}]},
          orgCode: {rules: [{required: true, message: '请输入机构编码!'}]},
          orgCategory: {rules: [{required: true, message: '请输入机构类型!'}]},
          mobile: {rules: [{validator: this.validateMobile}]},
          commissionType:{rules: [{validator: this.commissionType}]}
        },
        url: {
          fileUpload: window._CONFIG['domianURL']+"/sys/common/upload",
          imgerver: window._CONFIG['staticDomainURL'],
          userWithDepart: "/sys/user/userDepartList", // 引入为指定用户查看部门信息需要的url
          userId:"food/material/queryByIds", // 引入生成添加用户情况下的url
          syncUserByUserName:"/process/extActProcess/doSyncUserByUserName",//同步用户到工作流
          delete: '/sys/sysDepart/delete',
          edit: '/commissionManner/commissionManner/edit',
          deleteBatch: '/sys/sysDepart/deleteBatch',
          exportXlsUrl: "sys/sysDepart/exportXls",
          importExcelUrl: "sys/sysDepart/importExcel",
        },
        identity:"1",
        fileList:[],
        orgCategoryDisabled:false,
      }
    },
    created () {
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"X-Access-Token":token}

    },
    computed:{
      uploadAction:function () {
        return this.url.fileUpload;
      },
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      isDisabledAuth(code){
        return disabledAuthFilter(code);
      },
      //窗口最大化切换
      toggleScreen(){
        if(this.modaltoggleFlag){
          this.modalWidth = window.innerWidth;
        }else{
          this.modalWidth = 800;
        }
        this.modaltoggleFlag = !this.modaltoggleFlag;
      },
      initialRoleList(){
        


      },

      refresh () {
          this.selectedDepartKeys=[];
          this.checkedDepartKeys=[];
          this.checkedDepartNames=[];
          this.checkedDepartNameString = "";
          this.userId=""
          this.resultDepartOptions=[];
          this.departId=[];
          this.departIdShow=false;
      },
      add () {
        this.picUrl = "";
        this.refresh();
        this.edit({activitiSync:'1'});
      },
      edit (record) {
        this.resetScreenSize(); // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        let that = this;
        that.initialRoleList();
        that.checkedDepartNameString = "";
        that.form.resetFields();
        
        that.userId = record.id;
        that.visible = true;
        that.model = Object.assign({}, record);
        that.loadTree();
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.disableSubmit = false;
        this.selectedRole = [];
        this.userDepartModel = {userId:'',departIdList:[]};
        this.checkedDepartNames = [];
        this.checkedDepartNameString='';
        this.checkedDepartKeys = [];
        this.selectedDepartKeys = [];
        this.resultDepartOptions=[];
        this.departIds=[];
        this.departIdShow=false;
        this.identity="1";
        this.fileList=[];
      },
      handleSubmit () {

        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            if(!values.birthday){
              values.birthday = '';
            }else{
              values.birthday = values.birthday.format(this.dateFormat);
            }
            let formData = Object.assign(this.model, values);
            formData.avatar = that.fileList;
            formData.selectedroles = this.selectedRole.length>0?this.selectedRole.join(","):'';
            formData.selecteddeparts = this.userDepartModel.departIdList.length>0?this.userDepartModel.departIdList.join(","):'';
            formData.identity=this.identity;
            //如果是上级择传入departIds,否则为空
            if(this.identity==="2"){
              formData.departIds=this.departIds.join(",");
            }else{
              formData.departIds="";
            }
            // that.addDepartsToUser(that,formData); // 调用根据当前用户添加部门信息的方法
            let obj;
            if(!this.model.id){
              formData.id = this.userId;
              obj=addUser(formData);
            }else{
              obj=editUser(formData);
            }
            obj.then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.checkedDepartNames = [];
              that.userDepartModel.departIdList = {userId:'',departIdList:[]};
              that.close();
            })

          }
        })
      },
      handleCancel () {
        this.close()
      },
      handleChange (info) {
        this.picUrl = "";
        if (info.file.status === 'uploading') {
          this.uploadLoading = true;
          return
        }
        if (info.file.status === 'done') {
          var response = info.file.response;
          this.uploadLoading = false;
          console.log(response);
          if(response.success){
            this.model.avatar = response.message;
            this.picUrl = "Has no pic url yet";
          }else{
            this.$message.warning(response.message);
          }
        }
      },
      // 获取用户对应部门弹出框提交给返回的数据
      modalFormOk (formData) {
        this.checkedDepartNames = [];
        this.selectedDepartKeys = [];
        this.checkedDepartNameString = '';
        this.userId = formData.userId;
        this.userDepartModel.userId = formData.userId;
        this.departIds=[];
        this.resultDepartOptions=[];
        var depart=[];
        for (let i = 0; i < formData.departIdList.length; i++) {
          this.selectedDepartKeys.push(formData.departIdList[i].key);
          this.checkedDepartNames.push(formData.departIdList[i].title);
          this.checkedDepartNameString = this.checkedDepartNames.join(",");
          //新增部门选择，如果上面部门选择后不为空直接付给负责部门
          depart.push({
              key:formData.departIdList[i].key,
              title:formData.departIdList[i].title
          })
          this.departIds.push(formData.departIdList[i].key)
        }
        this.resultDepartOptions=depart;
        this.userDepartModel.departIdList = this.selectedDepartKeys;
        this.checkedDepartKeys = this.selectedDepartKeys  //更新当前的选择keys
       },
      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize(){
        let screenWidth = document.body.clientWidth;
        if(screenWidth < 500){
          this.drawerWidth = screenWidth;
        }else{
          this.drawerWidth = 900;
        }
      },
      identityChange(e){
        if(e.target.value==="1"){
            this.departIdShow=false;
        }else{
            this.departIdShow=true;
        }
      },
      loadData() {
        this.refresh();
      },
      loadTree() {
        var that = this
        console.log("userId=="+that.userId);
        that.treeData = []
        that.departTree = []
        queryDepartCommisionTreeList({materialId:that.userId}).then((res) => {
          if (res.success) {
            for (let i = 0; i < res.result.length; i++) {
              let temp = res.result[i]
              that.treeData.push(temp)
              that.departTree.push(temp)
              that.setThisExpandedKeys(temp)
              that.getAllKeys(temp);
              // console.log(temp.id)
            }
            this.loading = false
          }
        })
      },
      setThisExpandedKeys(node) {
        if (node.children && node.children.length > 0) {
          this.iExpandedKeys.push(node.key)
          for (let a = 0; a < node.children.length; a++) {
            this.setThisExpandedKeys(node.children[a])
          }
        }
      },
      refresh() {
        this.loading = true
        this.loadTree()
      },
      // 右键操作方法
      rightHandle(node) {
        this.dropTrigger = 'contextmenu'
        console.log(node.node.eventKey)
        this.rightClickSelectedKey = node.node.eventKey
      },
      onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys)
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.iExpandedKeys = expandedKeys
        this.autoExpandParent = false
      },
      backFlowList() {
        this.$router.back(-1)
      },
      // 右键点击下拉框改变事件
      dropStatus(visible) {
        if (visible == false) {
          this.dropTrigger = ''
        }
      },
      // 右键店家下拉关闭下拉框
      closeDrop() {
        this.dropTrigger = ''
      },
      addRootNode() {
        this.$refs.nodeModal.add(this.currFlowId, '')
      },
      batchDel: function () {
        console.log(this.checkedKeys)
        if (this.checkedKeys.length <= 0) {
          this.$message.warning('请选择一条记录！')
        } else {
          var ids = ''
          for (var a = 0; a < this.checkedKeys.length; a++) {
            ids += this.checkedKeys[a] + ','
          }
          var that = this
          this.$confirm({
            title: '确认删除',
            content: '确定要删除所选中的 ' + this.checkedKeys.length + ' 条数据，以及子节点数据吗?',
            onOk: function () {
              deleteAction(that.url.deleteBatch, {ids: ids}).then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadTree()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              })
            }
          })
        }
      },
      onSearch(value) {
        let that = this
        if (value) {
          searchByKeywords({keyWord: value}).then((res) => {
            if (res.success) {
              that.departTree = []
              for (let i = 0; i < res.result.length; i++) {
                let temp = res.result[i]
                that.departTree.push(temp)
              }
            } else {
              that.$message.warning(res.message)
            }
          })
        } else {
          that.loadTree()
        }

      },
      nodeModalOk() {
        this.loadTree()
      },
      nodeModalClose() {
      },
      hide() {
        console.log(111)
        this.visible = false
      },
      onCheck(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info)
        this.hiding = false
        //this.checkedKeys = checkedKeys.checked
        // <!---- author:os_chengtgen -- date:20190827 --  for:切换父子勾选模式 =======------>
        if(this.checkStrictly){
          this.checkedKeys = checkedKeys.checked;
        }else{
          this.checkedKeys = checkedKeys
        }
        // <!---- author:os_chengtgen -- date:20190827 --  for:切换父子勾选模式 =======------>
      },
      onSelect(selectedKeys, e) {
        console.log('selected', selectedKeys, e)
        this.hiding = false
        let record = e.node.dataRef
        console.log('onSelect-record', record)
        this.currSelected = Object.assign({}, record)
        this.model = this.currSelected
        this.selectedKeys = [record.key]
        this.model.parentId = record.parentId
        this.setValuesToForm(record)
       // this.$refs.departAuth.show(record.id);

      },
      // 触发onSelect事件时,为部门树右侧的form表单赋值
      setValuesToForm(record) {
        if(record.orgCategory == '1'){
          this.orgCategoryDisabled = true;
        }else{
          this.orgCategoryDisabled = false;
        }
        this.form.getFieldDecorator('fax', {initialValue: ''})
        this.form.setFieldsValue(pick(record, 'departName','orgCategory', 'orgCode', 'departOrder', 'commissionType','commission','amount','percentage','mobile', 'fax', 'address', 'memo'))
      },
      getCurrSelectedTitle() {
        return !this.currSelected.title ? '' : this.currSelected.title
      },
      onClearSelected() {
        this.hiding = true
        this.checkedKeys = []
        this.currSelected = {}
        this.form.resetFields()
        this.selectedKeys = []
        this.$refs.departAuth.departId = ''
      },
      handleNodeTypeChange(val) {
        this.currSelected.nodeType = val
      },
      notifyTriggerTypeChange(value) {
        this.currSelected.notifyTriggerType = value
      },
      receiptTriggerTypeChange(value) {
        this.currSelected.receiptTriggerType = value
      },
      submitCurrForm() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.currSelected.id) {
              this.$message.warning('请点击选择要修改部门!')
              return
            }

            this.currSelected.materialId=this.userId;

            let formData = Object.assign(this.currSelected, values)
            console.log('Received values of form: ', formData)

            if(this.currSelected.commissionType==1){
              if(this.currSelected.amount==null){
                this.$message.warning('金额不能为空!')
                 return
              }
            }
            
            if(this.currSelected.commissionType==2){
              if(this.currSelected.percentage==null){
                this.$message.warning('百分比不能为空!')
                 return
              }
            }
            
            httpAction(this.url.edit, formData, 'put').then((res) => {
              if (res.success) {
                this.$message.success('保存成功!')
                this.loadTree()
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
      },
      emptyCurrForm() {
        this.form.resetFields()
      },
      nodeSettingFormSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
          }
        })
      },
      openSelect() {
        this.$refs.sysDirectiveModal.show()
      },
      handleAdd(num) {
        if (num == 1) {
          this.$refs.departModal.add()
          this.$refs.departModal.title = '新增'
        } else if (num == 2) {
          let key = this.currSelected.key
          if (!key) {
            this.$message.warning('请先选中一条记录!')
            return false
          }
          this.$refs.departModal.add(this.selectedKeys)
          this.$refs.departModal.title = '新增'
        } else {
          this.$refs.departModal.add(this.rightClickSelectedKey)
          this.$refs.departModal.title = '新增'
        }
      },
      handleDelete() {
        deleteByDepartId({id: this.rightClickSelectedKey}).then((resp) => {
          if (resp.success) {
            this.$message.success('删除成功!')
            this.loadTree()
          } else {
            this.$message.warning('删除失败!')
          }
        })
      },
      selectDirectiveOk(record) {
        console.log('选中指令数据', record)
        this.nodeSettingForm.setFieldsValue({directiveCode: record.directiveCode})
        this.currSelected.sysCode = record.sysCode
      },
      getFlowGraphData(node) {
        this.graphDatasource.nodes.push({
          id: node.id,
          text: node.flowNodeName
        })
        if (node.children.length > 0) {
          for (let a = 0; a < node.children.length; a++) {
            let temp = node.children[a]
            this.graphDatasource.edges.push({
              source: node.id,
              target: temp.id
            })
            this.getFlowGraphData(temp)
          }
        }
      },
     // <!---- author:os_chengtgen -- date:20190827 --  for:切换父子勾选模式 =======------>
      expandAll () {
        this.iExpandedKeys = this.allTreeKeys
      },
      closeAll () {
        this.iExpandedKeys = []
      },
      checkALL () {
        this.checkStriccheckStrictlytly = false
        this.checkedKeys = this.allTreeKeys
      },
      cancelCheckALL () {
        //this.checkedKeys = this.defaultCheckedKeys
        this.checkedKeys = []
      },
      switchCheckStrictly (v) {
        if(v==1){
          this.checkStrictly = false
        }else if(v==2){
          this.checkStrictly = true
        }
      },
      getAllKeys(node) {
        // console.log('node',node);
        this.allTreeKeys.push(node.key)
        if (node.children && node.children.length > 0) {
          for (let a = 0; a < node.children.length; a++) {
            this.getAllKeys(node.children[a])
          }
        }
      }
      // <!---- author:os_chengtgen -- date:20190827 --  for:切换父子勾选模式 =======------>
      
    },
    created() {
      this.currFlowId = this.$route.params.id
      this.currFlowName = this.$route.params.name
      // this.loadTree()
    },

    
  }
</script>

<style scoped>
  .avatar-uploader > .ant-upload {
    width:104px;
    height:104px;
  }
  .ant-upload-select-picture-card i {
    font-size: 49px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }

  .drawer-bootom-button {
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }
</style>