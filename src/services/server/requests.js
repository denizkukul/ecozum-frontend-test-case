import { server, endpoints } from './server';

// MockData Imports
import mockPackages from './mockData/packages';
import mockTerms from './mockData/terms';

// This is needed to simulate async api communication
// If api is working this can be removed and server requests can be used instead
const mockAPI = {
  postUser: (args) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { ...args, id: 1 } })
      }, 800);
    });
  },
  getPackages: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockPackages })
      }, 800);
    });
  },
  postPayment: (args) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: args })
      }, 800);
    });
  },
  getTerms: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockTerms })
      }, 100);
    });
  }
}

// Commented lines below are for the real api
export const postUser = (data) => {
  // return server.post(endpoints.signup, data);
  return mockAPI.postUser(data);
}

export const getPackages = () => {
  // return server.get(endpoints.packages);
  return mockAPI.getPackages();
}

export const postPayment = (data) => {
  // return server.post(endpoints.payment, data);
  return mockAPI.postPayment(data);
}

export const getTerms = () => {
  // return server.get(endpoints.payment);
  return mockAPI.getTerms();
}

