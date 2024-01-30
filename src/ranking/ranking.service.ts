import { Injectable } from '@nestjs/common';
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
  ) {}

  /**
   * Creates a new reciclaje ranking entry.
   *
   * @param {string} name - The name of the user.
   * @param {number} score - The score of the user.
   * @returns {Promise<usuarios_reciclaje>} The new user.
   */
  async createReciclaje(name: string, score: number) {
    try {
      return await this.postScores(this.usersRepositoryReciclaje, name, score);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  /**
   * Creates a new fruta ranking entry.
   *
   * @param {string} name - The name of the user.
   * @param {number} score - The score of the user.
   * @returns {Promise<usuarios_fruta>} The new user.
   */
  async createFruta(name: string, score: number) {
    try {
      return await this.postScores(this.usersRepositoryFruta, name, score);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  /**
   * Creates a new ranking entry.
   *
   * @param {Repository<usuarios_reciclaje|usuarios_fruta>} repositorio - The repository to use.
   * @param {string} name - The name of the user.
   * @param {number} score - The score of the user.
   * @returns {Promise<usuarios_reciclaje|usuarios_fruta>} The new user.
   */

  async postScores(
    repositorio: Repository<usuarios_reciclaje | usuarios_fruta>,
    name: string,
    score: number,
  ): Promise<usuarios_reciclaje | usuarios_fruta> {
    try {
      if (name === undefined) {
        throw {
          status: 400,
          error: 'Name is required',
        };
      }
      if (name.trim().length < 3) {
        throw {
          status: 400,
          error: 'Name is too short (at least 3 characters)',
        };
      }

      const id = uuid();
      console.log(id);

      const fullName = name.replaceAll('_', ' ').toUpperCase().trim();
      const usarioAux = await repositorio.findOne({
        where: { name: fullName },
      });
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

  /**
   * Retrieves all records from the "usuarios_reciclaje" table in descending order of score.
   * @returns {Promise<usuarios_reciclaje[]>} The list of records.
   */
  async findAllReciclaje(): Promise<usuarios_reciclaje[]> {
    try {
      return await this.usersRepositoryReciclaje.find({
        order: { score: 'DESC' },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  /**
   * Retrieves all records from the "usuarios_fruta" table in descending order of score.
   * @returns {Promise<usuarios_fruta[]>} The list of records.
   */
  findAllFrutica(): Promise<usuarios_fruta[]> {
    try {
      return this.usersRepositoryFruta.find({ order: { score: 'DESC' } });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  findAll() {
    return {
      status: 501,
      message:
        'Not implemented. Contact with admin (wish you luck) <<SALCHICHON>>',
    };
  }

  findOne(id: number) {
    return {
      status: 501,
      message:
        'Not implemented. Contact with admin (wish you luck) <<SALCHICHON>>',
    };
  }

  update(id: number, updateRankingDto: UpdateRankingDto) {
    return {
      status: 501,
      message:
        'Not implemented. Contact with admin (wish you luck) <<SALCHICHON>>',
    };
  }

  remove(id: number) {
    return {
      status: 501,
      message:
        'Not implemented. Contact with admin (wish you luck) <<SALCHICHON>>',
    };
  }
}
