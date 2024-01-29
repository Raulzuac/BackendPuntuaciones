import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarios_reciclaje } from './entities/user-reciclaje.entity';
import { usuarios_fruta } from './entities/user-fruta.entity';


@Module({
  imports:[TypeOrmModule.forFeature([usuarios_fruta,usuarios_reciclaje])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
