<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{ isCollapse? '后台':'通用后台管理系统'}}  </h3>
        <el-menu-item @click="clickMune(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.labal}}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.labal" :index="item.labal">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.labal}}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item @click="clickMune(subItem)" :index="subItem.path">{{subItem.labal}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu {
    height: 100vh;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
}
</style>
<script>
import Cookie from 'js-cookie';
export default {
    data() {
        return {
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //点击路由跳转
        clickMune(item) {
             console.log(item)
            //当页面路由和需要跳转的路由不一致的时候才进行跳转
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
                this.$router.push(item.path)
            }
            this.$store.commit('selectMenu',item)
        }
    },
    computed: {
        //没有子菜单
        //有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        },
        menuData() {
            //判断当前的数据，如果缓存中没有就从当前store中获取
            return JSON.parse(Cookie.get('menu'))|| this.$store.state.tab.menu
        },
    }
}
</script>
<style lang="less" scoped>
.el-menu{
    border-right:none
}
</style>

<!-- 
menuData: [
    {
        path: '/',
        name: 'home',
        labal: '首页',
        icon: 's-home',
        url: 'Home/Home'
    },
    {
        path: '/mall',
        name: 'mall',
        labal: '商品管理',
        icon: 'video-play',
        url: 'MallManage/MallManage'
    },
    {
        path: '/user',
        name: 'user',
        labal: '用户管理',
        icon: 'user',
        url: 'UserManage/UserManage'
    },
    {
        labal: '其他',
        icon: 'location',
        children: [
            {
                path: "/page1",
                name: 'page1',
                labal: '页面1',
                icon: 'setting',
                url: 'Other/PageOne'
            },
            {
                path: "/page2",
                name: 'page2',
                labal: '页面2',
                icon: 'setting',
                url: 'Other/PageTwo'
            }
        ]
    },
] -->