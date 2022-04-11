import { Button, Col, Form, Input, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { makePayment } from '../../store/actions';
import './PaymentForm.less';

const removeNonDigits = (value) => {
  return value.replace(/\D/g, '');
}

const splitCardNumber = (value) => {
  const validValue = removeNonDigits(value);
  if (validValue === '') return '';
  // Format with spaces every 4 character;
  const formatedValue = validValue.match(/.{1,4}/g).join(' ');
  return formatedValue;
}

const mergeCardNumber = (value) => {
  return value.replace(/\s/g, '');
}

const validateExpireDate = (_, value) => {
  const date = value.match(/(\d{2})\/(\d{2})/gm);
  if (date === null) return Promise.reject(new Error('AA/YY (Örn: 05/26) Şeklinde giriniz!'));
  const month = Number(date[0].slice(0, 2));
  const year = Number(date[0].slice(3, 5));
  if (month > 12 || month < 1) return Promise.reject(new Error('AA/YY (Örn: 05/26) Şeklinde giriniz!'));
  const time = new Date(`20${year}`, `${month - 1}`, 1).getTime();
  if (time < Date.now()) return Promise.reject(new Error('Geçmiş Tarih Girdiniz!'));
  return Promise.resolve();
};

export const PaymentForm = ({ formRef }) => {
  const [form] = Form.useForm();
  formRef.current = form;
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.totalCost);
  const selectedIds = useSelector(state => state.selectedIds);

  const handlePayment = (values) => {
    const data = { ...values, cardNumber: mergeCardNumber(values.cardNumber), totalAmount, packageIds: selectedIds }
    dispatch(makePayment(data));
  }

  const handleCardNumberChange = (e) => {
    form.setFieldsValue({ cardNumber: splitCardNumber(e.target.value) })
  }

  const handleCvvChange = (e) => {
    form.setFieldsValue({ cvv: removeNonDigits(e.target.value) })
  }



  return (
    <Form onFinish={handlePayment} form={form} className='payment-form' layout='vertical' >
      <Row gutter={18} align='bottom'>
        <Col span={12}>
          <Form.Item
            label='Kart Üzerindeki İsim Soyisim'
            required={false} // Removes * from label
            name='cardHolderName'
            validateTrigger='onSubmit'
            rules={[{ required: true, message: 'Bu alan gereklidir!' }]}
          >
            <Input value={form} />
          </Form.Item>
          <Form.Item
            label='Kart Numarası'
            required={false}
            name='cardNumber'
            validateTrigger='onSubmit'
            rules={[{ required: true, message: 'Bu alan gereklidir!' }, { len: 19, message: 'Kart numarası 16 haneli olmalıdır!' }]}
          >
            <Input maxLength={19} onChange={handleCardNumberChange} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label='Son Kul. Tar.'
            required={false}
            name='expireDate'
            validateTrigger='onSubmit'
            rules={[{ required: true, message: 'Bu alan gereklidir!' }, { validator: validateExpireDate }]}
          >
            <Input maxLength={5} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label='CVV/CVC'
            required={false}
            name='cvv'
            validateTrigger='onSubmit'
            rules={[{ required: true, message: 'Bu alan gereklidir!' }]}
          >
            <Input.Password maxLength={3} onChange={handleCvvChange} />
          </Form.Item>
        </Col>
      </Row>
      {/* If enter key needs to trigger payment button below can be uncommented */}
      {/* <Button htmlType='submit' style={{ display: 'none' }} /> */}
    </Form>
  )
}
