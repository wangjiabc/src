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

        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入名称"></a-input>
        </a-form-item>
         <a-form-item label="成本" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'cost', validatorRules.cost]" placeholder="请输入成本" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="零售价" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'retailprice', validatorRules.retailprice]" placeholder="请输入零售价" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'remark', validatorRules.remark]" placeholder="请输入备注"></a-input>
        </a-form-item>
       <!-- <a-form-item label="最低售价" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'lowprice', validatorRules.lowprice]" placeholder="请输入最低售价" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="预设售价一" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'presetpriceone', validatorRules.presetpriceone]" placeholder="请输入预设售价一" style="width: 100%"/>
        </a-form-item>
      <a-form-item label="库存" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'storage', validatorRules.storage]" placeholder="请输入库存" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="实库" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'realStorage', validatorRules.realStorage]" placeholder="请输入实库" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="差异" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'storageDiff', validatorRules.storageDiff]" placeholder="请输入差异" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="盘库时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择盘库时间" v-decorator="[ 'checkTime', validatorRules.checkTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>-->

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
    name: "MaterialModal",
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
          name: {rules: [
          ]},
          unit: {rules: [
          ]},
          remark: {rules: [
          ]},
          storage: {rules: [
          ]},
          cost: {rules: [
          ]},
          retailprice: {rules: [
          ]},
          lowprice: {rules: [
          ]},
          presetpriceone: {rules: [
          ]},
          combination: {rules: [
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
          realStorage: {rules: [
          ]},
          storageDiff: {rules: [
          ]},
          checkTime: {rules: [
          ]},
        },
        url: {
          add: "/food/material/add",
          edit: "/food/material/edit",
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
          this.form.setFieldsValue(pick(this.model,'name','unit','remark','storage','cost','retailprice','lowprice','presetpriceone','combination','deleteFlag','createTime','createBy','updateBy','updateTime','sysOrgCode','realStorage','storageDiff','checkTime'))
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
        this.form.setFieldsValue(pick(row,'name','unit','remark','storage','cost','retailprice','lowprice','presetpriceone','combination','deleteFlag','createTime','createBy','updateBy','updateTime','sysOrgCode','realStorage','storageDiff','checkTime'))
      },

      
    }
  }
</script>