import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    try {
      return 'Hello World!';
    } catch (error) {
      console.log('AppService.getHello error:', error);
      throw error;
    }
  }
}
