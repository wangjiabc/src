import { getAction,deleteAction,putAction,postAction} from '@/api/manage'

////根路径
// const doMian = "/jeecg-boot/";
////图片预览请求地址
// const imgView = "http://localhost:8080/jeecg-boot/sys/common/view/";

//合同的经营项目
const queryFareitem = (params) => postAction('/chartinfo/chartinfo/fareItem', params)


export {
  queryFareitem
}



