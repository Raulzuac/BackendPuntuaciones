import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class usuarios_fruta extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column({unique: true,nullable: false})
    name: string;

    @Column({default: 0})
    score: number;

}