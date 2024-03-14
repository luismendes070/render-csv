// Gemini pages/api/[...nextapi].ts
import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'http-proxy-middleware';

const proxy = httpProxyMiddleware({
  target: 'http://localhost:3001/your-csv-route', // Replace with your server port
  pathRewrite: { '^/api': '' }, // Remove '/api' prefix from incoming requests
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxy(req, res);
}
