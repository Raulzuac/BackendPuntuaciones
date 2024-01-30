import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

/**
 * Represents a user in the reciclaje ranking.
 * this is a table in the database
 */
@Entity()
export class usuarios_reciclaje extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ default: 0 })
  score: number;
}
