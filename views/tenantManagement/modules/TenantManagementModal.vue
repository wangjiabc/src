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

        <a-form-item label="租户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'tenantName', validatorRules.tenantName]" placeholder="请输入租户名称"></a-input>
        </a-form-item>
        <a-form-item label="管理人员ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'managementId', validatorRules.managementId]" placeholder="请输入管理人员ID"></a-input>
        </a-form-item>
        <a-form-item label="管理人员名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'managementName', validatorRules.managementName]" placeholder="请输入管理人员名称"></a-input>
        </a-form-item>
        <a-form-item label="管理人员联系方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'managementPhone', validatorRules.managementPhone]" placeholder="请输入管理人员联系方式"></a-input>
        </a-form-item>
        <a-form-item label="使用时限" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择使用时限" v-decorator="[ 'userTimeLimit', validatorRules.userTimeLimit]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import JDate from '@/components/jeecg/JDate'  

  export default {
    name: "TenantManagementModal",
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
        validatorRules:{
        tenantName:{},
        managementId:{},
        managementName:{},
        managementPhone:{},
        userTimeLimit:{},
        },
        url: {
          add: "/tenantManagement/tenantManagement/add",
          edit: "/tenantManagement/tenantManagement/edit",
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
          this.form.setFieldsValue(pick(this.model,'tenantName','managementId','managementName','managementPhone','userTimeLimit'))
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
        this.form.setFieldsValue(pick(row,'tenantName','managementId','managementName','managementPhone','userTimeLimit'))
      },

      
    }
  }
</script>