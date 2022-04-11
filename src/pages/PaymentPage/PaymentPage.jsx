import { Col, Row, Button } from 'antd';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { PackageSummary } from '../../components/PackageSummary/PackageSummary';
import { PaymentForm } from '../../components/PaymentForm/PaymentForm';
import './PaymentPage.less';

export const PaymentPage = () => {
  const formRef = useRef();
  const totalCost = useSelector(state => state.totalCost);
  const selectedIds = useSelector(state => state.selectedIds);
  const terms = useSelector(state => state.terms);
  const currency = useSelector(state => state.currency);

  const handleClick = () => {
    formRef.current.submit();
  }

  return (
    <div className='payment-page'>
      <div className='payment-container'>
        <Row gutter={28}>
          <Col span={16}>
            <div className='payment-panel'>
              <div className='form'>
                <p className='title'>Kart Bilgileri</p>
                <PaymentForm formRef={formRef} />
              </div>
              <div className='terms'>
                <p className='title'>Sözleşme</p>
                <div className='terms-content' dangerouslySetInnerHTML={{ __html: terms }}></div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className='summary-panel'>
              <p className='title'>Sepetteki Paketler</p>
              {
                selectedIds.map(id => {
                  return <PackageSummary key={id} packageId={id} />
                })
              }
              <div className='total'>
                <p>Toplam Tutar:</p>
                <p className='cost'>{totalCost}<span className='currency'>{currency}</span></p>
              </div>
              <Button type='primary' block onClick={handleClick}>Ödeme Yap</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}