import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeveloperDto, UpdateDeveloperDto } from 'src/dtos';
import { Developer } from 'src/entities/developer';
import { Repository } from 'typeorm';

@Injectable()
export class DevelopersService {
  constructor(@InjectRepository(Developer) private DevelopersRepository: Repository<Developer>) {}

  async create(dto: CreateDeveloperDto) {
    return await this.DevelopersRepository.save({ clientId: dto.clientId, clientSecret: dto.clientSecret });
  }

  async findOne(id: number) {
    try {
      return await this.DevelopersRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException('등록된 개발자가 아닙니다.');
    }
  }

  async update(id: number, dto: UpdateDeveloperDto) {
    try {
      const developer = await this.DevelopersRepository.findOneByOrFail({ id });
      Object.assign(developer, dto);
      return await this.DevelopersRepository.save(developer);
    } catch {
      throw new NotFoundException('등록된 개발자가 아닙니다.');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} developer`;
  }
}
