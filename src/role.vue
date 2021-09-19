<template>
  <div>
    <div class="demo-input-size">
      <el-input v-model="input1" placeholder="请输角色名" ></el-input>
      <el-input v-model="input2" placeholder="角色key（新增不需要）"></el-input>
      <el-button type="success" @click="addRole" >确认添加</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="角色名称"
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
          @click.native.prevent="editRole(scope.row)"
          type="text"
          size="small"
          >
          修改角色
          </el-button>
          <el-button
            @click.native.prevent="editRole(scope.row)"
            type="text"
            size="small"
          >
            添加权限
          </el-button>
        </template>
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
    <el-tree
      :data="data"
      show-checkbox
      node-key="m_key"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
import {Message} from 'element-ui'

var role = []
var totalPage = 0
var menuTree = []
export default {
  created () {
    this.getData(1)
    this.getMenu()
  },
  data () {
    return {
      tableData: role,
      totalPage: totalPage,
      input1: '',
      input2: '',
      data: menuTree,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    editRole (row) {
      this.input1 = row.name
      this.input2 = row.r_key
    },
    addRole (e) {
      this.$axios({
        method: 'post',
        url: '/role/addRole',
        data: {
          token: this.GLOBAL.token,
          name: this.input1,
          r_key: this.input2
        },
        timeout: 10000

      }).then((response) => {
        Message.success(response.data.msg)

        if (response.data.code === 10000) {
          this.input1 = ''
          this.input2 = ''
          role = []
          this.getData(this.currentPage)
        }
      })
    },
    current_change: function (currentPage) { // 下一页
      role = []

      this.getData(currentPage)
    },
    getData (page) {
      this.currentPage = page
      this.$axios({
        method: 'get',
        url: '/role/getRoleList?page=' + page + '&count=10&token=' + this.GLOBAL.token
      }).then((response) => { // 这里使用了ES6的语法
        Message.info(response.data.msg)
        if (response.data.code === 10000) {
          var data = response.data.data
          var list = data.list
          this.totalPage = data.count
          list.forEach(function (item) {
            role.push({
              name: item.name,
              r_key: item.r_key
            })
          })
          this.tableData = role
        }
      }).catch((error) => {
        console.log(error) // 请求失败返回的数据
      })
    },
    getMenu () {
      this.$axios({
        method: 'get',
        url: '/menu/getMenuList?make_tree=true&token=' + this.GLOBAL.token
      }).then((response) => { // 这里使用了ES6的语法
        if (response.data.code === 10000) {
          var data = response.data.data
          var list = data.list
          list.forEach(function (item) {
            menuTree.push({
              label: item.label,
              m_key: item.m_key,
              children: item.children
            })
          })
          this.data = menuTree
        } else {
          this.$message(response.data.msg)
        }
      }).catch((error) => {
        console.log(error) // 请求失败返回的数据
      })
    }

  }

}
</script>
<!--</html>-->
