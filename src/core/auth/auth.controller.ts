import { Body, Controller, Post } from '@nestjs/common';
import { HttpResponse } from '../../shared/classes/http-response';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { ILoginPayload } from '../../shared/interfaces/login-payload.interface';
import { IResponse } from '../../shared/interfaces/response.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<IResponse<ILoginPayload>> {
    const data = await this.authService.login(loginDto);

    return new HttpResponse<ILoginPayload>(data).onSuccess(
      EMensagem.AutenticadoSucesso,
    );
  }
}
