import { config } from 'dotenv'
import { Server } from './server';
import { GpioService } from './services/gpio.service'
config();

const gpioService = new GpioService();
const server = new Server(gpioService);
server.start();