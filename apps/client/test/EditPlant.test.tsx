import { render, screen } from '@testing-library/react';
import { CreatePlant } from '../components/plant/createPlant/CreatePlant';
import '@testing-library/jest-dom'

describe("<EditPlant />", () => {
    test("renders editPlant component", () => {
        render(<CreatePlant onClose={null} mode='edit'/>)

        expect(screen.getByPlaceholderText(/Nickname/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Plant name/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Latin name/i)).toBeInTheDocument()

        expect(screen.getByText(/Min temperature/i)).toBeInTheDocument()
        expect(screen.getByText(/Max temperature/i)).toBeInTheDocument()
        expect(screen.getByText(/Min humidity/i)).toBeInTheDocument()
        expect(screen.getByText(/Max humidity/i)).toBeInTheDocument()
        expect(screen.getByText(/Min CO2/i)).toBeInTheDocument()
        expect(screen.getByText(/Max CO2/i)).toBeInTheDocument()

        expect(screen.getByText(/Apply changes/i)).toBeInTheDocument()
        expect(screen.getByText(/Discard changes/i)).toBeInTheDocument()
    })

})