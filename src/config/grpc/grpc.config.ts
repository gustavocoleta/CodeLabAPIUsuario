import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcConfig = (
  packageName: string,
  urlEnv: string,
  configService: ConfigService,
): MicroserviceOptions => {
  return {
    transport: Transport.GRPC,
    options: {
      package: packageName,
      protoPath: join(__dirname, `protos/${packageName}.proto`),
      url: configService.get(urlEnv),
    },
  };
};
