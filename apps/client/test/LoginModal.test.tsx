import { render, screen, fireEvent } from '@testing-library/react';
import { LoginModal } from '../components/login/LoginModal';
import '@testing-library/jest-dom'
import UserContextProvider from "../context/UserContext";

describe("<ManageAccount />", () => {
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
})
