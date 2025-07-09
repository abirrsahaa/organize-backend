/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    // this is for loading environment variables
    // i am using config module from nestjs
      ConfigModule.forRoot({
          isGlobal: true,
      }),

      // this is for rate limiting the API's
      // i am using throttler module from nestjs
       ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, //this is in milliseconds so it is 60 seconds
          limit: 10,
        },
      ],
    }),

    // now will import the db typeorm module such that we can talk to db ..also link ypur concept of hibernate and it will also follow the
    // repository pattern and that is why lld is mattered so much and not only that that too in deep knowledge such that you know the problem and you why this was made 
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5433,
      username: process.env.POSTGRES_USER ,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true, // this will automatically load all entities in the application
      synchronize: process.env.NODE_ENV !== 'production', // only synchronize in development mode that is --> automatically update the database schema (tables, columns, relationships) to match the structure defined in your entity classes. Effectively, it handles schema synchronization between your code and the database. 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
