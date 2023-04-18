import express from 'express';
import prisma from '../helperFunctions/setupPrisma';

//I didn't know if I should put this in plants controller or not
//so I created new controller
const plantsRouter = express.Router();

//POST
plantsRouter.post('/', async (req, res) => {
  const { name, description, image, latinName, username } = req.body;
  try {
    const plant = await prisma.plant.create(name);
    res.status(201).json({ message: 'Plant successfully created', plant });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create plant', status: 'error' });
  }
});

//GET all plants assigned to the usrer
plantsRouter.get('/', async (req, res) => {
  const { username } = req.query;
  try {
    const plants = await prisma.plant.findMany({ where: { username: username as string } });
    res.status(200).json({ message: 'Plants fetched successfully', plants });
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch plants', status: 'error' });
  }
});

//GET the plant after id
plantsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const plant = await prisma.plant.findUnique({ where: { id: parseInt(id) } });
    if (!plant) {
      res.status(404).json({ message: 'Plant not found', status: 'error'});
    } else {
      res.status(200).json({ message: 'Plant fetched successfully', plant });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch plant', status: 'error' });
  }
});

//PATCH
plantsRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, image, latinName } = req.body;
  try {
    const plant = await prisma.plant.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        image,
        latinName,
      },
    });
    res.status(200).json({ message: 'Plant updated successfully', plant });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update plant', status: 'error'});
  }
});

//REMOVE
plantsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.plant.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete plant', status: 'error' });
  }
});

export default plantsRouter;
