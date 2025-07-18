/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { PdfParserService } from "./pdf-parser.service";
import { PdfParserUploadResultDto } from "./dto/pdf-parser-result.dto";
import { PdfParserRequestDto } from "./dto/pdf-parser-request.dto";


const fileSchema={
            type: 'object',
           
            properties: {
                file: {
                    type: 'file',
                    format: 'binary',
                },
            }
        };



// here will be defining pipe for validation of the file type and size
const pdfPipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: 'pdf',
  })
  .addMaxSizeValidator({
    maxSize: 1024 * 1024 * 5, // 5 MB
  })
  .build({
    fileIsRequired: true,
  });
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

        constructor(private pdfparserservice:PdfParserService){}

        

        // now the main thing is to let swagger know what i want here as request body 
        // one thing is description and the other thing is having the input 



         @ApiOperation({
    summary: 'Return text from uploaded PDF file',
    description: `This endpoint retrieves the content of an uploaded PDF file and returns it as a text.\n
    The file must be a PDF parsable text context, with a maximum size of 5MB.
   `,
  })
  @ApiOkResponse({
    type: PdfParserUploadResultDto,
    description:
      'The PDF was parsed and post-processed successfully. Its content is returned as text.',
  })
        @Post('pdf')
        @UseInterceptors(FileInterceptor('file'))
        @ApiConsumes('multipart/form-data')
        @ApiBody({schema: fileSchema, description: 'Upload a PDF file to parse'})
        @HttpCode(200)
        async parsingPdfFile(@UploadedFile(pdfPipe) file:Express.Multer.File):Promise<PdfParserUploadResultDto> {


            try{

                // This is a placeholder method for parsing PDF files
            // You can implement the actual logic here later

            console.log('Received file:', file);

            const content = await this.pdfparserservice.pdfParser(file.buffer);

            

            // now that i have the access to the file buffer lets dive deep into it and figure out what all
            // can i do to parse the bytes and get the content out of it




            // validation of the file type can be done here

            // first lets check if the file is pdf or not ..mime type is the best way to do that
            // other way to check is to read the first few bytes of the file and check for the magic number
            // other way is to extract the file extension and check if it is pdf or not



            // what if i have the file type to be validated as pdf now what to do?
            return {
                content: content,
                originalFileName: file.originalname
            }; 

            }
            catch(error: unknown){
                console.error('Error parsing PDF file:', error);
                throw new Error('Failed to parse PDF file');
            }
             // This is just a placeholder, you can implement actual PDF parsing logic here
        }



        // now a better practise is to have a response DTO for the response
        // so lets create a DTO for the response and use it here


        @Post('pdf-url')
        @ApiOperation({
            summary: 'Parse PDF from URL',
            description: 'This endpoint retrieves the content of a PDF file from a given URL and returns it as text.',
        })
        @ApiOkResponse({
            type: PdfParserUploadResultDto,
            description: 'The PDF was parsed and post-processed successfully. Its content is returned as text.',
        })
        @ApiBody({
            type: PdfParserRequestDto,
            description: 'Provide the URL of the PDF file to parse',
        })  
        @HttpCode(200)
        async pdfParseUrl(@Body() requestdto: PdfParserRequestDto): Promise<PdfParserUploadResultDto> {
            // This method will handle the parsing of a PDF file from a URL
            // You can implement the actual logic here later

            console.log('Received URL:', requestdto.url);

            // Here you would typically fetch the PDF from the URL and parse it
            // For now, let's just return a placeholder response

            const buffer=await this.pdfparserservice.pdfParserFromUrl(requestdto.url); // Simulating a PDF file buffer

            const content = await this.pdfparserservice.pdfParser(buffer);

            return {
                content: content,
                originalFileName: 'sample-from-url.pdf'
            };
        }


}