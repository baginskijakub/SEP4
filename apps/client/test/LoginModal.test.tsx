import { render, screen, fireEvent } from '@testing-library/react';
import { LoginModal } from '../components/login/LoginModal';
import '@testing-library/jest-dom'

describe("<ManageAccount />", () => {
    test("renders LoginModal component when login", () => {
        render(<LoginModal onClose={null}/>)

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
        render(<LoginModal onClose={null}/>)

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

    test("renders error message when password is less than 6 characters", () => {
        render(<LoginModal onClose={null}/>)

        fireEvent.change(screen.getByPlaceholderText(/E-Mail/i), {target: {value: ',test@gmail.com'}})
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {target: {value: '12345'}})
        fireEvent.click(screen.getAllByText(/Login/i)[1])

        expect(screen.getByLabelText(/The password must be at least 6 characters/i)).toBeInTheDocument()

        fireEvent.change(screen.getByPlaceholderText(/E-Mail/i), {target: {value: ',test@gmail.com'}})
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {target: {value: '12345'}})
        fireEvent.click(screen.getAllByText(/Register/i)[1])

        expect(screen.getByText(/The password must be at least 6 characters/i)).toBeInTheDocument()
    })

    test("renders error message when input is empty", () => {
        render(<LoginModal onClose={null}/>)

        fireEvent.change(screen.getByPlaceholderText(/E-Mail/i), {target: {value: ''}})
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {target: {value: ''}})
        fireEvent.click(screen.getAllByText(/Login/i)[1])

        expect(screen.getByLabelText(/Please fill in all fields/i)).toBeInTheDocument()

        fireEvent.change(screen.getByPlaceholderText(/E-Mail/i), {target: {value: ''}})
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {target: {value: ''}})
        fireEvent.click(screen.getAllByText(/Register/i)[1])

        expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument()
    })
})