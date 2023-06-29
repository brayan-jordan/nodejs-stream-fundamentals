# nodejs-stream-fundamentals
Projeto utilizado para entender como funciona o conceito de Stream's por baixo dos panos em NodeJS.

(As requisições de stream, ou simplesmente streams, são solicitações de dados contínuos enviadas de um cliente para um servidor ou de um servidor para um cliente. Elas são usadas para transmitir informações em tempo real, sem a necessidade de esperar pela conclusão de uma solicitação anterior).

Nesse projeto criei 2 servidores com 1 requisição cada, a requisição de um dos servidores vai tratando os dados de acordo com o recebimento em pequenas parcelas (supondo que o cliente está enviando muitos dados) e o outro servidor espera o recebimento de todos os dados para começar o tratamento.

## Bora ver isso funcionando?

```bash
# entrar na pasta que está armazenado os arquivos 
$ cd streams/

# subir os 2 servidores (porta 3334 e 3335)
$ node stream-http-server.js

# visualizar o funcionamento através dos consoles (fazer mock de supostas requisições de clientes)
$ node fake-upload-to-http-stream.js