import http from "http";
import { Transform } from "node:stream";

// server => recebe os dados de pouco em pouco e vai tratando eles
// server2 => espera o carregamento de todos os dados para depois tratar eles

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed)

    // primeiro parâmetro é o erro (caso tenha ocorrido), segundo é o dado transformado
    callback(null, Buffer.from(transformed.toString()));
  }
}

// req => Readable Stream
// res => Writable Stream

const server = http.createServer((req, res) => {
  const buffers = [];

  return req.pipe(new InverseNumberStream()).pipe(res);
});

const server2 = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const transformedBuffers = buffers.map((buffer) => {
    const transformed = Number(buffer.toString()) * -1;

    return transformed;
  });


  /* const fullStreamContent = Buffer.concat(buffers).toString(); 
  console.log(fullStreamContent); */

  res.end(transformedBuffers.toString());
});

server.listen(3334);
server2.listen(3335);
