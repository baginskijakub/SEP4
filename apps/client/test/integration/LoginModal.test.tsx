import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {LoginModal} from "../../components/login/LoginModal";
import { server } from "../mocks/server.js";
import UserContextProvider from "../../context/UserContext";

describe('<LoginModal />', () => {
  beforeAll(() => {
    server.listen()
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    })
  })

  test('Sends a request to server with credentials in login', async () => {
    let isSuccess = false
    await render(<UserContextProvider><LoginModal onClose={() => isSuccess = true} /></UserContextProvider>)

    const userNameInput = screen.getByPlaceholderText(/E-Mail/i)
    const passwordInput = screen.getByPlaceholderText(/Password/i)

    await fireEvent.input(userNameInput, {target: {value: 'fakeUser1'}})
    await fireEvent.input(passwordInput, {target: {value: 'fakePassword1'}})
    await fireEvent.click(screen.getAllByText(/Login/i)[1])

    await waitFor(() => expect(isSuccess).toBeTruthy())
  })

  test('Sends a request to server with credentials in register', async () => {
    let isSuccess = false
    await render(<UserContextProvider><LoginModal onClose={() => isSuccess = true} /></UserContextProvider>)
    await fireEvent.click(screen.getByText(/Sign up here/i))

    const userNameInput = screen.getByPlaceholderText(/E-Mail/i)
    const passwordInput = screen.getByPlaceholderText(/Password/i)

    await fireEvent.input(userNameInput, {target: {value: 'fakeUser1'}})
    await fireEvent.input(passwordInput, {target: {value: 'fakePassword1'}})
    await fireEvent.click(screen.getAllByText(/Register/i)[1])
    await new Promise((r) => setTimeout(r, 2000));
    await waitFor(() => expect(isSuccess).toBeTruthy())
  })
})

