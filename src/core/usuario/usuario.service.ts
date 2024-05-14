import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  @InjectRepository(Usuario)
  private repository: Repository<Usuario>;

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const finded = await this.repository.findOne({
      where: { email: createUsuarioDto.email },
    });

    if (finded) {
      throw new HttpException(
        EMensagem.ImpossivelCadastrar,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const created = this.repository.create(createUsuarioDto);

    return await this.repository.save(created);
  }

  async findAll(page: number, size: number): Promise<Usuario[]> {
    page--;

    return await this.repository.find({
      loadEagerRelations: false,
      skip: size * page,
      take: size,
    });
  }

  async findOne(id: number): Promise<Usuario> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    if (id !== updateUsuarioDto.id) {
      throw new HttpException(
        EMensagem.IDsDiferentes,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const finded = await this.repository.findOne({
      select: ['id'],
      where: { email: updateUsuarioDto.email },
    });

    if (finded && finded.id !== id) {
      throw new HttpException(
        EMensagem.ImpossivelAlterar,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return await this.repository.save(updateUsuarioDto);
  }

  async unactivate(id: number): Promise<boolean> {
    const finded = await this.repository.findOne({ where: { id: id } });

    if (!finded) {
      throw new HttpException(
        EMensagem.ImpossivelDesativar,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    finded.ativo = false;

    return (await this.repository.save(finded)).ativo;
  }
}
