import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { IResponse } from '../interfaces/response.interface';

export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    return next
      .handle()
      .pipe(map((returned) => this.transformReponse(returned)));
  }

  private transformReponse(returned: T): IResponse<T> {
    const data = returned as IResponse<T>;

    const reponseFormated = {
      message: data?.message ?? null,
      data: data?.data ?? data,
    };

    return reponseFormated as IResponse<T>;
  }
}
