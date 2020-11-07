<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row>
          <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'address', validatorRules.address]" placeholder="请输入地址"></a-input>
          </a-form-item>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="承租人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'charter', validatorRules.charter]" placeholder="请输入承租人"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="承租人性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select name="charterproperty" v-model="proSelected">
                <a-select-option :value="pro.id" v-for="pro in proList" :key="pro.name">{{pro.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- <a-col :span="12">
              <a-form-item label="性别">
                <j-dict-select-tag v-model="formData.sex" title="性别" dictCode="sex" />
              </a-form-item>
            </a-col>
            <a-col :span="12">选中值：{{ formData.sex}}</a-col>-->
            <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input v-decorator="[ 'sex', validatorRules.sex]" placeholder="请输入性别"></a-input> -->
              <a-select name="sex" v-model="sexSelected">
                <a-select-option :value="sex.id" v-for="sex in sexList" :key="sex.name">{{sex.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="信誉等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select name="creditRating" v-model="creditRatingSelected">
                <a-select-option
                  :value="creditRating.id"
                  v-for="creditRating in creditRatingList"
                  :key="creditRating.name"
                >{{creditRating.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'phone', validatorRules.phone]" placeholder="请输入联系电话"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="法人代表" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[ 'corporation', validatorRules.corporation]"
                placeholder="请输入法人代表"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="证件类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input v-decorator="[ 'cardtype', validatorRules.cardtype]" placeholder="请输入证件类型"></a-input> -->
              <a-select name="cardtype" v-model="cardtypeSelected">
                <a-select-option
                  :value="cardtype.id"
                  v-for="cardtype in cardtypeList"
                  :key="cardtype.name"
                >{{cardtype.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="证件号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'idno', validatorRules.idno]" placeholder="请输入证件号"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="联系地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[ 'homeaddress', validatorRules.homeaddress]"
                placeholder="请输入联系地址"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="是否低保" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input
                v-decorator="[ 'lowprotect', validatorRules.lowprotect]"
                placeholder="请输入是否低保"
              ></a-input>-->
              <a-select name="lowprotect" v-model="lowprotectSelected">
                <a-select-option
                  :value="lowprotect.id"
                  v-for="lowprotect in lowprotectList"
                  :key="lowprotect.name"
                >{{lowprotect.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="经营项目" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input v-decorator="[ 'fareitem', validatorRules.fareitem]" placeholder="请输入经营项目"></a-input> -->
              <a-select name="fareitem" v-model="fareitem">
                <a-select-option
                  :value="fareitem"
                  v-for="fareitem in fareitemList"
                  :key="fareitem"
                >{{fareitem}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="房屋安置费" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="[ 'placementfees', validatorRules.placementfees]"
                placeholder="请输入房屋安置费"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="天然气安置费" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="[ 'gasinstallationfees', validatorRules.gasinstallationfees]"
                placeholder="请输入天然气安置费"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="微信单次交租月数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="[ 'hirewxtype', validatorRules.hirewxtype]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="承租人性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[ 'charterproperty', validatorRules.charterproperty]"
                placeholder="请输入承租人性质"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="租赁性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[ 'chartproperty', validatorRules.chartproperty]"
                placeholder="请输入租赁性质"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="计租面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="[ 'area', validatorRules.area]"
                placeholder="请输入计租面积"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="使用年限" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="[ 'agelimite', validatorRules.agelimite]"
                placeholder="请输入使用年限"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[ 'contractno', validatorRules.contractno]"
                placeholder="请输入合同编号"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="签订日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择签订日期"
                v-decorator="[ 'concludedate', validatorRules.concludedate]"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="租金方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="[ 'agelimite', validatorRules.agelimite]"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同起始" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择合同起始"
                v-decorator="[ 'chartbegindate', validatorRules.chartbegindate]"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同终止" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择合同终止"
                v-decorator="[ 'chartenddate', validatorRules.chartenddate]"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="合同总额" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="[ 'totalhire', validatorRules.totalhire]"
                placeholder="请输入合同总额"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="保证金" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="[ 'assureamount', validatorRules.assureamount]"
                placeholder="请输入保证金"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="经办人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'operator', validatorRules.operator]" placeholder="请输入经办人"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'memo', validatorRules.memo]" placeholder="请输入备注"></a-input>
          </a-form-item>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import JDate from '@/components/jeecg/JDate'

export default {
  name: 'ChartinfoModal',
  components: {
    JDate
  },
  data() {
    return {
      fareitemList: [],
      fareitem: '',
      lowprotectList: [
        {
          id: '1',
          name: '是'
        },
        {
          id: '2',
          name: '否'
        }
      ],
      lowprotectSelected: '',
      cardtypeList: [
        {
          id: '1',
          name: '身份证'
        },
        {
          id: '2',
          name: '营业执照'
        },
        {
          id: '3',
          name: '护照'
        }
      ],
      cardtypeSelected: '',
      sexList: [
        {
          id: '1',
          name: '男'
        },
        {
          id: '2',
          name: '女'
        }
      ],
      sexSelected: '',
      proList: [
        {
          id: '1',
          name: '个人'
        },
        {
          id: '2',
          name: '单位'
        },
        {
          id: '3',
          name: '集团（社团）'
        },
        {
          id: '4',
          name: '代管'
        },
        {
          id: '5',
          name: '街道/社区'
        }
      ],
      proSelected: '',
      creditRatingList: [
        {
          id: '1',
          name: '一级'
        },
        {
          id: '2',
          name: '二级'
        },
        {
          id: '3',
          name: '三级'
        },
        {
          id: '4',
          name: '四级'
        },
        {
          id: '5',
          name: '五级'
        }
      ],
      creditRatingSelected: '',
      form: this.$form.createForm(this),
      title: '出租',
      width: 1600,
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      validatorRules: {
        guid: { rules: [{ required: true, message: '请输入guid!' }] },
        hireguid: {},
        address: {},
        charter: {},
        charttype: {},
        charterproperty: {},
        sex: {},
        cardtype: {},
        idno: {},
        corporation: {},
        phone: {},
        homeaddress: {},
        chartproperty: {},
        contractno: {},
        concludedate: {},
        chartbegindate: {},
        chartenddate: {},
        assureamount: {},
        hire: {},
        chartcriterion: {},
        area: {},
        totalhire: {},
        addrate: {},
        addtype: {},
        beginadddate: {},
        hireenddate: {},
        accountbalance: {},
        owehireresion: {},
        creditrating: {},
        fareitem: {},
        shopname: {},
        lowprotect: {},
        chartercode: {},
        calculatehireday: {},
        memo: {},
        ishistory: {},
        region: {},
        manageregion: {},
        roomproperty: {},
        useful: {},
        originalunit: {},
        segment: {},
        belongunit: {},
        operator: {},
        agelimite: {},
        isstophirein: {},
        stophireinresion: {},
        manager: {},
        dangerclassification: {},
        nsrsbh: {},
        khh: {},
        addfashion: {},
        placementfees: {},
        gasinstallationfees: {},
        optdate: {},
        optuser: {},
        ein: {},
        company: {},
        renttype: {},
        hirewxtype: {}
      },
      url: {
        add: '/chartinfo/chartinfo/add',
        edit: '/chartinfo/chartinfo/edit'
      }
    }
  },
  created() {
    console.log('1111');
  },
  mounted(){
    console.log('2222');

  },
  methods: {
    // getCouponSelected() {
    //   //获取选中的优惠券
    //   console.log(this.couponSelected)
    // },

    add() {
      this.edit({})
    },
    edit(record) {
      // console.log(record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'address', 'area'))
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          // console.log('表单提交数据', formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'guid',
          'hireguid',
          'roomaddress',
          'charter',
          'charttype',
          'charterproperty',
          'sex',
          'cardtype',
          'idno',
          'corporation',
          'phone',
          'homeaddress',
          'chartproperty',
          'contractno',
          'concludedate',
          'chartbegindate',
          'chartenddate',
          'assureamount',
          'hire',
          'chartcriterion',
          'area',
          'totalhire',
          'addrate',
          'addtype',
          'beginadddate',
          'hireenddate',
          'accountbalance',
          'owehireresion',
          'creditrating',
          'fareitem',
          'shopname',
          'lowprotect',
          'chartercode',
          'calculatehireday',
          'memo',
          'ishistory',
          'region',
          'manageregion',
          'roomproperty',
          'useful',
          'originalunit',
          'segment',
          'belongunit',
          'operator',
          'agelimite',
          'isstophirein',
          'stophireinresion',
          'manager',
          'dangerclassification',
          'nsrsbh',
          'khh',
          'addfashion',
          'placementfees',
          'gasinstallationfees',
          'optdate',
          'optuser',
          'ein',
          'company',
          'renttype',
          'hirewxtype'
        )
      )
    }
  }
}
</script>