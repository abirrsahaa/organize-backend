/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PdfParserController } from './pdf-parser/pdf-parser.controller';

@Module({
    imports: [],
    providers: [],
    exports: [],
    controllers: [PdfParserController],
})
export class ParserModule {}
