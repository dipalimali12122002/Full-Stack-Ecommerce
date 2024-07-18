import React, { useState } from 'react'
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email }

    const dataResponse = await fetch(SummaryApi.forgotPassword.url, {
      method: SummaryApi.forgotPassword.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      alert("check you email for reset password link")
      navigate('/login')
    } else if (dataApi.error) {
      toast.error(dataApi.message)
    }
    console.log("forgot password",dataApi)
  }

  return (
    <div className='max-auto container p-4'>
      <div className='bg-white p-5 w-full max-w-sm mx-auto'>
        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='grid'>
            <label htmlFor='email'>Email: </label>
            <div className='bg-slate-100 p-2'>
              <input
                type='email'
                placeholder='enter email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
          </div>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
