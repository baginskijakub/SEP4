import { render, screen } from '@testing-library/react';
import { PlantCurrentEnvironment } from '../components/plant/plantCurrentEnvironment/PlantCurrentEnvironment'
import '@testing-library/jest-dom'
import 'setimmediate'

const mockPlant = {
    id: 1,
    name: "Plant 1",
    latinName: "Plantus 1",
    nickName: "Planty",
    image: "https://www.ikea.com/images/fe/8c/fe8c0c2b9b9b9f2f2b9b9b9b9b9b9b9b.jpg?f=xxxl",
    idealEnvironment: {
        maxTemperature: 25,
        minTemperature: 20,
        maxHumidity: 60,
        minHumidity: 40,
        maxCo2: 1,
        minCo2: 0.5
    },
    currentEnvironment: {
      temperature: 22,
      humidity: 50,
      co2: 0.6
    }
}
describe("<Environment />", () => {
    test("renders environment component", () => {

        render(<PlantCurrentEnvironment  plant={mockPlant}/>)
        expect(screen.getByText("Current Environment")).toBeInTheDocument()
        expect(screen.getByText(/Temperature/i)).toBeInTheDocument()
        expect(screen.getByText(/Humidity/i)).toBeInTheDocument()
        expect(screen.getAllByText(/Environment/i)[0]).toBeInTheDocument()
    })


    test("renders environment component with correct values", () => {
        render(<PlantCurrentEnvironment plant={mockPlant}/>)

        expect(screen.getByText("Current Environment")).toBeInTheDocument()
        expect(screen.getByText(/Temperature/i)).toBeInTheDocument()
        expect(screen.getByText("22°C")).toBeInTheDocument()
        expect(screen.getByText(/Humidity/i)).toBeInTheDocument()
        expect(screen.getByText("50")).toBeInTheDocument()
        expect(screen.getAllByText(/Environment/i)[0]).toBeInTheDocument()
        expect(screen.getByText("0.6")).toBeInTheDocument()
    })

})

