import { render, screen, fireEvent } from '@testing-library/react';
import { PlantCurrentEnvironment } from '../components/plant/plantCurrentEnvironment/PlantCurrentEnvironment'
import '@testing-library/jest-dom'

describe("<Environment />", () => {
    test("renders environment component", () => {
        render(<PlantCurrentEnvironment environment={{temperature: 0, humidity: 0, co2: 0}}/>)

        expect(screen.getByText("Current Environment")).toBeInTheDocument()
        expect(screen.getByText(/Temperature/i)).toBeInTheDocument()
        expect(screen.getByText(/Humidity/i)).toBeInTheDocument()
        expect(screen.getAllByText(/Environment/i)[0]).toBeInTheDocument()
    })

    test("renders environment component with correct values", () => {
        render(<PlantCurrentEnvironment environment={{temperature: 22, humidity: 54, co2: 80}}/>)

        expect(screen.getByText("Current Environment")).toBeInTheDocument()
        expect(screen.getByText(/Temperature/i)).toBeInTheDocument()
        expect(screen.getByText("22°C")).toBeInTheDocument()
        expect(screen.getByText(/Humidity/i)).toBeInTheDocument()
        expect(screen.getByText("54")).toBeInTheDocument()
        expect(screen.getAllByText(/Environment/i)[0]).toBeInTheDocument()
        expect(screen.getByText("80")).toBeInTheDocument()
    })

})