import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './products/products.module'; // your feature module

const isGraphQL = process.env.GRAPHQL === 'true';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.register(),
    ProductModule,
    ...(isGraphQL ? [require('./graphql/graphql.module').OptionalGraphQLModule] : []),
  ],
})
export class AppModule {}