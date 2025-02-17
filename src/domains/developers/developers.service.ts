import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeveloperDto, UpdateDeveloperDto } from 'src/dtos';
import { Developer } from 'src/entities/developer';
import { Repository } from 'typeorm';

@Injectable()
export class DevelopersService {
  constructor(@InjectRepository(Developer) private DeveloperSRepository: Repository<Developer>) {}

  async create(dto: CreateDeveloperDto) {
    return await this.DeveloperSRepository.save({ clientId: dto.clientId, clientSecret: dto.clientSecret });
  }

  findAll() {
    return `This action returns all developers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} developer`;
  }

  update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    return `This action updates a #${id} developer`;
  }

  remove(id: number) {
    return `This action removes a #${id} developer`;
  }
}
