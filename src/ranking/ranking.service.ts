import { Injectable } from '@nestjs/common';
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
  /**
   * Deletes a user from the "usuarios_reciclaje" table.
   *
   * @param {string} id - The id of the user to delete.
   * @returns {Promise<Object>} The status of the operation.
   */
  deleteUserFruta(id: string) {
    try {
      return this.usersRepositoryFruta.delete({ id });
    } catch (err) {
      return {
        status: err.status,
        error: err.message,
      };
    }
  }

  /**
   * Deletes a user from the "usuarios_fruta" table.
   *
   * @param {string} id - The id of the user to delete.
   * @returns {Promise<Object>} The status of the operation (200 if ok)
   */
  findOneUserFruta(id: string) {
    try {
      const user = this.usersRepositoryFruta.findOne({ where: { id } });
      return {
        status: 200,
        user: user,
      };
    } catch (err) {
      return {
        status: err.status,
        error: err.message,
      };
    }
  }

  /**
   * Deletes a user from the "usuarios_reciclaje" table.
   *
   * @param {string} id - The id of the user to delete.
   * @returns {Promise<Object>} The status of the operation.
   */
  findOneUserReciclaje(id: string) {
    try {
      return this.usersRepositoryReciclaje.findOne({ where: { id } });
    } catch (err) {
      return {
        status: err.status,
        error: err.message,
      };
    }
  }

  /**
   * Deletes a user from the "usuarios_reciclaje" table.
   *
   * @param {string} id - The id of the user to delete.
   * @returns {Promise<Object>} The status of the operation.
   */
  deleteUserReciclaje(id: string) {
    try {
      return this.usersRepositoryReciclaje.delete({ id });
    } catch (err) {
      return {
        status: err.status,
        error: err.message,
      };
    }
  }

  /**
   * Deletes all users from the "usuarios_reciclaje" table.
   * @returns {Promise<Object>} The status of the operation.
   */
  deleteAllFrutica() {
    try {
      this.usersRepositoryFruta.clear();
      return {
        status: 200,
        message: 'All users deleted from the fruta ranking',
      };
    } catch (err) {
      return {
        status: err.status,
        error: err.message,
      };
    }
  }

  /**
   * Deletes all users from the "usuarios_reciclaje" table.
   * @returns {Promise<Object>} The status of the operation.
   */
  deleteAllReciclaje() {
    try {
      this.usersRepositoryReciclaje.clear();
      return {
        status: 200,
        message: 'All users deleted from the reciclaje ranking',
      };
    } catch (err) {
      return {
        status: err.status,
        error: err.message,
      };
    }
  }
}
