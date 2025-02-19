import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeveloperDto, UpdateDeveloperDto } from 'src/dtos';
import { Developer } from 'src/entities/developer';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DevelopersService {
  constructor(@InjectRepository(Developer) private DevelopersRepository: Repository<Developer>) {}

  async create(dto: CreateDeveloperDto) {
    const { email, password, clientId, clientSecret } = dto;
    const checkemail = await this.DevelopersRepository.findOne({ where: { email } });

    if (checkemail !== null) throw new ConflictException('이미 이메일이 등록되어 있습니다.');

    const hashPassword = await bcrypt.hash(password, 11);

    return await this.DevelopersRepository.save({ email, password: hashPassword, clientId, clientSecret });
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

  async remove(id: number) {
    try {
      const developer = await this.DevelopersRepository.findOneByOrFail({ id });
      return await this.DevelopersRepository.remove(developer);
    } catch {
      throw new NotFoundException('등록된 개발자가 아닙니다.');
    }
  }
}
