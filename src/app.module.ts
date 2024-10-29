import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todoList/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todoList/todo.entity';
import { authModule } from './auth/auth.module';
import { User } from './auth/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_todo',
      entities: [Todo, User],
      synchronize: true,
  }),
    TodoModule,
    authModule
  ],
})
export class AppModule {}
