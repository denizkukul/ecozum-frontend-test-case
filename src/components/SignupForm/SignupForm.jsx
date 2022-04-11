import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/actions';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import './SignupForm.less';

export const SignupForm = () => {
  const dispatch = useDispatch();

  const handleSignup = (values) => {
    dispatch(signup(values));
  };

  return (
    <Form
      className='signup-form'
      wrapperCol={{ span: 24 }}
      name='signup'
      layout='vertical'
      onFinish={handleSignup}
      autoComplete='off'
    >
      <Form.Item
        label='Adınız Soyadınız'
        required={false} // Removes * from label
        name='fullName'
        validateTrigger='onSubmit'
        rules={[{ required: true, message: 'Adınızı girmediniz!' }]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        label='Email Adresiniz'
        required={false}
        name='email'
        validateTrigger='onSubmit'
        rules={[{ required: true, message: 'Email adresinizi girmediniz!' }, { type: 'email', message: 'Geçerli bir email adresi girmediniz!' }]}
      >
        <Input prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item >
        <Button type='primary' htmlType='submit' block>
          Devam Et
        </Button>
      </Form.Item>
    </Form>
  );
};
