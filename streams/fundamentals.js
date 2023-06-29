// exemplo mais básico possível da implementação de uma stream que lê dados e outra que escreve dados

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        // this.push(null) indica que não há mais dados para serem lidos dentro dessa stream (foi encerrada)
        this.push(null);
      } else {
        // necessário converter para Buffer pois as Readable's streams só aceitam dados do tipo Buffer
        const buf = Buffer.from(i.toString());

        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    // primeiro parâmetro é o erro (caso tenha ocorrido), segundo é o dado transformado
    callback(null, Buffer.from(transformed.toString()));
  }
}

class MultipleByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultipleByTenStream());
