import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Customer } from './customer';


@Entity('transfers')
export class Trasnfer {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(type => Customer)
    @JoinColumn()
    senderId!: number;

    @OneToOne(type => Customer)
    @JoinColumn()
    receiverId!: number;
    @Column('double precision', { nullable: false })
    amount!: number;

}
