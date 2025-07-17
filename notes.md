

1.here when i am calling how the auth guard is getting implemented using the strategy is something i need to know 

and how are the headers getting confgured so seamlessly this is something i need to understand to get a full understanding of the code and how it works 


today's goal is to understand the auth end to end and then implement a better auth using jwt which will be great to implement in a new framework by only documentation 

understanding the parser service end to end and see how to implement it and how fast is my understanding ..


-------------------------------------------

if i am able to do the above tasks seamlessly and with full understanding it is sure that the other service are a matter of time and will complete them seamlessly  ... target would be 2 services daily and by next week hopefully i will be done with this project with immense confidence and before coming to any big project like this i will do enough projects end to end ..just to gain the mindset and will come to such complex projects after 1 month till then will develop this mindset 




the fact is simple i need to build a pdf parser and for that obvious thing is 

i need to have a controller and obviously a swagger corresponding to that
service which will have the buisness logic for parsing the pdf content and any validation needed for the same 



ok so what is understood from the fact that 

file upload in nestjs 
obviously i need multer for file upload (later understand multer in detail)
for swagger to have a file upload button i will come to its configuration later 


for validation of this file we will use pipe which will act as a validator for our file which we will be uploading


so nestjs uses multer which helps us to process data when it is in the form of multipart/formdata 

and in terms of controller before that we need to use the interceptor @UseInterceptors(FileInterceptor('file')) and in the method we will extract the file using @UploadedFile() file: Express.Multer.File


now for validation of the file either we can use our custom pipe or nestjs provides built it parseFilepipe will dive deep into it when i will be coding it and the main thing is 

also making sure to use openapi spec and have a schema such that we get to upload and test there 