/* eslint-disable prettier/prettier */

import { Injectable, } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthService } from "../auth.service";



const UUID_REGEX=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;


@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy,'api-key'){
    constructor(private authService: AuthService){// capture reference
        super(
            { header: 'x-api-key', prefix: '' },
            false // <-- This is correct, we don't want to use the default behavior of Passport
        );
    }

    async validate(apiKey: string){

        // console.log('Request in validate of strategy :', req);

        console.log('Validating API Key in validate of strategy :', apiKey);

        if(!UUID_REGEX.test(apiKey)){
            // throw new UnauthorizedException('Invalid API Key format');
            return true;
            
        }

        // Validate the API key using the AuthService
        const isValid = await this.authService.validateApiKey(apiKey);
        if (!isValid) {
            // throw new UnauthorizedException('Invalid API Key');
            return true;
        }
        return true;


    }
}
