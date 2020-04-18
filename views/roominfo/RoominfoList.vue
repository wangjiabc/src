<template>
  <div>
    <a-card :bordered="true" style="margin-bottom:20px;">
      <div class="description">
        <div class="desc_item">
          <span>有有:</span>123
        </div>
        <div class="desc_item">
          <span>有有:</span>123
        </div>
        <div class="desc_item">
          <span>有有:</span>123
        </div>
        <div class="desc_item">
          <span>有有:</span>123
        </div>
        <div class="desc_item">
          <span>有有:</span>123
        </div>
        <div class="desc_item">
          <span>有有:</span>123
        </div>
      </div>
    </a-card>
    <a-card :bordered="true">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24"></a-row>
        </a-form>
      </div>
      <!-- 查询区域-END -->

      <!-- 操作按钮区域 -->
      <div class="table-operator">
        <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
        <a-button @click="handleRent" type="primary" icon="plus">出租</a-button>
        <a-button type="primary" icon="download" @click="handleExportXls('RoomInfo')">导出</a-button>
        <a-upload
          name="file"
          :showUploadList="false"
          :multiple="false"
          :headers="tokenHeader"
          :action="importExcelUrl"
          @change="handleImportExcel"
        >
          <a-button type="primary" icon="import">导入</a-button>
        </a-upload>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchDel">
              <a-icon type="delete" />删除
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <a-button v-else type="primary" @click="handleQueryDialog" icon="filter">筛选</a-button>
      </div>

      <!-- table区域-begin -->
      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
          <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>

        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          :customRow="click"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{fixed:true,selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :scroll="tableScroll"
          @change="handleTableChange"
        >
          <template slot="htmlSlot" slot-scope="text">
            <div v-html="text"></div>
          </template>
          <template slot="imgSlot" slot-scope="text">
            <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
            <img
              v-else
              :src="getImgView(text)"
              height="25px"
              alt="图片不存在"
              style="max-width:80px;font-size: 12px;font-style: italic;"
            />
          </template>
          <template slot="fileSlot" slot-scope="text">
            <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
            <a-button
              v-else
              :ghost="true"
              type="primary"
              icon="download"
              size="small"
              @click="uploadFile(text)"
            >下载</a-button>
          </template>

          <span slot="action" slot-scope="text, record">
            <a @click="handleEdit(record)">编辑</a>

            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link">
                更多
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </a-table>
      </div>
      <a-drawer
        title="详情"
        :maskClosable="true"
        width="650"
        placement="bottom"
        :closable="true"
        @close="close"
        :visible="visible"
        style="height: calc(100% - 55px);overflow: auto;padding-bottom: 153px;"
      ></a-drawer>
      <a-drawer
        title="查询"
        :maskClosable="true"
        width="650"
        placement="right"
        :closable="true"
        @close="close2"
        :visible="visible2"
        style="height: calc(100% - 55px);overflow: auto;"
      ></a-drawer>
      <roominfo-modal ref="modalForm" @ok="modalFormOk"></roominfo-modal>
      <rentinfo-modal ref="rentForm" @ok="modalFormOk"></rentinfo-modal>
    </a-card>
  </div>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import RoominfoModal from './modules/RoominfoModal'
import RentinfoModal from './modules/RentinfoModal'

export default {
  name: 'RoominfoList',
  mixins: [JeecgListMixin],
  components: {
    RoominfoModal,
    RentinfoModal
  },
  data() {
    return {
      selectionRows:[],
      selectedRowKeys:[],
      description: 'RoomInfo管理页面',
      visible: false,
      visible2: false,
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '编号',
          align: 'center',
          dataIndex: 'num'
        },
        {
          title: '原编号',
          align: 'center',
          dataIndex: 'originalnum'
        },
        {
          title: '地址',
          align: 'center',
          dataIndex: 'address'
        },
        {
          title: '原地址',
          align: 'center',
          dataIndex: 'originaladdress'
        },
        {
          title: '所在乡镇',
          align: 'center',
          dataIndex: 'region'
        },
        {
          title: '所在街道',
          align: 'center',
          dataIndex: 'segment'
        },
        {
          title: '所在社区',
          align: 'center',
          dataIndex: 'manageregion'
        },
        {
          title: '房屋性质',
          align: 'center',
          dataIndex: 'roomproperty'
        },
        {
          title: '用途',
          align: 'center',
          dataIndex: 'useful'
        },
        {
          title: '楼层',
          align: 'center',
          dataIndex: 'floor'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'state'
        },
        {
          title: '房屋结构',
          align: 'center',
          dataIndex: 'structure'
        },
        {
          title: '建筑面积',
          align: 'center',
          dataIndex: 'buildarea'
        },
        {
          title: '户型',
          align: 'center',
          dataIndex: 'roomtype'
        },
        {
          title: '是否纠纷',
          align: 'center',
          dataIndex: 'iscity'
        },
        {
          title: '房管员',
          align: 'center',
          dataIndex: 'manager'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'managerphone'
        },
        {
          title: '临街',
          align: 'center',
          dataIndex: 'isstreet'
        },
        {
          title: '装修情况',
          align: 'center',
          dataIndex: 'fitment'
        },
        {
          title: '房屋来源',
          align: 'center',
          dataIndex: 'befrom'
        },
        {
          title: '签订日期',
          align: 'center',
          dataIndex: 'indate',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
        {
          title: '房产证号',
          align: 'center',
          dataIndex: 'propertyrightno'
        },
        {
          title: '产权面积',
          align: 'center',
          dataIndex: 'propertyrightarea'
        },
        {
          title: '设计用途',
          align: 'center',
          dataIndex: 'designuseful'
        },
        {
          title: '建筑年份',
          align: 'center',
          dataIndex: 'buildyear'
        },
        {
          title: '产权单位',
          align: 'center',
          dataIndex: 'propertyrightunit'
        },
        {
          title: '实际产权单位',
          align: 'center',
          dataIndex: 'realpropertyrightunit'
        },
        {
          title: '房产证证载权属单位',
          align: 'center',
          dataIndex: 'propertycardunit'
        },
        {
          title: '土地证证载权属单位',
          align: 'center',
          dataIndex: 'glebecardunit'
        },
        {
          title: '移交单位',
          align: 'center',
          dataIndex: 'transferunit'
        },
        {
          title: '土地证号',
          align: 'center',
          dataIndex: 'glebecardno'
        },
        {
          title: '使用权类型',
          align: 'center',
          dataIndex: 'glebeusetype'
        },
        {
          title: '土地到期年限',
          align: 'center',
          dataIndex: 'glebeenddate'
        },
        {
          title: '地类用途',
          align: 'center',
          dataIndex: 'glebetypeuseful'
        },
        {
          title: '规划用途',
          align: 'center',
          dataIndex: 'planuseful'
        },
        {
          title: '产权来源文件',
          align: 'center',
          dataIndex: 'befromfile'
        },
        {
          title: 'noprnresion',
          align: 'center',
          dataIndex: 'noprnresion'
        },
        {
          title: 'nogcresion',
          align: 'center',
          dataIndex: 'nogcresion'
        },
        {
          title: '不动产证',
          align: 'center',
          dataIndex: 'realestateno'
        },
        {
          title: 'propertymemo',
          align: 'center',
          dataIndex: 'propertymemo'
        },
        {
          title: 'originalamount',
          align: 'center',
          dataIndex: 'originalamount'
        },
        {
          title: '累计折旧',
          align: 'center',
          dataIndex: 'alldepreciation'
        },
        {
          title: '已提年限',
          align: 'center',
          dataIndex: 'depreciationyear'
        },
        {
          title: '资产净值',
          align: 'center',
          dataIndex: 'networth'
        },
        {
          title: '公允价值',
          align: 'center',
          dataIndex: 'evaluationprice'
        },
        {
          title: '资产单价',
          align: 'center',
          dataIndex: 'evaluationsingleprice'
        },
        {
          title: '评估时间',
          align: 'center',
          dataIndex: 'evaluationplace',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
        {
          title: '历史来源价值',
          align: 'center',
          dataIndex: 'befromamount'
        },
        {
          title: '市场租金',
          align: 'center',
          dataIndex: 'markethire'
        },
        {
          title: '评估机构',
          align: 'center',
          dataIndex: 'evaluationunit'
        },
        {
          title: '评估号',
          align: 'center',
          dataIndex: 'evaluationno'
        },
        {
          title: '是否抵押',
          align: 'center',
          dataIndex: 'ispawn'
        },
        {
          title: '抵押单位',
          align: 'center',
          dataIndex: 'pawnunit'
        },
        {
          title: '代管资产原所属单位',
          align: 'center',
          dataIndex: 'originalunit'
        },
        {
          title: '财务备注',
          align: 'center',
          dataIndex: 'financememo'
        },
        {
          title: '纠纷原因',
          align: 'center',
          dataIndex: 'utility'
        },
        {
          title: '合同ID',
          align: 'center',
          dataIndex: 'chartguid'
        },
        {
          title: '地址简码(拼音简写)',
          align: 'center',
          dataIndex: 'addresscode'
        },
        {
          title: '原地址简码',
          align: 'center',
          dataIndex: 'originaladdresscode'
        },
        {
          title: '完好等级',
          align: 'center',
          dataIndex: 'securityclassification'
        },
        {
          title: '危房等级',
          align: 'center',
          dataIndex: 'dangerclassification'
        },
        {
          title: '安全隐患等级',
          align: 'center',
          dataIndex: 'hiddendanger'
        },
        {
          title: '安全负责人',
          align: 'center',
          dataIndex: 'responsibleperson'
        },
        {
          title: '备注信息',
          align: 'center',
          dataIndex: 'smemo'
        },
        {
          title: 'belongunit',
          align: 'center',
          dataIndex: 'belongunit'
        },
        {
          title: 'fileindex',
          align: 'center',
          dataIndex: 'fileindex'
        },
        {
          title: '资产分类',
          align: 'center',
          dataIndex: 'securityregion'
        },
        {
          title: 'roomcount',
          align: 'center',
          dataIndex: 'roomcount'
        },
        {
          title: '土地证面积',
          align: 'center',
          dataIndex: 'landarea'
        },
        {
          title: 'useyears',
          align: 'center',
          dataIndex: 'useyears'
        },
        {
          title: '资产巡查日期',
          align: 'center',
          dataIndex: 'hiddenCheckDate',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
        {
          title: '资产检查日期',
          align: 'center',
          dataIndex: 'assetCheckDate',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
        {
          title: 'ishidden',
          align: 'center',
          dataIndex: 'ishidden'
        },
        {
          title: 'neatenFlow',
          align: 'center',
          dataIndex: 'neatenFlow'
        },
        {
          title: 'validstate',
          align: 'center',
          dataIndex: 'validstate'
        },
        {
          title: 'auditingstate',
          align: 'center',
          dataIndex: 'auditingstate'
        },
        {
          title: '物业信息板块',
          align: 'center',
          dataIndex: 'tenementinfo'
        },
        {
          title: '水表编号',
          align: 'center',
          dataIndex: 'watermeternum'
        },
        {
          title: '电表编号',
          align: 'center',
          dataIndex: 'electricmeternum'
        },
        {
          title: '天然气表编号',
          align: 'center',
          dataIndex: 'gasmeternum'
        },
        {
          title: '创建人',
          align: 'center',
          dataIndex: 'createBy'
        },
        {
          title: '创建日期',
          align: 'center',
          dataIndex: 'createTime',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
        {
          title: '更新人',
          align: 'center',
          dataIndex: 'updateBy'
        },
        {
          title: '更新日期',
          align: 'center',
          dataIndex: 'updateTime',
          customRender: function(text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          }
        },
        {
          title: '所属部门',
          align: 'center',
          dataIndex: 'sysOrgCode'
        },
        // {
        //   title:'主键',
        //   align:"center",
        //   dataIndex: 'id'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: 147,
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/roominfo/roominfo/list',
        delete: '/roominfo/roominfo/delete',
        deleteBatch: '/roominfo/roominfo/deleteBatch',
        exportXlsUrl: '/roominfo/roominfo/exportXls',
        importExcelUrl: 'roominfo/roominfo/importExcel'
      },
      dictOptions: {},
      tableScroll: { x: 86 * 147 + 50 }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    initDictConfig() {},
    click(record, index) {
      return {
        on: {
          click: () => {
            this.$message.error('点击了第' + index + '行')
            this.visible = true
            console.log(record, index)
          }
        }
      }
    },
    close() {
      this.visible = false
    },
    close2() {
      this.visible2 = false
    },
    handleQueryDialog() {
      this.visible2 = true
    },
     onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectionRows = selectionRows;
    },
    handleRent() {
      this.$refs.rentForm.edit(this.selectionRows[0])
      this.$refs.rentForm.title = '新增'
      this.$refs.rentForm.disableSubmit = false
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@assets/less/common.less';
.description {
  display: flex;
  flex-wrap: wrap;
}
.desc_item {
  width: 33.3%;
  span {
    color: red;
  }
}
</style>