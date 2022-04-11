import { Divider, Image, Spin, Badge, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { togglePackage } from '../../store/actions';
import './Package.less';

export const Package = ({ id }) => {
  const packageData = useSelector(state => state.packages[id])
  const dispatch = useDispatch();

  const handleTogglePackage = () => {
    dispatch(togglePackage(id));
  }

  return (
    <div className={`package ${packageData.selected ? 'selected' : ''}`} onClick={handleTogglePackage} >
      <Image
        src={packageData.imagePath}
        preview={false}
        placeholder={<div className='img-loading'><Spin size='large' /></div>}
      />
      <div className='package-info'>
        <div className='package-head'>
          <p className='package-name'>{packageData.name}</p>
          <p className='package-cost'>{packageData.amount}<span className='currency'>{packageData.currency}</span></p>
        </div>
        <div className='package-body'>
          <div className='package-details'>
            {
              packageData.details.map(detail => {
                return <Badge key={detail} status='default' text={detail} />
              })
            }
          </div>
          <Divider />
          <div className='package-tags'>
            {
              packageData.tags.map(tag => {
                return <Tag key={tag}>{tag}</Tag>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}