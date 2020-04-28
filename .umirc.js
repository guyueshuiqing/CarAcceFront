
// ref: https://umijs.org/config/
import path from 'path'

export default {
  treeShaking: true,
    routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/purchase/shengou', component: '../pages/purchase/shengou' },
        { path: '/purchase/dingdan', component: '../pages/purchase/dingdan' },
        { path: '/purchase/shouhuo', component: '../pages/purchase/shouhuo' },
        { path: '/purchase/tuihuo', component: '../pages/purchase/tuihuo' },
        { path: '/operation/yinshou', component: '../pages/operation/yinshou' },
        { path: '/operation/jinchukut', component: '../pages/operation/jinchukut' },
        { path: '/sale/xiaoshoud', component: '../pages/sale/xiaoshoud' },
        { path: '/sale/xiaoshouk', component: '../pages/sale/xiaoshouk' },
        { path: '/sale/xiaoshout', component: '../pages/sale/xiaoshout' },
        { path: '/store/caigour', component: '../pages/store/caigour' },
        { path: '/store/caigoutc', component: '../pages/store/caigoutc' },
        { path: '/store/xiaoshouc', component: '../pages/store/xiaoshouc' },
        { path: '/store/xiaoshoutr', component: '../pages/store/xiaoshoutr' },
        { path: '/quanxian', component: '../pages/grant' },
        { path: '/login', component: '../pages/auth/login' },
        { path: '/register', component: '../pages/auth/register' },
      ]
    }
  ],
  alias: {
    'assets': path.resolve(__dirname, 'src/assets'),
    'pages': path.resolve(__dirname, 'src/pages'),
    'components': path.resolve(__dirname, 'src/components'),
    'models': path.resolve(__dirname, 'src/models'),
    'utils': path.resolve(__dirname, 'src/utils'),
    'services': path.resolve(__dirname, 'src/services'),

  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'CarAccessories',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  // proxy: {
  //   '/proxy': {
  //     target: 'https://localhost:8080/',
  //     changeOrigin: true,
  //     pathRewrite: { '/proxy': '' },
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       withCredentials: true,
  //       // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie'
  //       // cookie: 'code=531275; skey=IU_5tEOK62TbzpYijOAtFLO9lFVl-0-sIHwSVme4jC4=', // 韦磊
  //     }
  //   }
  // }

  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  }
}
