import * as PlantService from '../../client/services/PlantService'

jest.mock('../../client/services/PlantService')

describe("Remove plant component", () => {

    describe('getPlantById', () => {
        it('should return the plant when successful', async () => {
          // Arrange
          const plant = {
            id: 1,
            name: 'test plant',
            nickName: 'test nick name',
            latinName: 'test latin name',
            image: 'test image',
            idealEnvironment: {
              minTemperature: 10,
              maxTemperature: 30,
              minHumidity: 20,
              maxHumidity: 50,
              minCo2: 200,
              maxCo2: 800
            },
            currentEnvironment: {
              temperature: 20,
              co2: 400,
              humidity: 40
            }
          };
          const expectedPlant = { ...plant };

          jest.spyOn(PlantService, 'getPlantById').mockResolvedValue(plant);

          // Act
          const result = await PlantService.getPlantById(1);

          // Assert
          expect(result).toEqual(expectedPlant);
          expect(PlantService.getPlantById).toHaveBeenCalledTimes(1);
        });

      });



})
