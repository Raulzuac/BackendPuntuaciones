import { Module } from '@nestjs/common';
import { RankingModule } from './ranking/ranking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarios_reciclaje } from './ranking/entities/user-reciclaje.entity';
import { usuarios_fruta } from './ranking/entities/user-fruta.entity';

@Module({
  imports: [
    RankingModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      synchronize: true,
      username: 'root',
      password: 'root',
      database: 'ranking',
      entities: [usuarios_fruta,usuarios_reciclaje]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
