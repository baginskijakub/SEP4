import { render, screen, fireEvent } from '@testing-library/react';
import { ManageAccount } from '../components/login/LoginModal';
import '@testing-library/jest-dom'

describe("<ManageAccount />", () => {
    test("renders LoginModal component", () => {
        render(<ManageAccount onClose={null}/>)

        const loginHeader = screen.getAllByText(/Login/i)[0]
        const loginButton = screen.getAllByText(/Login/i)[1]

        expect(screen.getByPlaceholderText(/E-Mail/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
        expect(loginHeader).toBeInTheDocument()   
        expect(loginButton).toBeInTheDocument() 
        expect(screen.getByText(/Dont have an account/i)).toBeInTheDocument()
        expect(screen.getByText(/Sign up here/i)).toBeInTheDocument()
    })
})