import { Row, Col, Divider, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Package } from '../../components/Package/Package';
import { goToPayment } from '../../store/actions';
import './PackagesPage.less';

export const PackagesPage = () => {
  const dispatch = useDispatch();
  const packageIds = useSelector(state => state.packageIds);
  const totalCost = useSelector(state => state.totalCost);
  const currency = useSelector(state => state.currency);

  const handleContinue = () => {
    dispatch(goToPayment());
  }

  return (
    <div className='packages-page'>
      <div className='packages-container'>
        <Row className='package-list' gutter={[75, 48]}>
          {
            packageIds.map(id => {
              return (
                <Col key={id} span={12}>
                  <Package id={id} />
                </Col>
              )
            })
          }
        </Row>
        <Divider />
        <div className='bottom-bar'>
          <p className='totalcost-text'>Seçilen Paket Tutarı: <span className='totalcost'>{totalCost}<span className='currency'>{currency}</span></span></p>
          <Button onClick={handleContinue} type='primary'>Devam Et</Button>
        </div>
      </div>
    </div>
  )
}