<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="表头Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'headerid', validatorRules.headerid]" placeholder="请输入表头Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="账户Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'accountid', validatorRules.accountid]" placeholder="请输入账户Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="收支项目Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'inoutitemid', validatorRules.inoutitemid]" placeholder="请输入收支项目Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="单项金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'eachamount', validatorRules.eachamount]" placeholder="请输入单项金额" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="单据备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'remark', validatorRules.remark]" placeholder="请输入单据备注"></a-input>
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
          <j-date placeholder="请选择所属部门" v-decorator="[ 'sysOrgCode', validatorRules.sysOrgCode]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="商品id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'materialId', validatorRules.materialId]" placeholder="请输入商品id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="商品名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'materialName', validatorRules.materialName]" placeholder="请输入商品名称"></a-input>
        </a-form-item>
        <a-form-item label="单据编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'billno', validatorRules.billno]" placeholder="请输入单据编号"></a-input>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  

  export default {
    name: "AccountitemModal",
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
          headerid: {rules: [
            {required: true, message: '请输入表头Id!'},
          ]},
          accountid: {rules: [
          ]},
          inoutitemid: {rules: [
          ]},
          eachamount: {rules: [
          ]},
          remark: {rules: [
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
          materialId: {rules: [
          ]},
          materialName: {rules: [
          ]},
          billno: {rules: [
          ]},
        },
        url: {
          add: "/accountitem/accountitem/add",
          edit: "/accountitem/accountitem/edit",
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
          this.form.setFieldsValue(pick(this.model,'headerid','accountid','inoutitemid','eachamount','remark','deleteFlag','createTime','createBy','updateBy','updateTime','sysOrgCode','materialId','materialName','billno'))
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
        this.form.setFieldsValue(pick(row,'headerid','accountid','inoutitemid','eachamount','remark','deleteFlag','createTime','createBy','updateBy','updateTime','sysOrgCode','materialId','materialName','billno'))
      },

      
    }
  }
</script>