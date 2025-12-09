import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulo raiz da aplicação
// Importa todos os outros módulos da aplicação
@Module({
  imports: [
    // ConfigModule: Carrega variáveis de ambiente do arquivo .env
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis disponíveis globalmente
    }),

    // TypeOrmModule: Configura a conexão com o banco de dados
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // ATENÇÃO: Use apenas em desenvolvimento! Em produção use migrations
        logging: false, // Mude para true se quiser ver as queries SQL no console
      }),
      inject: [ConfigService],
    }),

    TasksModule,       // Módulo de tarefas
    CategoriesModule,  // Módulo de categorias
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
