import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';
import { DevelopersModule } from 'src/domains/developers/developers.module';
import { EventsModule } from 'src/domains/events/events.module';
import { SessionsModule } from 'src/domains/sessions/sessions.module';
import { StreamersModule } from 'src/domains/streamers/streamers.module';
import { TokensModule } from 'src/domains/tokens/tokens.module';

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Chzzk Connector Swagger')
    .setDescription('API Docs')
    .addBearerAuth()
    .addTag('Developers', 'Developers API')
    .addTag('Tokens', 'Tokens API')
    .addTag('Sessions', 'Sessions API')
    .addTag('Events', 'Events API')
    .addTag('Streamers', 'Streamers API')
    .build();
  const swaggerOptions: SwaggerCustomOptions = { swaggerOptions: { persistAuthorization: true } };
  const swaggerInclude = { include: [DevelopersModule, TokensModule, SessionsModule, EventsModule, StreamersModule] };
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, swaggerInclude);
  SwaggerModule.setup('docs', app, swaggerDocument, swaggerOptions);
}
