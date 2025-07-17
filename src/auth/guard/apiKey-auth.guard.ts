/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";




@Injectable()
export class ApiKeyAuthGuard extends AuthGuard('api-key') {
  // This guard will use the 'api-key' strategy defined in the auth module
   
    
}