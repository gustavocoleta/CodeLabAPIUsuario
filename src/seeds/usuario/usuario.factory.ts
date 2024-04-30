import { fakerPT_BR as faker } from '@faker-js/faker';
import { CreateUsuarioDto } from 'src/core/usuario/dto/create-usuario.dto';
import { Usuario } from 'src/core/usuario/entities/usuario.entity';
import { define } from 'typeorm-seeding';

define(Usuario, () => {
  const usuario = new CreateUsuarioDto();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  usuario.nome = `${firstName} ${lastName}`;
  usuario.email = faker.internet.email({ firstName, lastName }).toLowerCase();
  usuario.senha = faker.internet.password();
  usuario.ativo = true;
  usuario.admin = false;

  return new Usuario(usuario);
});
