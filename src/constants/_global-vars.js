let isDev = true;

export const BASE_URL = isDev
  ? "http://localhost:3001/api"
  : "http://ec2-52-4-10-165.compute-1.amazonaws.com:3001/api";
