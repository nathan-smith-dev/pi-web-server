import { Gpio } from 'pigpio'

export class GpioService {
  ledPin: Gpio;

  constructor() {
    this.ledPin = new Gpio(21, { mode: Gpio.OUTPUT });
    this.ledPin.pwmWrite(0);
  }

  fadeIn(startingPercentage: number, delay: number) {
    let dutyCycle = Math.floor(startingPercentage * 255)
    setInterval(() => {
      this.ledPin.pwmWrite(dutyCycle);

      dutyCycle += 5;
      if (dutyCycle > 255) {
        dutyCycle = 0;
      }
    }, delay);
  }

  incrementPin() {
    const currentDutyCylce = this.ledPin.getPwmDutyCycle();
    const targetDutyCylce = currentDutyCylce + 5 < 255 ? currentDutyCylce + 5 : 255;
    console.log('targetDutyCylce: ', targetDutyCylce)
    this.ledPin.pwmWrite(targetDutyCylce)
  }

  decrementPin() {
    const currentDutyCylce = this.ledPin.getPwmDutyCycle();
    const targetDutyCylce = currentDutyCylce - 5 > 0 ? currentDutyCylce - 5 : 0;
    console.log('targetDutyCylce: ', targetDutyCylce)
    this.ledPin.pwmWrite(targetDutyCylce)
  }
}