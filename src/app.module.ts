import { Module } from '@nestjs/common';
import { RankingModule } from './ranking/ranking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarios_reciclaje } from './ranking/entities/user-reciclaje.entity';
import { usuarios_fruta } from './ranking/entities/user-fruta.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    RankingModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      synchronize: true,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [usuarios_fruta,usuarios_reciclaje]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
