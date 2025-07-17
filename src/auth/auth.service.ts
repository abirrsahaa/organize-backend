/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKey } from 'src/database/entities/api-key.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {


    constructor(@InjectRepository(ApiKey) private apiKeyRepository:Repository<ApiKey>){}


    async validateApiKey(apiKey: string):Promise<boolean> {

        console.log('Validating API Key:', apiKey);
        // Replace 'your-secret-api-key' with your actual API key
        // const validApiKeys = ['1234567890', '0987654321']; 

        const isApiKeyValid =await this.apiKeyRepository.findOneBy({ id: apiKey });
        console.log(isApiKeyValid, !!isApiKeyValid);
        if (isApiKeyValid) {
            console.log('API Key is valid');
            return true;
        } else {
            console.log('API Key is invalid');
            return false;
        }
    }


}
