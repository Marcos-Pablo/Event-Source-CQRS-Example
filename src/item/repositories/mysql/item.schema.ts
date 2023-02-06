import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IItemSchema } from '@item/repositories/item.schema.interface';

@Entity()
export class Item implements IItemSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    cost: number;

    @CreateDateColumn({ nullable: true })
    deletedAt: Date | null;
}
