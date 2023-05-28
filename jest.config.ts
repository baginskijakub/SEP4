import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  testEnvironment: 'jest-environment-jsdom',
};
