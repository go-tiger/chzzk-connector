import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeveloperDto, DeveloperResDto, LoginDeveloperDto, UpdateDeveloperDto } from 'src/dtos';
import { Developer } from 'src/entities/developer';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer) private DevelopersRepository: Repository<Developer>,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateDeveloperDto) {
    const { email, password, clientId, clientSecret } = dto;
    const checkemail = await this.DevelopersRepository.findOne({ where: { email } });

    if (checkemail !== null) throw new ConflictException('이미 이메일이 등록되어 있습니다.');

    const hashPassword = await bcrypt.hash(password, 11);

    const developer = await this.DevelopersRepository.save({ email, password: hashPassword, clientId, clientSecret });
    return plainToInstance(DeveloperResDto, developer, { excludeExtraneousValues: true });
  }

  async login(dto: LoginDeveloperDto) {
    const { email, password } = dto;
    const userData = await this.DevelopersRepository.findOne({ where: { email } });

    if (userData && (await bcrypt.compare(password, userData.password))) {
      const payload = { id: userData.id };
      return { accessToken: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }

  async findOne(id: number) {
    try {
      const developer = await this.DevelopersRepository.findOneByOrFail({ id });
      return plainToInstance(DeveloperResDto, developer, { excludeExtraneousValues: true });
    } catch {
      throw new NotFoundException('등록된 개발자가 아닙니다.');
    }
  }

  async update(id: number, dto: UpdateDeveloperDto) {
    try {
      const developer = await this.DevelopersRepository.findOneByOrFail({ id });

      if (dto.password) dto.password = await bcrypt.hash(dto.password, 11);

      Object.assign(developer, dto);
      const updateDeveloper = await this.DevelopersRepository.save(developer);
      return plainToInstance(DeveloperResDto, updateDeveloper, { excludeExtraneousValues: true });
    } catch {
      throw new NotFoundException('등록된 개발자가 아닙니다.');
    }
  }

  async remove(id: number) {
    try {
      const developer = await this.DevelopersRepository.findOneByOrFail({ id });
      await this.DevelopersRepository.remove(developer);
      return '삭제되었습니다.';
    } catch {
      throw new NotFoundException('등록된 개발자가 아닙니다.');
    }
  }
}
