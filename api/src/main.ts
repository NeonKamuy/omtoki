import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as BodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.use(BodyParser.urlencoded({
    limit: "5mb",
    extended: false
  }));
  httpAdapter.use(BodyParser.json({limit: "5mb"}));

  await app.listen(3000);
}
bootstrap();
