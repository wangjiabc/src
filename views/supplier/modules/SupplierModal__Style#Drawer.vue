<template>
  <a-drawer
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible">
  
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="客户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'supplier', validatorRules.supplier]" placeholder="请输入客户名称"></a-input>
        </a-form-item>
       <!-- <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'contacts', validatorRules.contacts]" placeholder="请输入联系人"></a-input>
        </a-form-item> -->
        <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'phonenum', validatorRules.phonenum]" placeholder="请输入联系电话"></a-input>
        </a-form-item>
      <!--  <a-form-item label="电子邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'email', validatorRules.email]" placeholder="请输入电子邮箱"></a-input>
        </a-form-item> -->
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'description', validatorRules.description]" placeholder="请输入备注"></a-input>
        </a-form-item>
      <!--  <a-form-item label="是否系统自带 0==系统 1==非系统" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'isystem', validatorRules.isystem]" placeholder="请输入是否系统自带 0==系统 1==非系统" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'type', validatorRules.type]" placeholder="请输入类型"></a-input>
        </a-form-item>
        <a-form-item label="启用" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'enabled', validatorRules.enabled]" placeholder="请输入启用"></a-input>
        </a-form-item>
        <a-form-item label="预收款" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'advancein', validatorRules.advancein]" placeholder="请输入预收款" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="期初应收" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'beginneedget', validatorRules.beginneedget]" placeholder="请输入期初应收" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="期初应付" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'beginneedpay', validatorRules.beginneedpay]" placeholder="请输入期初应付" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="累计应收" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'allneedget', validatorRules.allneedget]" placeholder="请输入累计应收" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="累计应付" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'allneedpay', validatorRules.allneedpay]" placeholder="请输入累计应付" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="传真" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'fax', validatorRules.fax]" placeholder="请输入传真"></a-input>
        </a-form-item>
        <a-form-item label="手机" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'telephone', validatorRules.telephone]" placeholder="请输入手机"></a-input>
        </a-form-item>
        <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'address', validatorRules.address]" placeholder="请输入地址"></a-input>
        </a-form-item>
        <a-form-item label="纳税人识别号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'taxnum', validatorRules.taxnum]" placeholder="请输入纳税人识别号"></a-input>
        </a-form-item>
        <a-form-item label="开户行" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'bankname', validatorRules.bankname]" placeholder="请输入开户行"></a-input>
        </a-form-item>
        <a-form-item label="账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'accountnumber', validatorRules.accountnumber]" placeholder="请输入账号"></a-input>
        </a-form-item>
        <a-form-item label="税率" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'taxrate', validatorRules.taxrate]" placeholder="请输入税率" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="删除标记，0未删除，1删除" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'deleteFlag', validatorRules.deleteFlag]" placeholder="请输入删除标记，0未删除，1删除"></a-input>
        </a-form-item>
        <a-form-item label="创建日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建日期" v-decorator="[ 'createTime', validatorRules.createTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="创建人登录名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'createBy', validatorRules.createBy]" placeholder="请输入创建人登录名称"></a-input>
        </a-form-item>
        <a-form-item label="更新人登录名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'updateBy', validatorRules.updateBy]" placeholder="请输入更新人登录名称"></a-input>
        </a-form-item>
        <a-form-item label="更新日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择更新日期" v-decorator="[ 'updateTime', validatorRules.updateTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="所属部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'sysOrgCode', validatorRules.sysOrgCode]" placeholder="请输入所属部门"></a-input>
        </a-form-item>-->
        
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  
  
  export default {
    name: "SupplierModal",
    components: { 
      JDate,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
          supplier: {rules: [
            {required: true, message: '请输入供应商名称!'},
          ]},
          contacts: {rules: [
          ]},
          phonenum: {rules: [
          ]},
          email: {rules: [
          ]},
          description: {rules: [
          ]},
          isystem: {rules: [
          ]},
          type: {rules: [
          ]},
          enabled: {rules: [
          ]},
          advancein: {rules: [
          ]},
          beginneedget: {rules: [
          ]},
          beginneedpay: {rules: [
          ]},
          allneedget: {rules: [
          ]},
          allneedpay: {rules: [
          ]},
          fax: {rules: [
          ]},
          telephone: {rules: [
          ]},
          address: {rules: [
          ]},
          taxnum: {rules: [
          ]},
          bankname: {rules: [
          ]},
          accountnumber: {rules: [
          ]},
          taxrate: {rules: [
          ]},
          deleteFlag: {rules: [
          ]},
          createTime: {rules: [
          ]},
          createBy: {rules: [
          ]},
          updateBy: {rules: [
          ]},
          updateTime: {rules: [
          ]},
          sysOrgCode: {rules: [
          ]},
        },
        url: {
          add: "/supplier/supplier/add",
          edit: "/supplier/supplier/edit",
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'supplier','contacts','phonenum','email','description','isystem','type','enabled','advancein','beginneedget','beginneedpay','allneedget','allneedpay','fax','telephone','address','taxnum','bankname','accountnumber','taxrate','deleteFlag','createTime','createBy','updateBy','updateTime','sysOrgCode'))
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }
         
        })
      },
      handleCancel () {
        this.close()
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'supplier','contacts','phonenum','email','description','isystem','type','enabled','advancein','beginneedget','beginneedpay','allneedget','allneedpay','fax','telephone','address','taxnum','bankname','accountnumber','taxrate','deleteFlag','createTime','createBy','updateBy','updateTime','sysOrgCode'))
      }
      
    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>