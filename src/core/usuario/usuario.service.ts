import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EMensagem } from 'src/shared/enums/mensagem.enum';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
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

  // findAll() {
  //   return `This action returns all usuario`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} usuario`;
  // }

  // update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  //   return `This action updates a #${id} usuario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}
