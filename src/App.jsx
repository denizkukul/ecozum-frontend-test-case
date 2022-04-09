import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { SignupPage } from './pages/SignupPage';
import { ResultPage } from './pages/ResultPage';
import { Loading } from './components/Loading';
import { PackagesPage } from './pages/PackagesPage';
import { PaymentPage } from './pages/PaymentPage';
import { useEffect } from 'react';
import { getPackages, getTerms } from './store/actions';

const App = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.page);
  const appStatus = useSelector(state => state.status);
  let currentPage;

  useEffect(() => {
    page === 'packages' && dispatch(getPackages());
    page === 'payment' && dispatch(getTerms());
  }, [page])

  switch (page) {
    case 'signup': currentPage = <SignupPage />
      break;
    case 'packages': currentPage = <PackagesPage />
      break;
    case 'payment': currentPage = <PaymentPage />
      break;
    case 'result': currentPage = <ResultPage />
      break;
    default: currentPage = <Loading />
  }

  return (
    <div className="App">
      {
        appStatus === 'loading' ?
          <Loading /> :
          currentPage
      }
    </div>
  );
}

export default App;
