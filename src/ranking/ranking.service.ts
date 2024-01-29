import { Inject, Injectable } from '@nestjs/common';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { usuarios_reciclaje } from './entities/user-reciclaje.entity';
import { usuarios_fruta } from './entities/user-fruta.entity';
const { v4: uuid } = require('uuid');

@Injectable()
export class RankingService {
 

  constructor(
    @InjectRepository(usuarios_fruta)
    private usersRepositoryFruta: Repository<usuarios_fruta>,
    @InjectRepository(usuarios_reciclaje)
    private usersRepositoryReciclaje: Repository<usuarios_reciclaje>,
  ) {

  }

  async createReciclaje(name: string, score: number) {
    try {
      return await this.postScores(this.usersRepositoryReciclaje,name,score);
    } catch (err) {
      
      console.log(err);
      return err;
    }
  }
  async createFruta(name: string, score: number) {
    try {
      return await this.postScores(this.usersRepositoryFruta,name,score);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async postScores(repositorio:Repository<usuarios_reciclaje|usuarios_fruta>,name: string, score: number){
  
    try {
      
      if(name === undefined){
        throw {
          status:400,
          error:'Name is required'
        }
      }
      if(name.length < 3){
        throw {
          status:400,
          error:'Name is too short (at least 3 characters)'
        }
      }

      const id = uuid();
      console.log(id);

      const fullName = name.replaceAll('_', ' ').toUpperCase().trim();
      const usarioAux = await repositorio.findOne({ where: { name: fullName } });
      if (usarioAux) {
        usarioAux.score += Number(score);
        await repositorio.save(usarioAux);
        console.log(usarioAux);
        return usarioAux;
      }
      const newUser = repositorio.create({ id, name: fullName, score: score });
      await repositorio.save(newUser);
      console.log(newUser);
      
      return newUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAllReciclaje() {
    try {
      return await this.usersRepositoryReciclaje.find({ order: { score: 'DESC' } });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  findAllFrutica() {
    try {
      return this.usersRepositoryFruta.find({ order: { score: 'DESC' } });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  


  findAll() {
  return {
    status:501,
    message: 'Not implemented. Contact with admin (wish you luck) <<SALCHICHON>>'
  }
  }

  findOne(id: number) {
  return {
    status:501,
    message: 'Not implemented. Contact with admin (wish you luck) <<SALCHICHON>>'
  }
  }

  update(id: number, updateRankingDto: UpdateRankingDto) {
  return {
    status:501,
    message: 'Not implemented. Contact with admin (wish you luck) <<SALCHICHON>>'
  }
  }

  remove(id: number) {
  return {
    status:501,
    message: 'Not implemented. Contact with admin (wish you luck) <<SALCHICHON>>'
  }
  }
}
