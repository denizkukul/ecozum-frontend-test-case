import './Result.less';
import { CheckCircleOutlined } from '@ant-design/icons';
export const Result = () => {
  return (
    <div className='result'>
      <CheckCircleOutlined />
      <p className='result-text'>Başarıyla Tamamlandı!</p>
    </div>
  )
}
