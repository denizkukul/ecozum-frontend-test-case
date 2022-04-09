import { useSelector } from 'react-redux';

export const Header = () => {
  const user = useSelector(state => state.user)
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50px', backgroundColor: 'whitesmoke' }}>
      <div style={{ position: 'absolute', left: 20 }}>Logo</div>
      <div style={{ position: 'absolute', right: 20 }}>{user.fullName}</div>
    </div>
  )
}
