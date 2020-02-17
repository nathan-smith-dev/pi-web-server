import express, { Request, Response, json, Express } from 'express'
import { GpioService } from './services/gpio.service';
export class Server {
  app: Express;

  constructor(private gpioService: GpioService) {
    this.app = express()
  }

  configureRoutes() {
    this.app.use(json());

    this.app.get('/', (req: Request, res: Response) => {
      res.set('Content-Type', 'text/html');
      res.send(new Buffer(`
      <div>
        <button onclick="function iife(){
          console.log('increment')
          fetch('http://172.20.10.5:5000/increment')
        };iife()">+</button>
        <button onclick="function iife(){
          console.log('decrement')
          fetch('http://172.20.10.5:5000/decrement')
        };iife()">-</button>
      </div>
      <script>
          window.addEventListener('keydown', event => {
            if(event.key === 'ArrowUp') {
              fetch('http://172.20.10.5:5000/increment')
            } else if(event.key === 'ArrowDown') {
              fetch('http://172.20.10.5:5000/decrement')
            }
          })
      </script>
      `));
      // this.gpioService.fadeIn(.5, 200);
    })

    this.app.get('/increment', (req: Request, res: Response) => {
      this.gpioService.incrementPin();
      res.send(200);
    })

    this.app.get('/decrement', (req: Request, res: Response) => {
      this.gpioService.decrementPin();
      res.send(200);
    })
  }

  listen() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  }

  start() {
    this.configureRoutes();
    this.listen();
  }
}