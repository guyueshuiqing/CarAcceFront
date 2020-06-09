export const menu = [
  {
    key: '/',
    icon: '&#xe65b;',
    content:'主页 '
  },
  {
    key: '/purchase',
    icon: '&#xe62e;',
    content:'采购管理 ',
    children: [
      {key: '/shengou',icon: '&#xe62e;',content:'申购订单管理'},
      {key: '/dingdan',icon: '&#xe62e;',content:'采购订单管理'},
      {key: '/shouhuo',icon: '&#xe62e;',content:'采购收货管理'},
      {key: '/tuihuo',icon: '&#xe62e;',content:'采购退货管理'},
    ]
  },
  {
    key: '/store',
    icon: '&#xe6a7;',
    content:'库存管理 ',
    children: [
      {key: '/caigour',icon: '&#xe62e;',content:'入库'},
      {key: '/xiaoshouc',icon: '&#xe62e;',content:'出库'},
      {key: '/kucun',icon: '&#xe62e;',content:'库存'},
    ]
  },
  {
    key: '/sale',
    icon: '&#xe6b2;',
    content:'销售管理 ',
    children: [
      {key: '/xiaoshoud',icon: '&#xe62e;',content:'销售订单'},
      {key: '/xiaoshout',icon: '&#xe62e;',content:'销售退货'},
    ]
  },
  {
    key: '/operation',
    icon: '&#xe623;',
    content:'数据统计 ',
    children: [
      {key: '/yinshou',icon: '&#xe62e;',content:'营收统计'},
      {key: '/jinchukut',icon: '&#xe62e;',content:'仓库统计'},
    ]
  },
  {
    key: '/quanxian',
    icon: '&#xe623;',
    content:'权限管理 '
  }
]

export const roleIcon = {
  staff: '&#xe604;',
  admin: '&#xe601;',
  superadmin: '&#xe7b0;',
}
