import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePlant } from '../components/plant/createPlant/CreatePlant';
import '@testing-library/jest-dom'

describe("<CreatePlant />", () => {
    test("renders createPlant component", () => {
        render(<CreatePlant onClose={null} mode='create'/>)

        expect(screen.getByPlaceholderText(/Plant Nickname/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Plant name/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Latin name/i)).toBeInTheDocument()
       
        expect(screen.getByText(/Min temperature/i)).toBeInTheDocument()
        expect(screen.getByText(/Max temperature/i)).toBeInTheDocument()
        expect(screen.getByText(/Min humidity/i)).toBeInTheDocument()
        expect(screen.getByText(/Max humidity/i)).toBeInTheDocument()
        expect(screen.getByText(/Min CO2/i)).toBeInTheDocument()
        expect(screen.getByText(/Max CO2/i)).toBeInTheDocument()
        
        expect(screen.getByText(/Add Plant/i)).toBeInTheDocument()   
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument() 
    })

    test("renders error message when input is empty", async () => {
        render(<CreatePlant onClose={null} mode='create'/>)

        const nicknameInput = screen.getByPlaceholderText(/Plant nickname/i)
        const nameInput = screen.getByPlaceholderText(/Plant name/i)
        const latinNameInput = screen.getByPlaceholderText(/Latin name/i)


        await fireEvent.input(nicknameInput, {target: {value: ''}})
        await fireEvent.input(nameInput, {target: {value: ''}})
        await fireEvent.input(latinNameInput, {target: {value: ''}})
        await fireEvent.click(screen.getByText(/Add Plant/i))

        expect(await screen.findByText("Please fill in all the fields")).toBeInTheDocument()
        await fireEvent.input(nicknameInput, {target: {value: 'hehe'}})
        await fireEvent.input(nameInput, {target: {value: 'hehe'}})
        

        expect(await screen.findByText("Please fill in all the fields")).toBeInTheDocument()    
       
        await fireEvent.input(latinNameInput, {target: {value: 'hehe'}})
        await fireEvent.input(nameInput, {target: {value: 'hehe'}})
        await fireEvent.input(nicknameInput, {target: {value: ''}})
       

        expect(await screen.findByText("Please fill in all the fields")).toBeInTheDocument()    
  
        await fireEvent.input(latinNameInput, {target: {value: 'hehe'}})
        await fireEvent.input(nameInput, {target: {value: ''}})
        await fireEvent.input(nicknameInput, {target: {value: 'hehe'}})
       

        expect(await screen.findByText("Please fill in all the fields")).toBeInTheDocument()    
  
    })
})

