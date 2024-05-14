import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('criar um novo usuário', async () => {
      const createUsuarioDto = {
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: '123456',
        ativo: true,
        admin: false,
        permissao: [],
      };

      const mockUsuario = Object.assign(createUsuarioDto, { id: 1 });

      const spyRepositorySave = jest
        .spyOn(repository, 'save')
        .mockReturnValue(Promise.resolve(mockUsuario));

      const response = await service.create(createUsuarioDto);

      expect(response).toEqual(mockUsuario);
      expect(spyRepositorySave).toHaveBeenCalled();
    });

    it('lançar uma exceção ao repetir um email já cadastrado, quando criar um novo usuario', async () => {
      const mockUsuario = {
        id: 1,
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: '123456',
        ativo: true,
        admin: false,
        permissao: [],
      };

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockUsuario));

      try {
        await service.create(mockUsuario);
      } catch (error: any) {
        expect(error.message).toBe(EMensagem.ImpossivelCadastrar);
        expect(spyRepositoryFindOne).toHaveBeenCalled();
      }
    });
  });

  describe('findAll', () => {
    it('obter uma listagem de usuários', async () => {
      const mockUsuarioLista = [
        {
          id: 1,
          nome: 'Teste',
          email: 'teste@teste.com',
          senha: '123456',
          ativo: true,
          admin: false,
          permissao: [],
        },
      ];

      const spyRepositoryFind = jest
        .spyOn(repository, 'find')
        .mockReturnValue(Promise.resolve(mockUsuarioLista));

      const response = await service.findAll(1, 10);

      expect(response).toEqual(mockUsuarioLista);
      expect(spyRepositoryFind).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('obter um usuário', async () => {
      const mockUsuario = {
        id: 1,
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: '123456',
        ativo: true,
        admin: false,
        permissao: [],
      };

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockUsuario));

      const response = await service.findOne(1);

      expect(response).toEqual(mockUsuario);
      expect(spyRepositoryFindOne).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('alterar um usuário', async () => {
      const updateUsuarioDto = {
        id: 1,
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: '123456',
        ativo: true,
        admin: false,
        permissao: [],
      };

      const mockUsuario = Object.assign(updateUsuarioDto, {});

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockUsuario));

      const spyRepositorySave = jest
        .spyOn(repository, 'save')
        .mockReturnValue(Promise.resolve(mockUsuario));

      const response = await service.update(1, updateUsuarioDto);

      expect(response).toEqual(mockUsuario);
      expect(spyRepositoryFindOne).toHaveBeenCalled();
      expect(spyRepositorySave).toHaveBeenCalled();
    });

    it('lançar uma exceção ao enviar ids diferentes quando alterar um usuário', async () => {
      const updateUsuarioDto = {
        id: 1,
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: '123456',
        ativo: true,
        admin: false,
        permissao: [],
      };

      try {
        await service.update(999, updateUsuarioDto);
      } catch (error: any) {
        expect(error.message).toBe(EMensagem.IDsDiferentes);
      }
    });

    it('lançar uma exceção ao enviar um email previamente cadastrado quando alterar um usuário', async () => {
      const createUsuarioDto = {
        id: 1,
        nome: 'Teste',
        email: 'teste@teste.com',
        senha: '123456',
        ativo: true,
        admin: false,
        permissao: [],
      };

      const mockUsuarioFindOne = {
        id: 2,
        nome: 'Teste 2',
        email: 'teste2@teste2.com',
        senha: 'abcdef',
        ativo: true,
        admin: false,
        permissao: [],
      };

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockUsuarioFindOne));

      try {
        await service.update(1, createUsuarioDto);
      } catch (error: any) {
        expect(error.message).toBe(EMensagem.ImpossivelAlterar);
        expect(spyRepositoryFindOne).toHaveBeenCalled();
      }
    });
  });

  describe('unactivate', () => {
    it('desativar um usuário', async () => {
      const mockUsuarioFindOne = {
        id: 1,
        nome: 'Nome Teste',
        email: 'nome.teste@teste.com',
        senha: '123456',
        ativo: true,
        admin: true,
        permissao: [],
      };

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockUsuarioFindOne) as any);

      const mockUsuarioSave = Object.assign(mockUsuarioFindOne, {
        ativo: false,
      });

      const spyRepositorySave = jest
        .spyOn(repository, 'save')
        .mockReturnValue(Promise.resolve(mockUsuarioSave) as any);

      const response = await service.unactivate(1);

      expect(response).toEqual(false);
      expect(spyRepositoryFindOne).toHaveBeenCalled();
      expect(spyRepositorySave).toHaveBeenCalled();
    });

    it('lançar erro ao não encontrar o usuario usando o id quando alterar um usuario', async () => {
      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(null) as any);

      try {
        await service.unactivate(1);
      } catch (error: any) {
        expect(error.message).toBe(EMensagem.ImpossivelDesativar);
        expect(spyRepositoryFindOne).toHaveBeenCalled();
      }
    });
  });
});
