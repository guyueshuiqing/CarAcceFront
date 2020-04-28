import React, { Component } from 'react';
import styles from './index.less';
import { Menu, message } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import { CarIcon } from 'components/index'
import { getUserInfo } from '../services/servers'
import { menu, roleIcon } from './config'
import logo from '../assets/images/logo.png'

// const { SubMenu } = Menu;

@connect(state => ({
  loading: state.loading,
  cms: state.cms
}))

class BasicLayout extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount(){
    const {  dispatch, cms } = this.props
    const { userInfo } = cms
    
    let username = window.localStorage.getItem('username')
    if(!userInfo.user && username){
      let params ={
        obj:{
          username: username
        }
      }
      getUserInfo(params).then((res)=>{
        if(res && !res.flag){
          message.error(res.message && res.message)
          return
        }
        dispatch({
          type: 'cms/updateState',
          payload: {
            key: 'userInfo',
            val: res.data.userInfo
          }
        })
      })
    }  
  }

  getMenu = (roleEn,roleLimit) =>{
    if(roleEn !== 'staff' || !roleLimit){
      if(roleEn === 'admin' || roleEn === 'superadmin'){
        return menu
      }
      return [
        menu[1]
      ]
    }
    let filterMenu =[] 
    menu.forEach(menuItem=>{
      if(menuItem.key === '/'){
        filterMenu.push(menuItem)
      }
      roleLimit.forEach(LimitItem=>{
        if(menuItem.key === ('/'+LimitItem)){
          filterMenu.push(menuItem)
        }
      })
    })

    return filterMenu
  }

  
  render(){
    const { history, cms } = this.props
    const { userInfo } = cms
    const pathname = this.props.location.pathname
    const roleEn = userInfo.role && userInfo.role.roleEn || ''
    const roleLimit = userInfo.user && userInfo.user.limit || []
    const filterMenu = this.getMenu(roleEn, roleLimit)
    return (
      <div key={Math.random(10)}>
        {
          pathname === '/login' || pathname === '/register' ? <div>{this.props.children}</div> :
          roleEn && roleEn === 'staff' && roleLimit && roleLimit.length <= 0 ? <div className={styles.noMenu}>请先找相关人员进行菜单权限授予! <div><Link to={`/login`}><span>切换登录</span></Link> </div></div> :
          <div className={styles.container}>
            <div className={styles.header}>
              <img src={logo} alt="logo" className={styles.imgClass}/>
              <div className={styles.headerRight}>
                {
                  userInfo &&  userInfo.user &&
                  <div className={styles.headerRightWrapper}>
                    <div className={styles.userInfo}>
                      <span><CarIcon content="&#xe6d7;"/> {userInfo.user.username}</span>
                      <span><CarIcon content={roleIcon[roleEn]}/> {userInfo.role.role}</span>
                    </div>
                    <div className={styles.logout}>
                      <Link to={`/login`} style={{color: '#bbbbbb'}}><span>注销</span></Link>
                    </div>
                  </div>
                  
                //    <div className={styles.login}>
                //   <Link to={`/login`}><span>登录</span></Link>
                //   <Divider type="vertical"/>
                //   <Link to={`/register`}><span>注册</span></Link>
                // </div>
                }
                
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.menu}>
                <Menu style={{ fontSize: '28px !important' }} mode="inline" defaultSelectedKeys={pathname && '/'}
                  onClick={({key,keyPath})=>{
                    let pathname = keyPath.length > 1 ? keyPath[1]+keyPath[0] : key
                    let search = window.location.search
                    // if (key === '/') {
                    //   search = ''
                    // } else {
                    //   if (window.location.pathname.indexOf(key) === -1) {
                    //     search = ''
                    //   }
                    // }
                    search = ''
                    history.replace({
                      pathname,
                      search
                    })
                }}>
                  {
                    filterMenu && filterMenu.map((item,index)=>{
                      if(item.children) {
                        return (
                          <Menu.SubMenu key={item.key} title={
                            <span className={styles.menuItem}>
                              <CarIcon content={item.icon} />
                              <span style={{marginLeft: '10px'}}>{item.content}</span>
                            </span>
                          }>
                            {
                              item.children && item.children.map((child)=>{
                                return (
                                  <Menu.Item key ={child.key}  className={styles.menuItem}>
                                    {/* <CarIcon content={child.icon} /> */}
                                    <span style={{marginLeft: '10px'}}>{child.content}</span>
                                  </Menu.Item>
                                )
                              })
                            }
                          </Menu.SubMenu>
                        )
                      }
                      return (
                        <Menu.Item key ={item.key}  className={styles.menuItem}>
                          <CarIcon content={item.icon} />
                          <span style={{marginLeft: '10px'}}>{item.content}</span>
                        </Menu.Item>
                      )
                    })
                  }
                  </Menu>
              </div>
              <div className={styles.content}>{this.props.children}</div>
            </div>
          </div>
        }
        </div>
    )
  }

  
}

export default BasicLayout
