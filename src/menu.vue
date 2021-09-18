<template>
  <div>
    <div class="demo-input-size">
      <el-input v-model="input1" placeholder="请输菜单名" ></el-input>
      <el-input v-model="input2" placeholder="请输模块名"></el-input>
      <el-input v-model="input3" placeholder="请输方法名"></el-input>
      <el-input v-model="input4" placeholder="为空时是添加"></el-input>
      <el-button type="success" @click="addMenu" >确认添加</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="接口名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="module"
        label="模块名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="action"
        label="方法"
        width="180">
      </el-table-column>
      <el-table-column
        prop="m_key"
        label="接口key"
        width="180">
      </el-table-column>
      <el-table-column
        prop="opt"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
          @click.native.prevent="editMenu(scope.row)"
          type="text"
          size="small"
          >
          修改菜单
          </el-button>

        </template>
<!--        <el-button type="success" @click="customClick" >修改菜单</el-button>-->

<!--        <el-button type="success" v-on="edit_menu">修改菜单</el-button>-->
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        @current-change="current_change"
        layout="prev, pager, next"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'

var menu = [];
var totalPage = 0;
var currentPage = 0;
export default {
  created(){
    this.getData(1);
  },
  data () {
    return {
      tableData: menu,
      totalPage:totalPage,
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  },
  methods: {
    editMenu(row){
      this.input1 = row.name;
      this.input2 = row.action;
      this.input3 = row.module;
      this.input4 = row.m_key;
    },
    addMenu(e){
      // console.log(this.input1);
      this.$axios({
        method: 'post',
        url: '/menu/addMenu',
        data: {
          token: 'mc_boao_a47b1c55f7f22d610e05f0907a809b73',
          name: this.input1,
          module: this.input2,
          action: this.input3,
          m_key: this.input4,
        },
        timeout: 10000,

      }).then((response) =>{
        Message.success(response.data.msg);

        if (response.data.code === 10000){
          this.input1 = '';
          this.input2 = '';
          this.input3 = '';
          this.input4 = '';
          menu = [];
          this.getData(this.currentPage)
        }

      });
    },
    current_change:function(currentPage){ // 下一页
      menu = [];

      this.getData(currentPage);
    },
    getData(page){
      this.currentPage = page;
      this.$axios({
        method:'get',
        url:'/menu/getMenuList?page=' + page +'&count=10&token=mc_boao_a47b1c55f7f22d610e05f0907a809b73',
        data:this.qs.stringify({    //这里是发送给后台的数据
          userId:this.userId,
          token:this.token,
        })
      }).then((response) =>{          //这里使用了ES6的语法
        if (response.data.code === 10000){
          var data = response.data.data;
          var list = data.list
          this.totalPage = data.count;
          list.forEach(function(item) {
            menu.push({
              name: item.name,
              module: item.module,
              action: item.action,
              m_key: item.m_key,
            })
          })
          this.tableData  = menu
        }else{
          this.$message(response.data.msg);
        }


      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
    }
  }

}
</script>
<!--</html>-->
