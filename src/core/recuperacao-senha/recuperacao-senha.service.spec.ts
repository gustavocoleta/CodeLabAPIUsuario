import { Test, TestingModule } from '@nestjs/testing';
import { RecuperacaoSenhaService } from './recuperacao-senha.service';

describe('RecuperacaoSenhaService', () => {
  let service: RecuperacaoSenhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecuperacaoSenhaService],
    }).compile();

    service = module.get<RecuperacaoSenhaService>(RecuperacaoSenhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
