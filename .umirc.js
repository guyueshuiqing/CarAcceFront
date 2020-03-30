
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
        { path: '/purchase', component: '../pages/purchase' },
        { path: '/revenue', component: '../pages/revenue' },
        { path: '/sale', component: '../pages/sale' },
        { path: '/store', component: '../pages/store' },
        { path: '/login', component: '../pages/auth/login' },
        { path: '/register', component: '../pages/auth/register' },
        // { path: '/operation/task', component: '../pages/operation/task' },
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
}
