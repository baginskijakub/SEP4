import React, { useContext, useState } from 'react'
import { IUser } from '@sep4/types'

const UserContext = React.createContext<IUser | null>(null)
const UserChangeContext = React.createContext<(user: IUser) => void>(() => {})

export function useUser() {
  return useContext(UserContext)
}

export function useUserChange() {
  return useContext(UserChangeContext)
}

type Props = {
  children?: React.ReactNode
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)

  function changeUser(user: IUser | null) {
    setUser(user)
    console.log(user)
  }

  return (
    <UserContext.Provider value={user}>
      <UserChangeContext.Provider value={changeUser}>{children}</UserChangeContext.Provider>
    </UserContext.Provider>
  )
}

export default UserContext
