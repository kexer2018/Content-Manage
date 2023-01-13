import Mock from "mockjs"
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'


// 定义请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

//用户列表的数据
Mock.mock('/api/user/add','post', user.createUser)
Mock.mock('/api/user/edit','post', user.updateUser)
Mock.mock('/api/user/delete','post', user.deletUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)//正则表达路径
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)