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

        <a-form-item label="产品表id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'materialId', validatorRules.materialId]" placeholder="请输入产品表id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="序列号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'serialNumber', validatorRules.serialNumber]" placeholder="请输入序列号"></a-input>
        </a-form-item>
        <a-form-item label="是否卖出，0未卖出，1卖出" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'isSell', validatorRules.isSell]" placeholder="请输入是否卖出，0未卖出，1卖出"></a-input>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'remark', validatorRules.remark]" placeholder="请输入备注"></a-input>
        </a-form-item>
        <a-form-item label="删除标记，0未删除，1删除" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'deleteFlag', validatorRules.deleteFlag]" placeholder="请输入删除标记，0未删除，1删除"></a-input>
        </a-form-item>
        <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建时间" v-decorator="[ 'createTime', validatorRules.createTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="更新时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择更新时间" v-decorator="[ 'updateTime', validatorRules.updateTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="单据主表id，用于跟踪序列号流向" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'depotheadId', validatorRules.depotheadId]" placeholder="请输入单据主表id，用于跟踪序列号流向" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="创建人登录名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'createBy', validatorRules.createBy]" placeholder="请输入创建人登录名称"></a-input>
        </a-form-item>
        <a-form-item label="更新人登录名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'updateBy', validatorRules.updateBy]" placeholder="请输入更新人登录名称"></a-input>
        </a-form-item>
        <a-form-item label="所属部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'sysOrgCode', validatorRules.sysOrgCode]" placeholder="请输入所属部门"></a-input>
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
    name: "SerialNumberModal",
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
          materialId: {rules: [
          ]},
          serialNumber: {rules: [
          ]},
          isSell: {rules: [
          ]},
          remark: {rules: [
          ]},
          deleteFlag: {rules: [
          ]},
          createTime: {rules: [
          ]},
          updateTime: {rules: [
          ]},
          depotheadId: {rules: [
          ]},
          createBy: {rules: [
          ]},
          updateBy: {rules: [
          ]},
          sysOrgCode: {rules: [
          ]},
        },
        url: {
          add: "/serialNumber/serialNumber/add",
          edit: "/serialNumber/serialNumber/edit",
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
          this.form.setFieldsValue(pick(this.model,'materialId','serialNumber','isSell','remark','deleteFlag','createTime','updateTime','depotheadId','createBy','updateBy','sysOrgCode'))
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
        this.form.setFieldsValue(pick(row,'materialId','serialNumber','isSell','remark','deleteFlag','createTime','updateTime','depotheadId','createBy','updateBy','sysOrgCode'))
      },

      
    }
  }
</script>