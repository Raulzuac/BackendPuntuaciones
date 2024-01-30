import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

/**
 * Represents a user in the fruta ranking.
 * this is a table in the database
 */
@Entity()
export class usuarios_fruta extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ default: 0 })
  score: number;
}
