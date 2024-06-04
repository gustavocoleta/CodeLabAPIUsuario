import { Body, Controller, Post } from '@nestjs/common';
import { HttpResponse } from '../../shared/classes/http-response';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { IResponse } from '../../shared/interfaces/response.interface';
import { CreateRecuperacaoSenhaDto } from './dto/create-recuperacao-senha.dto';
import { RecuperacaoSenhaService } from './recuperacao-senha.service';

@Controller('recuperacao-senha')
export class RecuperacaoSenhaController {
  constructor(
    private readonly recuperacaoSenhaService: RecuperacaoSenhaService,
  ) {}

  @Post()
  async create(
    @Body() createRecuperacaoSenhaDto: CreateRecuperacaoSenhaDto,
  ): Promise<IResponse<boolean>> {
    await this.recuperacaoSenhaService.create(createRecuperacaoSenhaDto);

    return new HttpResponse<boolean>(true).onSuccess(
      EMensagem.VerifiqueEnderecoEmailInformado,
    );
  }
}
