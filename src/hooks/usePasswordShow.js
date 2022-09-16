import { useState } from 'react'

const usePasswordShow = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const showPassword = () => {
    setPasswordShow(!passwordShow);
  }
  return { passwordShow, showPassword }
}

export default usePasswordShow