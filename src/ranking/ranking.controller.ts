import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post('/fruta')
  async createFruta(@Request() {query}) {
    try{
      let {name,score} = query;
      //Cambiamos la coma por un punto para que sea un número
      score=score.replace(',','.');
      
      if(score === undefined){
        throw {
          status:400,
          error:'Score is required'
        }
      }
      if(Number.isNaN(Number(score))){
        return {
          ok:false,
          status:400,
          error:'Score is not a number'
        };
      }
      const newUser =await this.rankingService.createFruta(name,Number(score));
      console.log(newUser);
      
      return {
        ok:true,
        status:200,
        'User':newUser
      };
      
      
    }catch(err){
      //si score no era un número
      console.log(err);
      return {
        status:err.status,
        error:err.message
      }
    }
  }
  @Post('/reciclaje')
  async createReciclaje(@Request() {query}) {
    try{
      
      let {name,score} = query;
      //Cambiamos la coma por un punto para que sea un número
      score=score.replace(',','.');
      
      if(score === undefined){
        throw {
          status:400,
          error:'Score is required'
        }
      }
      if(Number.isNaN(Number(score))){
        return {
          ok:false,
          error:'Score is not a number'
        };
      }
      const newUser =await this.rankingService.createReciclaje(name,Number(score));
      console.log(newUser);

      if(newUser.status === 400){
        return newUser;
      }

      return {
        ok:true,
        status:200,
        'User':newUser
      };
      
      
    }catch(err){
      //si score no era un número
      console.log(err);
      return {
        status:err.status,
        error:err.message
      }
    }
  }

  @Get('/fruta')
  findAll() {
    return this.rankingService.findAllFrutica();
  }
  
  @Get('/reciclaje')
  findAllReciclaje() {
    return this.rankingService.findAllReciclaje();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    
    return this.rankingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
    console.log(id);
    
    return this.rankingService.update(+id, updateRankingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rankingService.remove(+id);
  }
}
