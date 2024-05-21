import { Test, TestingModule } from '@nestjs/testing';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            unactivate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('criar um novo usuário', async () => {
      const createUsuarioDto = {
        nome: 'Teste',
        email: 'teste@teste.com.br',
        senha: '12345678',
        ativo: true,
        admin: false,
        permissao: [],
      };

      const mockUsuario = Object.assign(createUsuarioDto, { id: 1 });

      const spyServiceCreate = jest
        .spyOn(service, 'create')
        .mockReturnValue(Promise.resolve(mockUsuario));

      const response = await controller.create(createUsuarioDto);

      expect(spyServiceCreate).toHaveBeenCalledWith(createUsuarioDto);
      expect(response.data).toEqual(mockUsuario);
      expect(response.message).toBe(EMensagem.SalvoSucesso);
    });
  });

  describe('findAll', () => {
    it('obter uma listagem de usuários', async () => {
      const mockListaUsuarios = [
        {
          nome: 'Teste',
          email: 'teste@teste.com.br',
          senha: '12345678',
          ativo: true,
          admin: false,
          permissao: [],
        },
      ];

      const spyServicefindAll = jest
        .spyOn(service, 'findAll')
        .mockReturnValue(Promise.resolve(mockListaUsuarios) as any);

      const response = await controller.findAll(1, 10);

      expect(spyServicefindAll).toHaveBeenCalledWith(1, 10);
      expect(response.data).toEqual(mockListaUsuarios);
      expect(response.message).toBe(undefined);
    });
  });

  describe('findOne', () => {
    it('obter um usuário', async () => {
      const mockUsuario = {
        id: 1,
        nome: 'Teste',
        email: 'teste@teste.com.br',
        senha: '12345678',
        ativo: true,
        admin: false,
        permissao: [],
      };
      const spyServiceFindOne = jest
        .spyOn(service, 'findOne')
        .mockReturnValue(Promise.resolve(mockUsuario) as any);

      const response = await controller.findOne(1);

      expect(spyServiceFindOne).toHaveBeenCalledWith(1);
      expect(response.data).toEqual(mockUsuario);
      expect(response.message).toBe(undefined);
    });
  });

  describe('findOne', () => {
    it('obter um usuário', async () => {
      const mockUsuario = {
        id: 1,
        nome: 'Teste',
        email: 'teste@teste.com.br',
        senha: '12345678',
        ativo: true,
        admin: false,
        permissao: [],
      };

      const spyServiceUpdate = jest
        .spyOn(service, 'update')
        .mockReturnValue(Promise.resolve(mockUsuario) as any);

      const response = await controller.update(1, mockUsuario);

      expect(spyServiceUpdate).toHaveBeenCalled();
      expect(response.data).toEqual(mockUsuario);
      expect(response.message).toBe(EMensagem.AtualizadoSucesso);
    });
  });

  describe('unactivage', () => {
    it('desativar um usuário', async () => {
      const spyServiceUnactivate = jest
        .spyOn(service, 'unactivate')
        .mockReturnValue(Promise.resolve(false) as any);

      const response = await controller.unactivate(1);

      expect(spyServiceUnactivate).toHaveBeenCalled();
      expect(response.data).toEqual(false);
      expect(response.message).toBe(EMensagem.DesativadoSucesso);
    });
  });
});
