import { render, screen, fireEvent } from '@testing-library/react';
import { LoginModal } from '../components/login/LoginModal';
import '@testing-library/jest-dom'
import UserContextProvider from "../context/UserContext";
import { server } from "./mocks/server.js";
import { login } from "../services/LoginService";

describe("<ManageAccount />", () => {
    beforeAll(() => {
      server.listen()
    })

  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
    afterEach(() => server.resetHandlers())

  // Clean up after the tests are finished.
    afterAll(() => server.close())

    test("renders LoginModal component when login", () => {
        render(
          <UserContextProvider><LoginModal onClose={null}/></UserContextProvider>)

        const loginHeader = screen.getAllByText(/Login/i)[0]
        const loginButton = screen.getAllByText(/Login/i)[1]

        expect(screen.getByPlaceholderText(/E-Mail/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
        expect(loginHeader).toBeInTheDocument()
        expect(loginButton).toBeInTheDocument()
        expect(screen.getByText(/Dont have an account/i)).toBeInTheDocument()
        expect(screen.getByText(/Sign up here/i)).toBeInTheDocument()
    })

    test("renders LoginModal component when register", () => {
        render(<UserContextProvider><LoginModal onClose={null}/></UserContextProvider>)

        fireEvent.click(screen.getByText(/Sign up here/i))

        const registerHeader = screen.getAllByText(/Register/i)[0]
        const registerButton = screen.getAllByText(/Register/i)[1]

        expect(screen.getByPlaceholderText(/E-Mail/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
        expect(registerHeader).toBeInTheDocument()
        expect(registerButton).toBeInTheDocument()
        expect(screen.getByText(/Already have an account/i)).toBeInTheDocument()
        expect(screen.getByText(/Login here/i)).toBeInTheDocument()
    })

    test("renders error message when password is less than 6 characters", async () => {
        render(<UserContextProvider><LoginModal onClose={null}/></UserContextProvider>)

        const userNameInput = screen.getByPlaceholderText(/E-Mail/i)
        const passwordInput = screen.getByPlaceholderText(/Password/i)

        await fireEvent.input(userNameInput, {target: {value: 'test'}})
        await fireEvent.input(passwordInput, {target: {value: '12345'}})
        await fireEvent.click(screen.getAllByText(/Login/i)[1])

        expect(await screen.findByText("The password must be at least 6 characters")).toBeInTheDocument()

        fireEvent.click(screen.getByText(/Sign up here/i))
        await fireEvent.input(userNameInput, {target: {value: 'test'}})
        await fireEvent.input(passwordInput, {target: {value: '12345'}})
        await fireEvent.click(screen.getAllByText(/Register/i)[1])

        expect(await screen.findByText("The password must be at least 6 characters")).toBeInTheDocument()
    })

    test("renders error message when input is empty", async () => {
        render(<UserContextProvider><LoginModal onClose={null}/></UserContextProvider>)

        const userNameInput = screen.getByPlaceholderText(/E-Mail/i)
        const passwordInput = screen.getByPlaceholderText(/Password/i)

        await fireEvent.input(userNameInput, {target: {value: ''}})
        await fireEvent.input(passwordInput, {target: {value: ''}})
        await fireEvent.click(screen.getAllByText(/Login/i)[1])

        expect(await screen.findByText("Please fill in all the fields")).toBeInTheDocument()

        fireEvent.click(screen.getByText(/Sign up here/i))
        await fireEvent.input(userNameInput, {target: {value: ''}})
        await fireEvent.input(passwordInput, {target: {value: ''}})
        await fireEvent.click(screen.getAllByText(/Register/i)[1])

        expect(await screen.findByText("Please fill in all the fields")).toBeInTheDocument()
    })

    test("testing stuff", async () => {
      const res = await login('fakeUser1', 'fakePassword1')
      console.log(res.username)
      expect(res.username).toBe('essa')
    })
})
