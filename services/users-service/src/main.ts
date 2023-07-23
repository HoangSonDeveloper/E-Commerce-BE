import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '127.0.0.1:8000',
        package: 'user',
        protoPath: join(__dirname, './proto/user.proto'),
        loader: {
          keepCase: true,
          enums: String,
          oneofs: true,
          arrays: true,
        },
      },
    },
  ); // Start the microservice

  return app.listen();
}

main().catch((error) => {
  console.error('Error starting microservice:', error);
});
