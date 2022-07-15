import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item as Model } from "src/item/models/item.model";
import { Item as Schema } from "../mysql/item.schema";
import { Repository } from "../repository.interface";
import { Repository as TypeormRepository } from 'typeorm';

@Injectable()
export class MysqlRepository extends Repository {
    constructor(@InjectRepository(Schema) private itemsRepository: TypeormRepository<Schema>) {
        super();
    }
    async create(item: Model): Promise<void> {
        this.itemsRepository.save(item);
    }
    async updateById(uuid: string, updatedItem: Model): Promise<void> {
        const item = await this.itemsRepository.findOne({ where: {uuid: uuid}});

        if(!item)
            throw new NotFoundException;
            
        await this.itemsRepository.update({ uuid: uuid}, updatedItem)
    }
    findAll(): Promise<Schema[]> {
        return this.itemsRepository.find();
    }
    async findById(uuid: string): Promise<Schema> {
        const item = await this.itemsRepository.findOne({ where: {uuid: uuid}});

        if(!item)
            throw new NotFoundException;
        
        return item;
    }
    async deleteById(uuid: string): Promise<void> {
        const item = await this.itemsRepository.findOne({ where: {uuid: uuid}});

        if(!item)
            throw new NotFoundException;

        await this.itemsRepository.delete({ uuid: uuid})
    }
    
}