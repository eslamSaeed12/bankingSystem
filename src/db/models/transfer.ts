import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Customer } from './customer';


@Entity('transfers')
export class Trasnfer {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(type => Customer)
    @JoinColumn({ name: 'senderId' })
    sender!: Customer;

    @OneToOne(type => Customer)
    @JoinColumn({ name: 'receiverId' })
    receiver!: Customer;

    @Column('double precision', { nullable: false })
    amount!: number;

}
