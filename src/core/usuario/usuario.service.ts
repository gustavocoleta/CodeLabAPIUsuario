import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { handleFilter } from '../../shared/helpers/sql.helper';
import { IFindAllFilter } from '../../shared/interfaces/find-all-filter.interface';
import { IFindAllOrder } from '../../shared/interfaces/find-all-order.interface';
import { RecuperacaoSenha } from '../recuperacao-senha/entities/recuperacao-senha.entity';
import { AlterarSenhaUsuarioDto } from './dto/alterar-senha-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioPermissao } from './entities/usuario-permissao.entity';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  @InjectRepository(Usuario)
  private repository: Repository<Usuario>;

  @InjectRepository(UsuarioPermissao)
  private repositoryUsuarioPermissao: Repository<UsuarioPermissao>;

  @InjectRepository(RecuperacaoSenha)
  private repositoryRecuperacaoSenha: Repository<RecuperacaoSenha>;

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

    const usuario = new Usuario(createUsuarioDto);

    usuario.senha = bcrypt.hashSync(usuario.senha);

    const created = this.repository.create(usuario);

    return await this.repository.save(created);
  }

  async findAll(
    page: number,
    size: number,
    order: IFindAllOrder,
    filter?: IFindAllFilter | IFindAllFilter[],
  ): Promise<Usuario[]> {
    page--;

    const where = handleFilter(filter);

    return await this.repository.find({
      loadEagerRelations: false,
      order: { [order.column]: order.sort },
      where,
      skip: size * page,
      take: size,
    });
  }

  async findOne(id: number): Promise<Usuario> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findOneGrpc(id: number): Promise<Usuario> {
    const usuario = await this.repository.findOne({
      select: ['id', 'nome', 'email'],
      where: { id: id },
    });

    if (usuario) {
      return usuario;
    }

    return {} as unknown as Usuario;
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

    await this.repositoryUsuarioPermissao.delete({ idUsuario: id });

    for (const permissao in updateUsuarioDto.permissao) {
      Object.assign(updateUsuarioDto.permissao[permissao], { idUsuario: id });
    }

    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = bcrypt.hashSync(updateUsuarioDto.senha);
    }

    return await this.repository.save(updateUsuarioDto);
  }

  async alterarSenha(
    alterarSenhaUsuarioDto: AlterarSenhaUsuarioDto,
  ): Promise<boolean> {
    const findedToken = await this.repositoryRecuperacaoSenha.findOne({
      where: {
        email: alterarSenhaUsuarioDto.email,
        id: alterarSenhaUsuarioDto.token,
      },
    });

    if (!findedToken) {
      throw new HttpException(
        EMensagem.ImpossivelAlterar,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const msInHoras = 60 * 60 * 100;

    const diffInHoras =
      Math.abs(Number(new Date()) - Number(findedToken.dataCriacao)) /
      msInHoras;

    if (diffInHoras > 24) {
      throw new HttpException(
        EMensagem.TokenInvalido,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const usuario = await this.repository.findOne({
      where: { email: alterarSenhaUsuarioDto.email },
    });

    usuario.senha = bcrypt.hashSync(alterarSenhaUsuarioDto.senha);

    await this.repository.save(usuario);

    await this.repositoryRecuperacaoSenha.delete({ id: findedToken.id });

    return true;
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
