import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bem-vindo à API de Tarefas com NestJS! Acesse /tasks para gerenciar suas tarefas.';
  }
}
