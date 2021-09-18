<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
<template>
  <div>
    <div class="demo-input-size">
      <el-input v-model="input1" placeholder="请输user_key" ></el-input>
      <el-input v-model="input2" placeholder="请输r_key" ></el-input>
      <el-dropdown @command="selectRole">
        <span class="el-dropdown-link">
          选择角色<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(ce,index) in roleData" :key="index" :command="ce"> {{ce}} </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>




      <el-button type="success" @click="addUserRole" >确认添加</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="nickname"
        label="用户名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="user_key"
        label="用户key"
        width="180">
      </el-table-column>
      <el-table-column
        prop="r_name"
        label="用户角色"
        width="180">
      </el-table-column>
      <el-table-column
          prop="r_key"
          label="角色key"
          width="180">
        </el-table-column>
      <el-table-column
        prop="opt"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
          @click.native.prevent="editUserRole(scope.row)"
          type="text"
          size="small"
          >
          修改角色
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

var user = [];
var role = [];
var totalPage = 0;
export default {
  created(){
    this.getData(1);
    this.getRole();
  },
  data () {
    return {
      tableData: user,
      roleData: role,
      totalPage:totalPage,
      input1: '',
      input2: '',
    }
  },
  methods: {
    editUserRole(row){
      this.input1 = row.user_key;
      this.input2 = row.r_key;
    },
    addUserRole(e){
      this.$axios({
        method: 'post',
        url: '/user_role/addUserRoleOne',
        data: {
          token: 'mc_boao_a47b1c55f7f22d610e05f0907a809b73',
          get_user_key: this.input1,
          r_key: this.input2,
        },
        timeout: 10000,

      }).then((response) =>{
        Message.success(response.data.msg);

        if (response.data.code === 10000){
          this.input1 = '';
          this.input2 = '';
          user = [];
          this.getData(this.currentPage)
        }

      });
    },
    current_change:function(currentPage){ // 下一页
      user = [];

      this.getData(currentPage);
    },
    getData(page){
      this.currentPage = page;
      this.$axios({
        method:'get',
        url:'/user_role/getURList?page=' + page +'&count=10&token=mc_boao_a47b1c55f7f22d610e05f0907a809b73',
        data:this.qs.stringify({    //这里是发送给后台的数据
          userId:this.userId,
          token:this.token,
        })
      }).then((response) =>{          //这里使用了ES6的语法
        Message.info(response.data.msg);
        if (response.data.code === 10000){
          var data = response.data.data;
          var list = data.list
          this.totalPage = data.count;
          list.forEach(function(item) {
            user.push({
              user_key: item.user_key,
              nickname: item.nickname,
              r_name: item.r_name,
              r_key: item.r_key,
            })
          })
          this.tableData  = user
        }


      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
    },
    getRole(){
      this.$axios({
        method:'get',
        url:'/role/getRoleList?token=mc_boao_a47b1c55f7f22d610e05f0907a809b73',
        data:this.qs.stringify({    //这里是发送给后台的数据
          userId:this.userId,
          token:this.token,
        })
      }).then((response) =>{          //这里使用了ES6的语法
        Message.info(response.data.msg);
        if (response.data.code === 10000){
          var data = response.data.data;
          var list = data.list
          list.forEach(function(item) {
            role.push({
              name: item.name,
              r_key: item.r_key,
            })
          })
          this.roleData  = role
        }


      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
    },
    selectRole(command){
      this.input2 = command.r_key;

    }
  }

}
</script>
<!--</html>-->
