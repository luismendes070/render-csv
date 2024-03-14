// ChatGPT prompt solution for maximum call stack
import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "http-proxy-middleware";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const proxy = httpProxyMiddleware({
      target: "http://localhost:3001/your-csv-route", // Replace with your server port
      pathRewrite: { "^/api": "" }, // Remove '/api' prefix from incoming requests
    });

    // Check if the request should be handled by the proxy
    if (req.url.startsWith("/api")) {
      proxy(req, res); // Forward the request to the proxy
    } else {
      // Handle other requests here
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error: any) {
    console.error("Proxy error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
