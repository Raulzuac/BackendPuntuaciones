import { PartialType } from '@nestjs/mapped-types';
import { CreateRankingDto } from './create-ranking';

export class UpdateRankingDto extends PartialType(CreateRankingDto) {}
