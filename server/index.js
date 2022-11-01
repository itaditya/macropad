const http = require('http');
const url = require('url');
const { keyboard, Key } = require("@nut-tree/nut-js");

async function macroHandler(context, _req, res) {
  const { i } = context;
  const index = Number(i);
  if (typeof index !== 'number' || index < 1 || index > 6) {
    res.writeHead(500);
    res.end('index has to be 1-6');
    return;
  }
  console.log('run macro', index);
  const numKey = 35 + index;
  await keyboard.type(Key.LeftAlt, numKey);
  res.writeHead(200);
  res.end('macro ran successfully!');
}

async function numHandler(context, _req, res) {
  const { i } = context;
  const index = Number(i);
  if (typeof index !== 'number' || index < 0 || index > 9) {
    res.writeHead(500);
    res.end('index has to be 0-9');
    return;
  }
  console.log('run num', index);
  const numKey = 102 + index;
  await keyboard.type(numKey);
  res.writeHead(200);
  res.end('macro ran successfully!');
}

const actionHandlers = new Map([
  ['macro', macroHandler],
  ['num', numHandler],
]);

async function requestListener(req, res) {
  const { query, pathname } = url.parse(req.url, true);
  console.log(req.method, pathname, query);

  const action = pathname.substring(1);
  const handler = actionHandlers.get(action);

  if (!handler) {
    res.writeHead(404, 'Action not found');
    res.end();
    return;
  }

  const context = {
    ...query,
  }
  handler(context, req, res);
}

const server = http.createServer(requestListener);
server.listen(8922);
