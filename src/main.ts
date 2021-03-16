import { HttpExceptionFilter } from './http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  console.log('test');

  app.useGlobalFilters(new HttpExceptionFilter());
  const allowedOrigins = [
    'http://localhost:4200',
    'https://auclair.000webhostapp.com',
    'http://app-47c6a1e2-2f97-4638-a62d-7157933d0a8d.cleverapps.io',
    'http://app-47c6a1e2-2f97-4638-a62d-7157933d0a8d.cleverapps.io/',
    'http://app-8c28d2f9-3afa-4776-a71f-1a78d26bd1c2.cleverapps.io',
    'http://app-8c28d2f9-3afa-4776-a71f-1a78d26bd1c2.cleverapps.io/'
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      console.log(origin);
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };
  app.enableCors({ ...corsOptions });
  const port = process.env.PORT || 3000
  await app.listen(port);
}
bootstrap();

