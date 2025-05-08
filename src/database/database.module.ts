import {Module,DynamicModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule,ConfigService } from '@nestjs/config';


@Module({})
export class DatabaseModule{
    static register():DynamicModule{
        const isMongo=process.env.MONGODB==='true';

        return{
            module:DatabaseModule,
            imports:[
                ConfigModule.forRoot({isGlobal:true}),
                isMongo
                ?MongooseModule.forRoot(process.env.MONGO_URL || '')
                :TypeOrmModule.forRootAsync({
                    imports:[ConfigModule],
                    inject:[ConfigService],
                    useFactory:(config:ConfigService)=>({
                        type:'mysql',
                        host:config.get('MYSQL_HOST'),
                        port:config.get('MYSQL_PORT'),
                        username:config.get('MYSQL_USERNAME'),
                        password:config.get('MYSQL_PASSWORD'),
                        database:config.get('MYSQL_DATABASE'),
                        autoLoadEntities:true,
                        synchronize:true
                    })
                })
                
            ]
        }
    }
}