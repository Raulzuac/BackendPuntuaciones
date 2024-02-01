import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { get } from 'http';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  /**
   * Creates a new fruta ranking entry.
   *
   * @param {Request} request - The request object containing name and score.
   * @returns {Promise<Object>} - A promise that resolves to an object with the status and the new user.
   */
  @Get('/masfruta')
  async createFruta(@Request() { query }) {
    try {
      let { name, score } = query;
      //Cambiamos la coma por un punto para que sea un número
      score = score.replace(',', '.');

      if (score === undefined) {
        throw {
          status: 400,
          error: 'Score is required',
        };
      }
      if (Number.isNaN(Number(score))) {
        return {
          ok: false,
          status: 400,
          error: 'Score is not a number',
        };
      }
      const newUser = await this.rankingService.createFruta(
        name,
        Number(score),
      );
      console.log(newUser);

      return {
        ok: true,
        status: 200,
        User: newUser,
      };
    } catch (err) {
      //si score no era un número
      console.log(err);
      return {
        status: err.status,
        error: err.message,
      };
    }
  }

  /**
   * Creates a new reciclaje ranking entry.
   *
   * @param {Request} request - The request object containing  name and score.
   * @returns {Promise<Object>} - A promise that resolves to an object with the status and the new user.
   */
  @Get('/masreciclaje')
  async createReciclaje(@Request() { query }) {
    try {
      let { name, score } = query;
      //Cambiamos la coma por un punto para que sea un número
      score = score.replace(',', '.');

      if (score === undefined) {
        throw {
          status: 400,
          error: 'Score is required',
        };
      }
      if (Number.isNaN(Number(score))) {
        return {
          ok: false,
          error: 'Score is not a number',
        };
      }
      const newUser = await this.rankingService.createReciclaje(
        name,
        Number(score),
      );
      console.log(newUser);

      if (newUser.status === 400) {
        return newUser;
      }

      return {
        ok: true,
        status: 200,
        User: newUser,
      };
    } catch (err) {
      //si score no era un número
      console.log(err);
      return {
        status: err.status,
        error: err.message,
      };
    }
  }

  /**
   * Get users from the fruta ranking.
   * @param {Request} request - The request object containing the id of the user to delete.
   * @returns {Promise<Object>} - A promise that resolves to an object with the status of the operation.
   **/

  @Get('/fruta')
  findAll() {
    return this.rankingService.findAllFrutica();
  }

  /**
   * Get users from the fruta ranking.
   * @param {Request} request - The request object containing the id of the user to delete.
   * @returns {Promise<Object>} - A promise that resolves to an object with the status of the operation.
   **/
  @Get('/reciclaje')
  findAllReciclaje() {
    return this.rankingService.findAllReciclaje();
  }

  /**
   * Deletes a user from the reciclaje ranking.
   * @param {Request} request - The request object containing the id of the user to delete.
   * @returns {Promise<Object>} - A promise that resolves to an object with the status of the operation.
   */

  @Delete('/fruta/:id')
  deleteUserFruta(@Request() { params }) {
    const user = this.rankingService.findOneUserFruta(params.id);
    if (user.status !== 200) {
      return user;
    } else {
      return this.rankingService.deleteUserFruta(params.id);
    }
  }

  /**
   * Deletes a user from the fruta ranking.
   * @param {Request} request - The request object containing the id of the user to delete.
   * @returns {Promise<Object>} - A promise that resolves to an object with the status of the operation.
   */
  @Delete('/fruta')
  deleteAllFrutica() {
    return this.rankingService.deleteAllFrutica();
  }

  /**
   * Deletes a user from the reciclaje ranking.
   * @param {Request} request - The request object containing the id of the user to delete.
   * @returns {Promise<Object>} - A promise that resolves to an object with the status of the operation.
   */
  @Delete('/reciclaje')
  deleteAllReciclaje() {
    return this.rankingService.deleteAllReciclaje();
  }


}
