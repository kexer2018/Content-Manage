import Mock from "mockjs"
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        //判断账户是否存在
        //判断账号与密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            labal: '首页',
                            icon: 's-home',
                            url: 'Home.vue'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            labal: '商品管理',
                            icon: 'video-play',
                            url: 'Mall.vue'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            labal: '用户管理',
                            icon: 'user',
                            url: 'User.vue'
                        },
                        {
                            labal: '其他',
                            children: [
                                {
                                    path: "/page1",
                                    name: 'page1',
                                    labal: '页面1',
                                    icon: 'setting',
                                    url: 'PageOne.vue'
                                },
                                {
                                    path: "/page2",
                                    name: 'page2',
                                    labal: '页面2',
                                    icon: 'setting',
                                    url: 'PageTwo.vue'
                                },
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message:'获取成功'
                }
            }
        } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            labal: '首页',
                            icon: 's-home',
                            url: 'Home.vue'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            labal: '商品管理',
                            icon: 'video-play',
                            url: 'Mall.vue'
                        },
                    ]
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message:'密码错误'
                }
            }
        }
    }
}