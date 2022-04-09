import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/actions';

export const SignupPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '' })
  const dispatch = useDispatch();

  const updateFormData = (e) => {
    setFormData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup(formData))
  }

  return (
    <div className='signup-page'>
      <form onSubmit={handleSignup}>
        <input placeholder='Adınız Soyadınız' name='fullName' value={formData.fullName} onChange={updateFormData} />
        <br />
        <input placeholder='Email Adresiniz' name='email' value={formData.email} onChange={updateFormData} />
        <br />
        <button>Devam Et</button>
      </form>
    </div>
  )
}