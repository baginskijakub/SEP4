import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { server } from "../mocks/server.js";
import { TaskList } from "../../components/task/taskList/TaskList";

describe('<TaskList />', () => {
  beforeAll(() => {
    server.listen()
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    })
  })

  test('Renders add plant modal when add button clicked', async () => {
    await render(<TaskList />)
    await waitFor(() => expect(screen.getByText('Add task')).toBeInTheDocument())
    await fireEvent.click(screen.getByText('Add task'))
    await expect(screen.getAllByText('Create task')[0]).toBeInTheDocument()
  })

  test('Adds a task when all the input fields filled properly', async () => {
    await render(<TaskList/>)
    await waitFor(() => expect(screen.getByText('Add task')).toBeInTheDocument())
    await fireEvent.click(screen.getByText('Add task'))
    await expect(screen.getAllByText('Create task')[0]).toBeInTheDocument()
    await fireEvent.click(screen.getAllByText('Create task')[1])
    await expect(screen.getByText('Tasks')).toBeInTheDocument()
  })
})
