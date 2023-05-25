import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PlantList } from '../../components/plant/plantList/PlantList'
import { IPlant } from '@sep4/types'
import { server } from "../mocks/server.js";

const plants: IPlant[] = [
  {
    id: 1,
    name: 'test',
    nickName: 'test',
    latinName: 'test',
    image: 'test',
  },
  {
    id: 2,
    name: 'test2',
    nickName: 'test2',
    latinName: 'test2',
    image: 'test2',
  },
]

describe('<PlantList />', () => {
  beforeAll(() => {
    server.listen()
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    })
  })

  test('Renders add plant modal when add button clicked', async () => {
    await render(<PlantList changeSelectedPlant={null} plants={plants} fetchAgain={null} selectedIndex={0} />)
    await waitFor(() => expect(screen.getByText('Add plant')).toBeInTheDocument())
    await fireEvent.click(screen.getByText('Add plant'))
    await expect(screen.getByPlaceholderText('Plant name')).toBeInTheDocument()
  })

  test('Adds a plant when all the input fields filled properly', async () => {
    await render(<PlantList changeSelectedPlant={null} plants={plants} fetchAgain={() => {}} selectedIndex={0} />)
    await waitFor(() => expect(screen.getByText('Add plant')).toBeInTheDocument())
    await fireEvent.click(screen.getByText('Add plant'))
    await expect(screen.getByPlaceholderText('Plant name')).toBeInTheDocument()
    await fireEvent.input(screen.getByPlaceholderText('Plant name'), { target: { value: 'test3' } })
    await fireEvent.input(screen.getByPlaceholderText('Nickname'), { target: { value: 'test3' } })
    await fireEvent.input(screen.getByPlaceholderText('Latin name'), { target: { value: 'test3' } })
    await fireEvent.input(screen.getByPlaceholderText( 'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8='), { target: { value: 'test3' } })
    await fireEvent.input(screen.getByLabelText('Min temperature (°C)'), { target: { value: '0' } })
    await fireEvent.input(screen.getByLabelText('Max temperature (°C)'), { target: { value: '0' } })
    await fireEvent.input(screen.getByLabelText('Min humidity (%)'), { target: { value: '0' } })
    await fireEvent.input(screen.getByLabelText('Max humidity (%)'), { target: { value: '0' } })
    await fireEvent.input(screen.getByLabelText('Min CO2 (g/m3)'), { target: { value: '0' } })
    await fireEvent.input(screen.getByLabelText('Max CO2 (g/m3)'), { target: { value: '0' } })
    await fireEvent.click(screen.getAllByText('Add plant')[1])
  })
})
