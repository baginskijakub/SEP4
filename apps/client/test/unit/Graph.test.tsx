import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Graph } from '../../components/graph/Graph';
import { IGraphData } from '@sep4/types'
import * as PlantService from '../../services/PlantService';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../client/services/PlantService')

window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  describe("Graph component", () => {

    describe('getGraph', () => {
        it('should return the graph when successful', async () => {
          // Arrange
          const sampleData: IGraphData = {
            type: 'temperature',
            data: [
              { date: '2022-01-01', value: 10 },
              { date: '2022-01-02', value: 20 },
              { date: '2022-01-03', value: 30 },
            ]
          }

          jest.spyOn(PlantService, 'getPlantEnvironmentHistory').mockResolvedValue(sampleData as IGraphData);
          //Act
          const { container } = render(<Graph id={1} type="temperature" />);
          await waitFor(() => expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument());

          // Assert
          expect(PlantService.getPlantEnvironmentHistory).toHaveBeenCalledTimes(1);


        });

      });



})
