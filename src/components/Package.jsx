import { useDispatch, useSelector } from 'react-redux';
import { togglePackage } from '../store/actions';

export const Package = ({ id }) => {
  const packageData = useSelector(state => state.packages[id])
  const dispatch = useDispatch();

  const handleTogglePackage = () => {
    dispatch(togglePackage(id));
  }

  return (
    <div onClick={handleTogglePackage} style={{ display: 'flex', outline: `${packageData.selected ? '2px solid green' : 'none'}`, flex: '400px 1 0', margin: '10px' }}>
      <img src={packageData.imagePath} alt='package' style={{ height: '150px', width: '150px' }} />
      <div>
        <h4 style={{ margin: '0' }}>{packageData.name}</h4>
        <div style={{ display: 'flex' }}>
          <div>
            {
              packageData.details.map(detail => {
                return <p key={detail}>{detail}</p>
              })
            }
          </div>
          <div>
            {
              packageData.tags.map(tag => {
                return <p key={tag}>{tag}</p>
              })
            }
          </div>
          <p>{`${packageData.amount}${packageData.currency}`}</p>
        </div>
      </div>
    </div>
  )
}