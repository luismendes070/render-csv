// ChatGPT
import https from 'https'; // Import the 'https' module
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const postData = JSON.stringify({
    'msg': 'Hello World!',
  });

  const options = {
    hostname: 'www.google.com',
    port: 443, // Use port 443 for HTTPS
    path: '/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const request = https.request(options, (response) => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    response.on('end', () => {
      console.log('No more data in response.');
    });
  });

  request.on('error', (error) => {
    console.error(`Problem with request: ${error.message}`);
  });

  // Write data to the request body
  request.write(postData);
  request.end();
}
