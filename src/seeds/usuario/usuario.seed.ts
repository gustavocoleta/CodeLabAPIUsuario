import { Usuario } from 'src/core/usuario/entities/usuario.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export class UsuarioSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    await factory(Usuario)().createMany(10);
  }
}
