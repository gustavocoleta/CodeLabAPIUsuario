import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HttpResponse } from '../../shared/classes/http-reponse';
import { IResponse } from '../../shared/interfaces/response.interface';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<IResponse<Usuario>> {
    const data = await this.usuarioService.create(createUsuarioDto);

    return new HttpResponse<Usuario>(data).onCreated();
  }

  @Get(':page/:size')
  findAll(@Param('page') page: number, @Param('size') size: number) {
    return this.usuarioService.findAll(page, size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<IResponse<Usuario>> {
    const data = await this.usuarioService.update(+id, updateUsuarioDto);
    return new HttpResponse<Usuario>(data).onUpdate();
  }

  @Delete(':id')
  async unactivate(@Param('id') id: number): Promise<IResponse<boolean>> {
    const data = await this.usuarioService.unactivate(id);

    return new HttpResponse<boolean>(data).onUnactivated();
  }
}
