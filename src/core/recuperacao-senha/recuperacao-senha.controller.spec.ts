import { Test, TestingModule } from '@nestjs/testing';
import { RecuperacaoSenhaController } from './recuperacao-senha.controller';
import { RecuperacaoSenhaService } from './recuperacao-senha.service';

describe('RecuperacaoSenhaController', () => {
  let controller: RecuperacaoSenhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecuperacaoSenhaController],
      providers: [RecuperacaoSenhaService],
    }).compile();

    controller = module.get<RecuperacaoSenhaController>(RecuperacaoSenhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
