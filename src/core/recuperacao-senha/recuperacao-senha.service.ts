import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateRecuperacaoSenhaDto } from './dto/create-recuperacao-senha.dto';
import { RecuperacaoSenha } from './entities/recuperacao-senha.entity';

@Injectable()
export class RecuperacaoSenhaService {
  @InjectRepository(RecuperacaoSenha)
  private repository: Repository<RecuperacaoSenha>;

  @InjectRepository(Usuario)
  private usuarioRepository: Repository<Usuario>;

  async create(
    createRecuperacaoSenhaDto: CreateRecuperacaoSenhaDto,
  ): Promise<void> {
    const findedUsuario = await this.usuarioRepository.findOne({
      select: ['id'],
      where: { email: createRecuperacaoSenhaDto.email },
    });

    if (findedUsuario) {
      await this.repository.delete({ email: createRecuperacaoSenhaDto.email });

      const created = this.repository.create(createRecuperacaoSenhaDto);

      this.repository.save(created);

      //TODO: enviar email
    }
  }
}
