import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity('customers')
export class Customer {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { unique: true })
    name!: string;

    @Column('varchar', { nullable: false })
    email!: string;

    @Column('double precision', { default: 0 })
    balance!: number;
}

