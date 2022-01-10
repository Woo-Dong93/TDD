import server from "./server";

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`server is listening at localhost:${PORT}`);
});
