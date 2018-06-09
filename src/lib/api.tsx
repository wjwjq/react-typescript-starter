import axios, { IPostedData } from './axios';

export const user = {
  get() {
    // return axios.get('/api/user');
    return getUserMockData();
  },

  del(data: IPostedData) {
    return axios.del('/api/user', data);
  }
};

interface Response {
  status?: number | string;
  message?: string;
  results: any[];
}

function getUserMockData(): Promise<Response> {
  return new Promise((resolve) => {
    window.setTimeout(resolve(createUserMockData()), 1500);
  });
}

function createUserMockData(): Response {
  const users = new Array(Math.floor(Math.random() * 30 + 1))
    .fill('')
    .map((val, idx) => ({
      _id: `Edward King ${idx}`,
      name: `Edward King ${idx}`,
      age: 32,
      address: `London, Park Lane no. ${idx}`
    }));

  return {
    status: 200,
    results: users,
    message: '加载成功'
  };
}
