import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('**********REQ-INFO**********');
    this.logger.log('IP: ' + req.ip);
    this.logger.log('URL: ' + req.url);
    this.logger.log('METHOD: ' + req.method);
    this.logger.log('HEADERS: ' + JSON.stringify(req.headers));
    this.logger.log('BODY: ' + JSON.stringify(req.body));
    this.logger.log('PARAMS: ' + JSON.stringify(req.params));
    this.logger.log('QUERY: ' + JSON.stringify(req.query));

    const send = res.send;

    res.send = (exitData) => {
      if (
        res?.getHeader('content-type')?.toString().includes('application/json')
      ) {
        this.logger.log('**********RESP-DATA**********');
        this.logger.log(exitData.toString());
      }
      res.send = send;
      return res.send(exitData);
    };

    next();
  }
}
