<!--<!DOCTYPE html>-->
<!--<html>-->
<!--<head>-->
<!--  <meta charset="UTF-8">-->
<!--  &lt;!&ndash; import CSS &ndash;&gt;-->
<!--  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">-->
<!--</head>-->
<!--<body>-->
<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<!--</body>-->
<!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->

<script>

export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created(){
    this.$axios({
      method:'get',
      url:'/permission/getPermissionList?token=mc_boao_eb2510e83e2c2c9815aff3925d82fcdc',
      data:this.qs.stringify({    //这里是发送给后台的数据
        userId:this.userId,
        token:this.token,
      })
    }).then((response) =>{          //这里使用了ES6的语法
      console.log(response.data.data)       //请求成功返回的数据
    }).catch((error) =>{
      console.log(error)       //请求失败返回的数据
    })
  }
}
</script>
<!--</html>-->
