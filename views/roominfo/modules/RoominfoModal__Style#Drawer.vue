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

        <a-form-item label="guid" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'guid', validatorRules.guid]" placeholder="请输入guid"></a-input>
        </a-form-item>
        <a-form-item label="编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'num', validatorRules.num]" placeholder="请输入编号"></a-input>
        </a-form-item>
        <a-form-item label="原编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'originalnum', validatorRules.originalnum]" placeholder="请输入原编号"></a-input>
        </a-form-item>
        <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'address', validatorRules.address]" placeholder="请输入地址"></a-input>
        </a-form-item>
        <a-form-item label="原地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'originaladdress', validatorRules.originaladdress]" placeholder="请输入原地址"></a-input>
        </a-form-item>
        <a-form-item label="所在乡镇" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'region', validatorRules.region]" placeholder="请输入所在乡镇"></a-input>
        </a-form-item>
        <a-form-item label="所在街道" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'segment', validatorRules.segment]" placeholder="请输入所在街道"></a-input>
        </a-form-item>
        <a-form-item label="所在社区" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'manageregion', validatorRules.manageregion]" placeholder="请输入所在社区"></a-input>
        </a-form-item>
        <a-form-item label="房屋性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'roomproperty', validatorRules.roomproperty]" placeholder="请输入房屋性质"></a-input>
        </a-form-item>
        <a-form-item label="用途" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'useful', validatorRules.useful]" placeholder="请输入用途"></a-input>
        </a-form-item>
        <a-form-item label="楼层" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'floor', validatorRules.floor]" placeholder="请输入楼层"></a-input>
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'state', validatorRules.state]" placeholder="请输入状态"></a-input>
        </a-form-item>
        <a-form-item label="房屋结构" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'structure', validatorRules.structure]" placeholder="请输入房屋结构"></a-input>
        </a-form-item>
        <a-form-item label="建筑面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'buildarea', validatorRules.buildarea]" placeholder="请输入建筑面积" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="户型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'roomtype', validatorRules.roomtype]" placeholder="请输入户型"></a-input>
        </a-form-item>
        <a-form-item label="是否纠纷" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'iscity', validatorRules.iscity]" placeholder="请输入是否纠纷"></a-input>
        </a-form-item>
        <a-form-item label="房管员" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'manager', validatorRules.manager]" placeholder="请输入房管员"></a-input>
        </a-form-item>
        <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'managerphone', validatorRules.managerphone]" placeholder="请输入联系电话"></a-input>
        </a-form-item>
        <a-form-item label="临街" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'isstreet', validatorRules.isstreet]" placeholder="请输入临街"></a-input>
        </a-form-item>
        <a-form-item label="装修情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'fitment', validatorRules.fitment]" placeholder="请输入装修情况"></a-input>
        </a-form-item>
        <a-form-item label="房屋来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'befrom', validatorRules.befrom]" placeholder="请输入房屋来源"></a-input>
        </a-form-item>
        <a-form-item label="签订日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择签订日期" v-decorator="[ 'indate', validatorRules.indate]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="房产证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'propertyrightno', validatorRules.propertyrightno]" placeholder="请输入房产证号"></a-input>
        </a-form-item>
        <a-form-item label="产权面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'propertyrightarea', validatorRules.propertyrightarea]" placeholder="请输入产权面积" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="设计用途" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'designuseful', validatorRules.designuseful]" placeholder="请输入设计用途"></a-input>
        </a-form-item>
        <a-form-item label="建筑年份" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'buildyear', validatorRules.buildyear]" placeholder="请输入建筑年份" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="产权单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'propertyrightunit', validatorRules.propertyrightunit]" placeholder="请输入产权单位"></a-input>
        </a-form-item>
        <a-form-item label="实际产权单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'realpropertyrightunit', validatorRules.realpropertyrightunit]" placeholder="请输入实际产权单位"></a-input>
        </a-form-item>
        <a-form-item label="房产证证载权属单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'propertycardunit', validatorRules.propertycardunit]" placeholder="请输入房产证证载权属单位"></a-input>
        </a-form-item>
        <a-form-item label="土地证证载权属单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'glebecardunit', validatorRules.glebecardunit]" placeholder="请输入土地证证载权属单位"></a-input>
        </a-form-item>
        <a-form-item label="移交单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'transferunit', validatorRules.transferunit]" placeholder="请输入移交单位"></a-input>
        </a-form-item>
        <a-form-item label="土地证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'glebecardno', validatorRules.glebecardno]" placeholder="请输入土地证号"></a-input>
        </a-form-item>
        <a-form-item label="使用权类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'glebeusetype', validatorRules.glebeusetype]" placeholder="请输入使用权类型"></a-input>
        </a-form-item>
        <a-form-item label="土地到期年限" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'glebeenddate', validatorRules.glebeenddate]" placeholder="请输入土地到期年限"></a-input>
        </a-form-item>
        <a-form-item label="地类用途" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'glebetypeuseful', validatorRules.glebetypeuseful]" placeholder="请输入地类用途"></a-input>
        </a-form-item>
        <a-form-item label="规划用途" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'planuseful', validatorRules.planuseful]" placeholder="请输入规划用途"></a-input>
        </a-form-item>
        <a-form-item label="产权来源文件" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'befromfile', validatorRules.befromfile]" placeholder="请输入产权来源文件"></a-input>
        </a-form-item>
        <a-form-item label="noprnresion" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'noprnresion', validatorRules.noprnresion]" placeholder="请输入noprnresion"></a-input>
        </a-form-item>
        <a-form-item label="nogcresion" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'nogcresion', validatorRules.nogcresion]" placeholder="请输入nogcresion"></a-input>
        </a-form-item>
        <a-form-item label="不动产证" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'realestateno', validatorRules.realestateno]" placeholder="请输入不动产证"></a-input>
        </a-form-item>
        <a-form-item label="propertymemo" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'propertymemo', validatorRules.propertymemo]" placeholder="请输入propertymemo"></a-input>
        </a-form-item>
        <a-form-item label="originalamount" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'originalamount', validatorRules.originalamount]" placeholder="请输入originalamount" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="累计折旧" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'alldepreciation', validatorRules.alldepreciation]" placeholder="请输入累计折旧" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="已提年限" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'depreciationyear', validatorRules.depreciationyear]" placeholder="请输入已提年限" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="资产净值" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'networth', validatorRules.networth]" placeholder="请输入资产净值" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="公允价值" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'evaluationprice', validatorRules.evaluationprice]" placeholder="请输入公允价值" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="资产单价" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'evaluationsingleprice', validatorRules.evaluationsingleprice]" placeholder="请输入资产单价" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="评估时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择评估时间" v-decorator="[ 'evaluationplace', validatorRules.evaluationplace]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="历史来源价值" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'befromamount', validatorRules.befromamount]" placeholder="请输入历史来源价值" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="市场租金" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'markethire', validatorRules.markethire]" placeholder="请输入市场租金" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="评估机构" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'evaluationunit', validatorRules.evaluationunit]" placeholder="请输入评估机构"></a-input>
        </a-form-item>
        <a-form-item label="评估号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'evaluationno', validatorRules.evaluationno]" placeholder="请输入评估号"></a-input>
        </a-form-item>
        <a-form-item label="是否抵押" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ispawn', validatorRules.ispawn]" placeholder="请输入是否抵押"></a-input>
        </a-form-item>
        <a-form-item label="抵押单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'pawnunit', validatorRules.pawnunit]" placeholder="请输入抵押单位"></a-input>
        </a-form-item>
        <a-form-item label="代管资产原所属单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'originalunit', validatorRules.originalunit]" placeholder="请输入代管资产原所属单位"></a-input>
        </a-form-item>
        <a-form-item label="财务备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'financememo', validatorRules.financememo]" placeholder="请输入财务备注"></a-input>
        </a-form-item>
        <a-form-item label="纠纷原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'utility', validatorRules.utility]" placeholder="请输入纠纷原因"></a-input>
        </a-form-item>
        <a-form-item label="合同ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'chartguid', validatorRules.chartguid]" placeholder="请输入合同ID"></a-input>
        </a-form-item>
        <a-form-item label="地址简码(拼音简写)" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'addresscode', validatorRules.addresscode]" placeholder="请输入地址简码(拼音简写)"></a-input>
        </a-form-item>
        <a-form-item label="原地址简码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'originaladdresscode', validatorRules.originaladdresscode]" placeholder="请输入原地址简码"></a-input>
        </a-form-item>
        <a-form-item label="完好等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'securityclassification', validatorRules.securityclassification]" placeholder="请输入完好等级"></a-input>
        </a-form-item>
        <a-form-item label="危房等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'dangerclassification', validatorRules.dangerclassification]" placeholder="请输入危房等级"></a-input>
        </a-form-item>
        <a-form-item label="安全隐患等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'hiddendanger', validatorRules.hiddendanger]" placeholder="请输入安全隐患等级"></a-input>
        </a-form-item>
        <a-form-item label="安全负责人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'responsibleperson', validatorRules.responsibleperson]" placeholder="请输入安全负责人"></a-input>
        </a-form-item>
        <a-form-item label="备注信息" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'smemo', validatorRules.smemo]" placeholder="请输入备注信息"></a-input>
        </a-form-item>
        <a-form-item label="belongunit" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'belongunit', validatorRules.belongunit]" placeholder="请输入belongunit"></a-input>
        </a-form-item>
        <a-form-item label="fileindex" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'fileindex', validatorRules.fileindex]" placeholder="请输入fileindex"></a-input>
        </a-form-item>
        <a-form-item label="资产分类" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'securityregion', validatorRules.securityregion]" placeholder="请输入资产分类"></a-input>
        </a-form-item>
        <a-form-item label="roomcount" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'roomcount', validatorRules.roomcount]" placeholder="请输入roomcount" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="土地证面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'landarea', validatorRules.landarea]" placeholder="请输入土地证面积" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="useyears" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'useyears', validatorRules.useyears]" placeholder="请输入useyears" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="资产巡查日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择资产巡查日期" v-decorator="[ 'hiddenCheckDate', validatorRules.hiddenCheckDate]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="资产检查日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择资产检查日期" v-decorator="[ 'assetCheckDate', validatorRules.assetCheckDate]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="ishidden" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ishidden', validatorRules.ishidden]" placeholder="请输入ishidden" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="neatenFlow" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'neatenFlow', validatorRules.neatenFlow]" placeholder="请输入neatenFlow" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="validstate" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'validstate', validatorRules.validstate]" placeholder="请输入validstate" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="auditingstate" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'auditingstate', validatorRules.auditingstate]" placeholder="请输入auditingstate"></a-input>
        </a-form-item>
        <a-form-item label="物业信息板块" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'tenementinfo', validatorRules.tenementinfo]" placeholder="请输入物业信息板块"></a-input>
        </a-form-item>
        <a-form-item label="水表编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'watermeternum', validatorRules.watermeternum]" placeholder="请输入水表编号"></a-input>
        </a-form-item>
        <a-form-item label="电表编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'electricmeternum', validatorRules.electricmeternum]" placeholder="请输入电表编号"></a-input>
        </a-form-item>
        <a-form-item label="天然气表编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'gasmeternum', validatorRules.gasmeternum]" placeholder="请输入天然气表编号"></a-input>
        </a-form-item>
        <a-form-item label="创建人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'createBy', validatorRules.createBy]" placeholder="请输入创建人"></a-input>
        </a-form-item>
        <a-form-item label="创建日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建日期" v-decorator="[ 'createTime', validatorRules.createTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="更新人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'updateBy', validatorRules.updateBy]" placeholder="请输入更新人"></a-input>
        </a-form-item>
        <a-form-item label="更新日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择更新日期" v-decorator="[ 'updateTime', validatorRules.updateTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="所属部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'sysOrgCode', validatorRules.sysOrgCode]" placeholder="请输入所属部门"></a-input>
        </a-form-item>
        <a-form-item label="主键" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'id', validatorRules.id]" placeholder="请输入主键"></a-input>
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
  import JDate from '@/components/jeecg/JDate'  
  
  export default {
    name: "RoominfoModal",
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
        guid:{rules: [{ required: true, message: '请输入guid!' }]},
        num:{},
        originalnum:{},
        address:{},
        originaladdress:{},
        region:{},
        segment:{},
        manageregion:{},
        roomproperty:{},
        useful:{},
        floor:{},
        state:{},
        structure:{},
        buildarea:{},
        roomtype:{},
        iscity:{},
        manager:{},
        managerphone:{},
        isstreet:{},
        fitment:{},
        befrom:{},
        indate:{},
        propertyrightno:{},
        propertyrightarea:{},
        designuseful:{},
        buildyear:{},
        propertyrightunit:{},
        realpropertyrightunit:{},
        propertycardunit:{},
        glebecardunit:{},
        transferunit:{},
        glebecardno:{},
        glebeusetype:{},
        glebeenddate:{},
        glebetypeuseful:{},
        planuseful:{},
        befromfile:{},
        noprnresion:{},
        nogcresion:{},
        realestateno:{},
        propertymemo:{},
        originalamount:{},
        alldepreciation:{},
        depreciationyear:{},
        networth:{},
        evaluationprice:{},
        evaluationsingleprice:{},
        evaluationplace:{},
        befromamount:{},
        markethire:{},
        evaluationunit:{},
        evaluationno:{},
        ispawn:{},
        pawnunit:{},
        originalunit:{},
        financememo:{},
        utility:{},
        chartguid:{},
        addresscode:{},
        originaladdresscode:{},
        securityclassification:{},
        dangerclassification:{},
        hiddendanger:{},
        responsibleperson:{},
        smemo:{},
        belongunit:{},
        fileindex:{},
        securityregion:{},
        roomcount:{},
        landarea:{},
        useyears:{},
        hiddenCheckDate:{},
        assetCheckDate:{},
        ishidden:{},
        neatenFlow:{},
        validstate:{},
        auditingstate:{},
        tenementinfo:{},
        watermeternum:{},
        electricmeternum:{},
        gasmeternum:{},
        createBy:{},
        createTime:{},
        updateBy:{},
        updateTime:{},
        sysOrgCode:{},
        },
        url: {
          add: "/roominfo/roominfo/add",
          edit: "/roominfo/roominfo/edit",
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
          this.form.setFieldsValue(pick(this.model,'guid','num','originalnum','address','originaladdress','region','segment','manageregion','roomproperty','useful','floor','state','structure','buildarea','roomtype','iscity','manager','managerphone','isstreet','fitment','befrom','indate','propertyrightno','propertyrightarea','designuseful','buildyear','propertyrightunit','realpropertyrightunit','propertycardunit','glebecardunit','transferunit','glebecardno','glebeusetype','glebeenddate','glebetypeuseful','planuseful','befromfile','noprnresion','nogcresion','realestateno','propertymemo','originalamount','alldepreciation','depreciationyear','networth','evaluationprice','evaluationsingleprice','evaluationplace','befromamount','markethire','evaluationunit','evaluationno','ispawn','pawnunit','originalunit','financememo','utility','chartguid','addresscode','originaladdresscode','securityclassification','dangerclassification','hiddendanger','responsibleperson','smemo','belongunit','fileindex','securityregion','roomcount','landarea','useyears','hiddenCheckDate','assetCheckDate','ishidden','neatenFlow','validstate','auditingstate','tenementinfo','watermeternum','electricmeternum','gasmeternum','createBy','createTime','updateBy','updateTime','sysOrgCode'))
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
        this.form.setFieldsValue(pick(row,'guid','num','originalnum','address','originaladdress','region','segment','manageregion','roomproperty','useful','floor','state','structure','buildarea','roomtype','iscity','manager','managerphone','isstreet','fitment','befrom','indate','propertyrightno','propertyrightarea','designuseful','buildyear','propertyrightunit','realpropertyrightunit','propertycardunit','glebecardunit','transferunit','glebecardno','glebeusetype','glebeenddate','glebetypeuseful','planuseful','befromfile','noprnresion','nogcresion','realestateno','propertymemo','originalamount','alldepreciation','depreciationyear','networth','evaluationprice','evaluationsingleprice','evaluationplace','befromamount','markethire','evaluationunit','evaluationno','ispawn','pawnunit','originalunit','financememo','utility','chartguid','addresscode','originaladdresscode','securityclassification','dangerclassification','hiddendanger','responsibleperson','smemo','belongunit','fileindex','securityregion','roomcount','landarea','useyears','hiddenCheckDate','assetCheckDate','ishidden','neatenFlow','validstate','auditingstate','tenementinfo','watermeternum','electricmeternum','gasmeternum','createBy','createTime','updateBy','updateTime','sysOrgCode'))
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