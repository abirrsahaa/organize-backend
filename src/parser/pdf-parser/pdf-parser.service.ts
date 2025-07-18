/* eslint-disable prettier/prettier */
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

import * as PdfParse from "pdf-parse";



@Injectable()
export class PdfParserService {

    constructor(
        private httpService: HttpService
    ){}


    async  pdfParser(file:Buffer){

        console.log('Parsing PDF file...');

        const pdfParsing:PdfParse.Result=await PdfParse(file);

        if(pdfParsing.text.length==0){
            console.log('No content found in the PDF file.');
            throw new Error('No content found in the PDF file');
        }

        console.log({
            numpages: pdfParsing.numpages,
            numrender: pdfParsing.numrender,
            info: !!pdfParsing.info,
            metadata: !!pdfParsing.metadata,
            version: pdfParsing.version,
            text: pdfParsing.text
        })




        

        // const poppler=new Poppler(process.env.POPPLER_BIN_PATH);

        // const content:string = await poppler.pdfToText(file,undefined,{
        // maintainLayout: true,
        // quiet: true,
        // });


        // if(content.length==0){
        //     console.log('No content found in the PDF file.');
        //     throw new Error('No content found in the PDF file');
        // }

        // iska matlab content toh hai pdf mai 
        // lets pass the content for hygiene 

        console.log('PDF content parsed successfully.');
        return this.postProcessParsedContent(pdfParsing.text);


    

    }


    // i need to understand how to process the content
    // for now lets just return the content as it is


    private postProcessParsedContent(content: string): string {

        const processedText = content
      .split('\n')
      //trim each line
      .map((line) => line.trim())
      //keep only one line if multiple lines are empty
      .filter((line, index, arr) => line !== '' || arr[index - 1] !== '')
      //remove whitespace in lines if there are more than 3 spaces
      .map((line) => line.replace(/\s{3,}/g, '   '))
      .join('\n');

    return processedText;

    }



    // now here i will have the service where i will get the pdf from a url and then pass the buffer which will then be internally pass to the above service

    async pdfParserFromUrl(url: string): Promise<Buffer> {
       const response = await this.httpService.axiosRef({
      url,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    if (response.headers['content-length'] > 5 * 1024 * 1024) {
        throw new Error('File size exceeds 5MB limit');
    }

    // check the type verification of response 
    console.log("the response here is ",response);

    return Buffer.from(response.data, 'binary');
    }


    

}