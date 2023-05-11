import { render, screen, fireEvent } from '@testing-library/react';
import { PlantCurrentEnvironment } from '../components/plant/plantCurrentEnvironment/PlantCurrentEnvironment'
import '@testing-library/jest-dom'

describe("<Environment />", () => {
    test("renders environment component", () => {
        render(<PlantCurrentEnvironment id={1}/>)

        expect(screen.getByText("Current Environment")).toBeInTheDocument()
        expect(screen.getByText(/Temperature/i)).toBeInTheDocument()
        expect(screen.getByText(/Humidity/i)).toBeInTheDocument()
        expect(screen.getAllByText(/Environment/i)[0]).toBeInTheDocument()
    })

   
})