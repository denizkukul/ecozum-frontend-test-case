import { UserOutlined } from '@ant-design/icons';
import './UserInfo.less';

export const UserInfo = ({ name }) => {
  return (
    <div className='user-info'>
      <UserOutlined />
      <p className='username'>{name}</p>
    </div>
  )
}
