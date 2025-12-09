import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controller para a rota raiz da API
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET / - Rota de boas-vindas
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  // GET /health - Verifica se a API está funcionando
  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'API está rodando normalmente',
    };
  }
}
