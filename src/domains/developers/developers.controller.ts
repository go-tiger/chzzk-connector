import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto, LoginDeveloperDto, UpdateDeveloperDto } from 'src/dtos';
import { GetDeveloperId } from 'src/commons/get-developer-id.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post('signup')
  create(@Body() dto: CreateDeveloperDto) {
    return this.developersService.create(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDeveloperDto) {
    return this.developersService.login(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findOne(@GetDeveloperId() developerId: number) {
    return this.developersService.findOne(developerId);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(@GetDeveloperId() developerId: number, @Body() dto: UpdateDeveloperDto) {
    return this.developersService.update(developerId, dto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  remove(@GetDeveloperId() developerId: number) {
    return this.developersService.remove(developerId);
  }
}
