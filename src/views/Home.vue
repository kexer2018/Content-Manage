<template>
  <el-row>
    <el-col :span="8" style="padding-right:10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/user-photo.png" alt="">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级权限管理员</p>
          </div>
        </div>
        <div class="login">
          <p>上次登录的时间:<span>2022-8-10</span></p>
          <p>上次登录的地点:<span>杭州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px;height:100%;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(val,key) in tablelabel" :key="key" :prop="key" :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left:10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="price">￥{{item.value}}</p>
            <p class="dec">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <div ref="echarts1" style="height:280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <div ref="echarts2" style="height:260px"></div>
        </el-card>
        <el-card style="height:260px">
          <div ref="echarts3" style="height:230px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from '../api'
import * as echatrs from 'echarts'
export default {
  name: 'home',
  data() {
    return {
      tableData: [],
      tablelabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        }
      ]
    }
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data
      console.log(tableData)
      this.tableData = tableData
      const echarts1 = echatrs.init(this.$refs.echarts1)
      var echarts1_option = {}
      //处理X轴的数据
      const { orderData, userData, videoData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      echarts1_option.xAxis = {
        data: xAxis
      }
      echarts1_option.yAxis = {}
      echarts1_option.legend = {
        data: xAxis
      }
      echarts1_option.series = []
      xAxis.forEach(key => {
        echarts1_option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      echarts1.setOption(echarts1_option)
      //柱状图
      const echarts2 = echatrs.init(this.$refs.echarts2)
      const echarts2_option = {
        legend: {
          textStyle: {
            color: '#333',
          }
        },
        grad: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3',
            }
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'
          }
        ],
      }
      echarts2.setOption(echarts2_option)
      //饼状图
      const echarts3 = echatrs.init(this.$refs.echarts3)
      const echarts3_option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf',
        ],
        series: [
          {
            data: videoData,
            type:'pie'
          }
        ],
      }
      echarts3.setOption(echarts3_option)
    })
  }
}
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
  }
  span {
    color: #666666;
    margin-left: 60px;
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    color: #fff;
    line-height: 80px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }

    .dec {
      font-size: 14px;
      text-align: center;
      color: #999999;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
    margin-top: 20px;
  }
}
</style>