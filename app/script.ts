import { PrismaClient } from '@prisma/client'
import * as http from 'http';

const prisma = new PrismaClient()

async function main() {
  const data = await prisma.users.findMany();
  console.log(data);
  return data; // Return the data
}

const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.url === '/') {
    try {
      const data = await main();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ data }));
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});