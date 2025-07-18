

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





------------------
so today is thrusday i know i have messed up this week also after  monday but no issues trying to learn a pattern and hopefully will get on to this 

-> finish the pdf parsing service and then move on to the prompting service 
->i know what the pdf parsing is doing but don't know what the langchain part is doing so 
        ->first go through the code understand the intuition and then google and then implement 

->target is to finish both the services and hopefully get done with the rest of the video such that i can code tomorrow and then start with the frontend in saturday and sunday 




->some of the goals that i need to hit this sunday includes ->

        ->organize-simple end to end as this will help me identify all the areas to work on and then will do plethora of simple 2 day projects for the next one month in the field of gen ai and full stack 

        ->along with that finishing keerti course end to end and sitting and figuring out what are the areas i need to work on and then just invest my time in learning and implementing the projects and then getting the knowledge to work by building ai agents and complex applications which are using the aspects of gen ai ..(best part i have gemini pro for a year lets use this )

        ->aim is to build solid foundation in genai , cloud and devops end to end while building full stack applications ..and obviously dsa 

        ->goal is to be killer in the above for the next 4-5 months as then i will dive deep into lld and hld as then i will have the bandwith and the expertise to question about things 