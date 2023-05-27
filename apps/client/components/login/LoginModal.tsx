import React, { useRef } from 'react'
import styles from './LoginModal.module.css'
import { MdOutlineMail, MdLock, MdVisibility, MdVisibilityOff, MdOutlineClose } from 'react-icons/md'
import { useState } from 'react'
import { login } from '../../services/LoginService'
import { register } from '../../services/RegisterService'
import { useUserContext } from '../../context/UserContext'
import { PrimaryButton } from '../buttons/primaryButton/PrimaryButton'

interface Props {
  onClose: () => void
}

export const LoginModal: React.FC<Props> = ({ onClose }) => {
  // state handling password visibility
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  // state handling toggling between login and register
  const [isLogin, setIsLogin] = useState(true)
  // state handling error label
  const [errorLabel, setErrorLabel] = useState('')
  // refs for email and password
  const passwordElement = useRef<HTMLInputElement>()
  const emailElement = useRef<HTMLInputElement>()
  // changing user context
  const { setUser } = useUserContext()

  // function for login
  const onLogin = () => {
    login(emailElement.current.value, passwordElement.current.value)
      .then((data) => {
        setUser({
          email: emailElement.current.value,
          name: emailElement.current.value.split('@')[0],
        })
        localStorage.setItem('token', data.token)
        onClose()
      })
      .catch(() => {
        if (passwordElement.current.value.length < 6) {
          setErrorLabel('The password must be at least 6 characters')
        } else {
          setErrorLabel('Something went wrong')
        }
      })
  }

  // function for register
  const onRegister = () => {
    register(emailElement.current.value, passwordElement.current.value)
      .then((data) => {
        setUser({
          email: emailElement.current.value,
          name: emailElement.current.value.split('@')[0],
        })
        localStorage.setItem('token', data.token)

        onClose()
      })
      .catch(() => {
        if (passwordElement.current.value.length < 8) {
          setErrorLabel('The password must be at least 8 characters')
        } else {
          setErrorLabel('Something went wrong')
        }
      })
  }

  // function for toggling between login and register and validation
  const handleClick = () => {
    if (
      emailElement.current.value === '' ||
      emailElement.current.value === undefined ||
      passwordElement.current.value === ''
    ) {
      setErrorLabel('Please fill in all the fields')
      return
    }
    if (isLogin) {
      onLogin()
    } else {
      if (passwordElement.current.value.length < 6) {
        setErrorLabel('The password must be at least 6 characters')
        return
      }
      onRegister()
    }
  }

  return (
    <div className={styles.accountWrapperOuter}>
      <div className={styles.accountWrapper}>
        <div className={styles.closeBtn} onClick={onClose}>
          <MdOutlineClose size={20} />
        </div>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <div className={styles.accountForm}>
          <div className={styles.inputWrapper}>
            <MdOutlineMail size={20} className={styles.icon} />
            <input ref={emailElement} placeholder="E-Mail" name="email" type="text" />
          </div>
          <div className={styles.inputWrapper}>
            <MdLock size={20} className={styles.icon} />
            <input
              ref={passwordElement}
              placeholder="Password"
              name="password"
              type={passwordVisibility ? 'password' : 'text'}
            />
            {passwordVisibility == false ? (
              <MdVisibilityOff
                size={20}
                className={styles.icon}
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              />
            ) : (
              <MdVisibility
                size={20}
                className={styles.icon}
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              />
            )}
          </div>
        </div>
        <label className={styles.errorLabel + ' body-small'}>{errorLabel}</label>
        <div className={styles.accountBtnContainer}>
          <PrimaryButton onClick={handleClick}>
            <p className="body">{isLogin ? 'Login' : 'Register'}</p>
          </PrimaryButton>
          <p className={styles.accountText + ' body-small'}>
            {isLogin ? 'Dont have an account? ' : 'Already have an account? '}
            <span className={styles.signUpBtn} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up here!' : 'Login here!'}
            </span>{' '}
          </p>
        </div>
      </div>
    </div>
  )
}
