import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { PackageSummary } from '../components/PackageSummary';
import { makePayment } from '../store/actions';

export const PaymentPage = () => {
  const dispatch = useDispatch();
  const selectedIDs = useSelector(state => state.selectedIDs);
  const totalAmount = useSelector(state => state.total);
  const terms = useSelector(state => state.terms);
  const [formData, setFormData] = useState({ cardHolderName: '', cardNumber: '', expireDate: '', cvv: '' })

  const updateFormData = (e) => {
    setFormData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handlePayment = () => {
    const data = { ...formData, totalAmount, packageIds: selectedIDs }
    dispatch(makePayment(data));
  }

  return (
    <div className='payment-page'>
      <Header />
      <div className='container' style={{ maxWidth: '1200px', display: 'flex' }}>
        <div className='payment-panel' style={{ flex: 1 }}>
          <form className='payment-form'>
            <h4>Kart Bilgileri</h4>
            <input placeholder='Kart Üzerindeki İsim Soyisim' name='cardHolderName' value={formData.cardHolderName} onChange={updateFormData} />
            <br />
            <input placeholder='Kart Numarası' name='cardNumber' value={formData.cardNumber} onChange={updateFormData} />
            <input placeholder='Son Kul. Tar.' name='expireDate' value={formData.expireDate} onChange={updateFormData} />
            <input type="password" placeholder='CVV/CVC' name='cvv' value={formData.cvv} onChange={updateFormData} />
          </form>
          <div className='terms'>
            <h4>Sözleşme</h4>
            <div dangerouslySetInnerHTML={{ __html: terms }}></div>
          </div>
        </div>
        <div className='summary-panel'>
          <h4>Sepetteki Paketler</h4>
          {
            selectedIDs.map(id => {
              return <PackageSummary key={id} packageId={id} />
            })
          }
          <button onClick={handlePayment}>Ödeme Yap</button>
        </div>
      </div>
    </div>
  )
}