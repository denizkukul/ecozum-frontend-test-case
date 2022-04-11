import './App.less';
import { useDispatch, useSelector } from 'react-redux';
import { SignupPage, PackagesPage, PaymentPage, ResultPage } from './pages';
import { useEffect } from 'react';
import { getPackages, getTerms } from './store/actions';
import { Image, Layout, Spin } from 'antd';
import { UserInfo } from './components/UserInfo/UserInfo';
import logo from './assets/logo.png';

const { Header, Content } = Layout

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
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
    default: currentPage = <Spin size='large' />
  }

  const renderHeader = !(page === 'signup' || (page === 'packages' && appStatus === 'loading'))

  return (
    <Layout>
      {
        renderHeader &&
        <Header>
          <div className='container'>
            <Image src={logo} preview={false} />
            <UserInfo name={user.fullName} />
          </div>
        </Header>
      }
      <Content>
        <div className='container'>
          {
            appStatus === 'loading' ?
              <Spin size='large' /> :
              currentPage
          }
        </div>
      </Content>
    </Layout>
  );
}

export default App;
