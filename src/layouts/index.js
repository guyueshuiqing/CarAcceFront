import styles from './index.less';
import { Menu, Divider } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import { CarIcon } from 'components/index'
import { menu } from './config'
import logo from '../assets/images/logo.png'

// const { SubMenu } = Menu;

function BasicLayout(props) {
  const { history } = props
  return (
    <div>
      {
        props.location.pathname === '/login' || props.location.pathname === '/register' ? <div>{props.children}</div> :
        <div className={styles.container}>
          <div className={styles.header}>
            <img src={logo} alt="logo" className={styles.imgClass}/>
            <div className={styles.headerRight}>
              <span>hello,GuYue</span>
              <div className={styles.login}>
                <Link to={`/login`}><span>登录</span></Link>
                <Divider type="vertical"/>
                <Link to={`/register`}><span>注册</span></Link>
              </div>
            </div>
          </div>
          <div className={styles.menu}>
            <Menu style={{ fontSize: '28px !important' }} mode="horizontal" defaultSelectedKeys="/"
              onClick={({key})=>{
                let pathname = key
                let search = window.location.search
                if (key === '/') {
                  search = ''
                } else {
                  if (window.location.pathname.indexOf(key) === -1) {
                    search = ''
                  }
                }
                history.replace({
                  pathname,
                  search
                })
            }}>
              {
                menu.map((item,index)=>{
                    return (
                      <Menu.Item key ={item.key} style={{ fontSize: '28px !important' }} className={styles.menuItem}>
                        <CarIcon content={item.icon} />
                        <span style={{marginLeft: '10px'}}>{item.content}</span>
                      </Menu.Item>
                    )
                })
              }
              </Menu>
          </div>
          <div className={styles.main}>{props.children}</div>
        </div>
    
      }
      </div>
    
  );
}

export default connect()(BasicLayout)
