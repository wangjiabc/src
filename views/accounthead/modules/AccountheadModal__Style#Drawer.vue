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

        <a-form-item label="类型(支出/收入/收款/付款/转账)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'type', validatorRules.type]" placeholder="请输入类型(支出/收入/收款/付款/转账)"></a-input>
        </a-form-item>
        <a-form-item label="单位Id(收款/付款单位)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'organid', validatorRules.organid]" placeholder="请输入单位Id(收款/付款单位)" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="经手人Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'handspersonid', validatorRules.handspersonid]" placeholder="请输入经手人Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="变动金额(优惠/收款/付款/实付)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'changeamount', validatorRules.changeamount]" placeholder="请输入变动金额(优惠/收款/付款/实付)" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="合计金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'totalprice', validatorRules.totalprice]" placeholder="请输入合计金额" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="账户(收款/付款)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'accountid', validatorRules.accountid]" placeholder="请输入账户(收款/付款)" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="单据编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'billno', validatorRules.billno]" placeholder="请输入单据编号"></a-input>
        </a-form-item>
        <a-form-item label="单据日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择单据日期" v-decorator="[ 'billtime', validatorRules.billtime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'remark', validatorRules.remark]" placeholder="请输入备注"></a-input>
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
        </a-form-item>
        
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
    name: "AccountheadModal",
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
          type: {rules: [
          ]},
          organid: {rules: [
          ]},
          handspersonid: {rules: [
          ]},
          changeamount: {rules: [
          ]},
          totalprice: {rules: [
          ]},
          accountid: {rules: [
          ]},
          billno: {rules: [
          ]},
          billtime: {rules: [
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
        },
        url: {
          add: "/accounthead/accounthead/add",
          edit: "/accounthead/accounthead/edit",
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
          this.form.setFieldsValue(pick(this.model,'type','organid','handspersonid','changeamount','totalprice','accountid','billno','billtime','remark','deleteFlag','createTime','createBy','updateBy','updateTime','sysOrgCode'))
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
        this.form.setFieldsValue(pick(row,'type','organid','handspersonid','changeamount','totalprice','accountid','billno','billtime','remark','deleteFlag','createTime','createBy','updateBy','updateTime','sysOrgCode'))
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