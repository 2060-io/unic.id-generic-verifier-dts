/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("A client connected info is:", socket.id);

    socket.on("presentationEvent", (data) => {
      console.log("socket presentationEvent:", data);
      io.to(data.ref).emit("presentationEventMessage", data);
    });

    socket.on("error", (error) => {
      console.log("A server error has occurred", error);
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });

  const PORT = process.env.NEXT_PUBLIC_PORT
    ? Number(process.env.NEXT_PUBLIC_PORT)
    : 3000;

  const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}`
    : `http://localhost:${PORT}`;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${PUBLIC_BASE_URL}`);
  });
});
