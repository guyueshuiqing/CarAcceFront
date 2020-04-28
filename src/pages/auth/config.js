export const LoginFromData = [
  {
    key:'username', 
    label:"用户名" , 
    rules: [
      { required: true, message: '请输入用户名' },
      { pattern: /^[a-zA-Z0-9_]{4,16}$/, message: '用户名只能是4-16位字母数字下划线' }
    ]
  },
  {
    key:'password', 
    label:"密码" , 
    rules: [
      { required: true, message: '请输入密码' },
      {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: '输入的密码不符合规范(必须有数字和大小写字母)'}
    ]
  },
]


export const RegisterFromData = [
  {
    key:'username', 
    label:"用户名" , 
    rules: [
      { required: true, message: '请输入用户名' },
      { pattern: /^[a-zA-Z0-9_]{4,16}$/, message: '用户名只能是4-16位字母数字下划线' }
    ]
  },
  {
    key:'password', 
    label:"密码" , 
    rules: [
      { required: true, message: '请输入密码' },
      {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: '输入的密码不符合规范(必须有数字和大小写字母)'}
    ]},
  {
    key:'email', 
    label:"邮箱" , 
    rules: [
      { required: true, message: '请输入邮箱' },
      {pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '输入的邮箱不符合规范'}
    ]
  },
  {
    key:'realName', 
    label:"真实姓名",
    rules: [
      { required: true, message: '请输入真实姓名' }
    ]
  },
]