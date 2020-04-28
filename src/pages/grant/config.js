import { Divider, Popconfirm, Button, Popover } from 'antd'

export const getColumns = (_this) =>{

  let grant = {
    purchase: '采购管理',
    store: '仓库管理',
    sale: '销售管理'
  }
  const cms = _this.props && _this.props.cms
  const currentUserRole = cms && cms.userInfo && cms.userInfo.role && cms.userInfo.role.roleEn || ''

  let  allColumns  = [
    {
      title: '用户名',
      key: 'username',
      // dataIndex: 'remarks',
      width: 150,
      render: (record)=>{
        return <span>{record.user && record.user.username}</span>
      }
    },
    {
      title: '真实姓名',
      key: 'real_name',
      // dataIndex: 'remarks',
      width: 120,
      render: (record)=>{
        return <span>{record.user && record.user.real_name}</span>
      }
    },
    {
      title: '邮箱',
      key: 'email',
      // dataIndex: 'remarks',
      width: 180,
      render: (record)=>{
        return <span>{record.user && record.user.email}</span>
      }
    },
    {
      title: '角色',
      key: 'role',
      // dataIndex: 'remarks',
      width: 120,
      render: (record)=>{
        return <span>{record.role && record.role.role}</span>
      }
    },
    {
      title: '权限',
      key: 'grant',
      // dataIndex: 'remarks',
      width: 300,
      render: (record)=>{
        return <div style={{ display: 'flex', flexWrap: 'wrap' }} >
          {
             record.role && record.role.roleEn && record.role.roleEn === 'staff' ? 
             record.user && record.user.limit && record.user.limit.map((i) => <span key={i} style={{ padding: '2px 13px', height: '26px', background: '#F0F2F5', borderRadius: '20px', margin: '5px'}}>{grant[i]}</span>) || '' :
              <span style={{ padding: '2px 13px', height: '26px', background: '#F0F2F5', borderRadius: '20px', margin: '5px'}}>全部菜单权限</span>
          }
        </div>
      }
    },

    {
      title: '操作',
      key: 'actions',
      width: 240,
      render: (record)=>{
        const stylec={ color: '#1890ff', cursor: 'pointer' }
        return (
          <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
            {
              record.role && record.role.roleEn && record.role.roleEn === 'staff' && 
              <span style={stylec} onClick={()=>{
                _this.setState({
                  visiable: true,
                  grantList: record.user && record.user.limit || [],
                  userInfoItem: record.user
                })
              }}>授权</span>
            }
            {
              record.role && record.role.roleEn && record.role.roleEn === 'staff' &&
              <Divider type="vertical"/>
            }
            {
              record.role && record.role.roleEn && record.role.roleEn !== 'superAdmin' && 
              <>
                <span style={stylec}>提权</span>
                <Divider type="vertical" />
              </>
            }
            {
              (currentUserRole ==='superAdmin' || (currentUserRole ==='admin' && record.role && record.role.roleEn !== 'superAdmin')) &&
              <Popconfirm
                title={`确认删除此员工吗？`}
                onConfirm={() => {
                  
                }}
                okText="是"
                cancelText="否"
              >
              <span style={{ cursor: 'pointer', color: 'rgba(0, 0, 0, 0.25)' }}>删除</span>
            </Popconfirm>
            }
            
          </div>
        )
      }
    }
  ]

  return allColumns
}