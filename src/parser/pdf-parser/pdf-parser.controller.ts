/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiSecurity } from "@nestjs/swagger";


const fileSchema={
            type: 'object',
           
            properties: {
                file: {
                    type: 'file',
                    format: 'binary',
                },
            }
        };

@ApiSecurity('apiKey')
@Controller({
    version: '1',
    path:'parser'
    
    
})
export class PdfParserController {
    // This controller will handle PDF parsing related routes
    // You can define your routes and methods here
    // For example, you might have a method to parse a PDF file and return its content

    // lets get started with a simple method 
        // a file will be uploaded 
        // check and validate if it is a pdf or not 
        // once validated parse it and get it's response 
        // and return the content and details about the pdf file as response 
        // and then we will learn testing of previous module and test this feature on our own 
        // and then we will be moving to the different tasks which we need to be doing 

        constructor(){}

        

        // now the main thing is to let swagger know what i want here as request body 
        // one thing is description and the other thing is having the input 



        @Post('pdf')
        @UseInterceptors(FileInterceptor('file'))
        @ApiConsumes('multipart/form-data')
        @ApiBody({schema: fileSchema, description: 'Upload a PDF file to parse'})
        parsingPdfFile(@UploadedFile() file:Express.Multer.File):any {
            // This is a placeholder method for parsing PDF files
            // You can implement the actual logic here later

            console.log('Received file:', file);
            return file;
        }
}