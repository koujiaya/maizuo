<template>
  <div>
<el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']">
      <el-submenu v-for="data in sideList" :key='data.id' :index='data.index'>
        <template slot="title"><i :class="data.icon"></i>{{data.title}}</template>
         <el-menu-item v-for='item in data.children' :key='item.id' :index='item.index'>{{item.title}}</el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        < <el-menu-item-group> -->
          <!-- <template slot="title">分组一</template>
           <el-menu-item index="1-1">选项1</el-menu-item>
           <el-menu-item index="1-2">选项2</el-menu-item>
         </el-menu-item-group>
        < <el-menu-item-group title="分组2">
           <el-menu-item index="1-3">选项3</el-menu-item>
          <el-menu-item index="1-4" disabled>选项4</el-menu-item>
         </el-menu-item-group>
       <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
    </el-menu>
  </el-aside>

  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
      <span>{{username}}</span>
    </el-header>

    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>
<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
export default {
  methods: {
    handlePrimary () {
      console.log('primary')
    }
  },
  data () {
    const item = {
      date: '2020-4-13',
      name: 'kou',
      address: 'china '
    }
    return {
      tableData: Array(20).fill(item),
      username: 'kou',
      sideList: [
        {
          id: 1,
          title: '用户管理',
          index: '1',
          icon: 'el-icon-message',
          children: [
            {
              id: 2,
              title: '用户列表',
              index: '1-1'
            },
            {
              id: 3,
              title: '用户权限',
              index: '1-2'
            }
          ]
        },
        {
          id: 4,
          title: '权限管理',
          index: '2',
          icon: 'el-icon-menu',
          children: [
            {
              id: 5,
              title: '权限列表',
              index: '2-1'
            },
            {
              id: 6,
              title: '角色列表',
              index: '2-2'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" >
* {
  margin: 0px;
  padding: 0px;
}
html,
body {
  width: 100%;
  height: 100%;
}
body {
  font-size: 16px;
}
ul,
li {
  list-style: none;
}
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
