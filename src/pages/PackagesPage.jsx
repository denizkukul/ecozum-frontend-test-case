import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { Package } from '../components/Package';
import { goToPayment } from '../store/actions';

export const PackagesPage = () => {
  const dispatch = useDispatch();
  const packageIDs = useSelector(state => state.packageIDs);
  const totalCost = useSelector(state => state.total);

  const handleContinue = () => {
    dispatch(goToPayment());
  }

  return (
    <div className='packages-page'>
      <Header />
      <div className='container'>
        <div className='package-list' style={{ display: 'flex', maxWidth: '1500px', flexWrap: 'wrap' }}>
          {
            packageIDs.map(id => {
              return (
                <Package key={id} id={id} />
              )
            })
          }
        </div>
        <div className='bottom-bar' style={{ display: 'flex' }}>
          <p>Seçilen Paket Tutarı: {totalCost}</p>
          <button onClick={handleContinue} style={{ marginLeft: 'auto' }}>Devam Et</button>
        </div>
      </div>
    </div>
  )
}