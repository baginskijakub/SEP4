import { render, screen, fireEvent } from '@testing-library/react';
import { PlantCurrentEnvironment } from '../components/plant/plantCurrentEnvironment/PlantCurrentEnvironment'
import '@testing-library/jest-dom'
import { IPlant } from "@sep4/types";
import { AdjustCurrentEnvironment } from "../components/plant/adjustCurrentEnvironment/AdjustCurrentEnvironment";
import 'setimmediate'

const testPlant: IPlant = {
  id: 1,
  name: "Test Plant",
  nickName: "Test",
  latinName: "Testus Plantus",
  image: "https://www.ikea.com/us/en/images/products/fejka-artificial-potted-plant-with-pot-indoor-outdoor-succulent__0614212_PE686835_S5.JPG",
  idealEnvironment: {
    maxTemperature: 25,
    minTemperature: 20,
    maxHumidity: 60,
    minHumidity: 50,
    maxCo2: 0.6,
    minCo2: 0.4
  },
  currentEnvironment: {
    temperature: 22,
    humidity: 54,
    co2: 0.5
  }
}
describe("<AdjustEnvironment />", () => {
  test("renders adjust environment component", () => {
    render(<AdjustCurrentEnvironment
      currentEnvironment={testPlant.currentEnvironment}
      idealEnvironment={testPlant.idealEnvironment}
      plantId={testPlant.id}
      onClose={() => console.log("close")}
    />)

    expect(screen.getByText("Adjust environment")).toBeInTheDocument()
    expect(screen.getByText(/Temperature/i)).toBeInTheDocument()
    expect(screen.getByText(/Humidity/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Environment/i)[0]).toBeInTheDocument()
  })

  test("Integration between PlantCurrentEnvironment and AdjustEnvironment", async () => {
    render(<PlantCurrentEnvironment plant={testPlant}/>)
    await fireEvent.click(screen.getByText(/Adjust/i))
    expect(screen.getByText("Adjust environment")).toBeInTheDocument()
  })

})
