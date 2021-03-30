import { HttpExceptionFilter } from './http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  console.log('test');

  app.useGlobalFilters(new HttpExceptionFilter());
  const allowedOrigins = [
    'http://localhost:4200',
    'https://auclair.000webhostapp.com'
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

