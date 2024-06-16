import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const rmqConfig = (
  configService: ConfigService,
  queue: string,
): RmqOptions => {
  const user = configService.get<string>('RMQ_USER');
  const password = configService.get<string>('RMQ_PASSWORD');
  const host = configService.get<string>('RMQ_HOST');
  const port = configService.get<number>('RMQ_PORT');

  return {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}:${port}`],
      queue,
      prefetchCount: 1,
      queueOptions: {
        durable: true,
      },
      persistent: true,
    },
  };
};
