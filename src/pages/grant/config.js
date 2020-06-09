import { Divider, Popconfirm, message, Radio } from 'antd'
import { deleteUser, updateRole } from '../../services/servers'


function updateAuth(_this, currentRole,rowRole) {
  if(!currentRole || currentRole === ''){ return <span>您无权限</span> }
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }

  if(currentRole === 'admin' || currentRole === 'superAdmin'){
    return <div style={{marginRight: '15px'}}>
      <Radio.Group onChange={(e)=>{
        _this.setState({
          radioValue: e.target.value,
        })
      }} value={_this.state.radioValue}>
        <Radio style={radioStyle} disabled={(rowRole === 'superAdmin' || (rowRole === 'admin' && currentRole === 'admin'))} value={`upgrade`}>
          权限提升
        </Radio>
        <Radio style={radioStyle} disabled={(rowRole === 'staff')} value={`fall`}>
          权限降级
        </Radio>
      </Radio.Group>
    </div>
  }
}

export const getColumns = (_this) =>{

  let grant = {
    purchase: '采购管理',
    store: '仓库管理',
    sale: '销售管理'
  }
  const cms = _this.props && _this.props.cms
  const currentUserRole = cms && cms.userInfo && cms.userInfo.role && cms.userInfo.role.roleEn || ''
  const currentUserName = cms && cms.userInfo && cms.userInfo.user && cms.userInfo.user.username || ''
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
      width: 300,
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
              }}>菜单授权</span>
            }
            {
              record.role && record.role.roleEn && record.role.roleEn === 'staff' &&
              <Divider type="vertical"/>
            }
            {
              record.role && record.role.roleEn && record.user.username !== currentUserName && ((
                currentUserRole === 'admin' && record.role.roleEn !== 'superAdmin') || (currentUserRole === 'superAdmin')) &&
              <>
                <Popconfirm placement="top" icon={''} title={updateAuth(_this,currentUserRole,record.role.roleEn)} onConfirm={()=>{
                  const value = _this.state.radioValue
                  const username = record.user.username
                  if(!value && value!==''){
                    return
                  }
                  const params = {
                    obj:{
                      username: username,
                      role: value
                    }
                  }
                  updateRole(params).then((res)=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                  })
                }} okText="确认" cancelText="取消">
                  <span style={stylec}>权限更新</span>
                </Popconfirm>
                {
                  record.user.username !== currentUserName &&
                  <Divider type="vertical" />
                }
              </>
            }
            {
              record.user.username !== currentUserName &&(currentUserRole ==='superAdmin' || (currentUserRole ==='admin' && record.role && record.role.roleEn !== 'superAdmin')) &&
              <Popconfirm
                title={`确认删除此员工吗？`}
                onConfirm={() => {
                  const user = record.user && record.user.username
                  const params = {
                    username: user
                  }
                  deleteUser(params).then(res=>{
                    if(res && !res.flag){
                      message.error(res.message && res.message)
                      return
                    }
                  })
                }}
                okText="是"
                cancelText="否"
              >
              <span style={{ cursor: 'pointer', color: 'rgba(0, 0, 0, 0.25)' }}>删除角色</span>
            </Popconfirm>
            }
            
          </div>
        )
      }
    }
  ]
  return allColumns
}


