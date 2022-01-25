const httpServerLibrary = require("http"); //Imported Http Library
const fileSystemLibrary = require("fs"); //imported filesystem library
const path = require("node:path/win32");

//create a server
httpServerLibrary.createServer(requestListenerFunction).listen(3000)

//RequestListener is a function to be executed every time the server gets a request on port 3000. This function is called a requestListener, and handles request from the user, as well as response back to the user.
function requestListenerFunction(userRequest, serverResponse){ //server will listen for the port ping, once we receive a response it will get passwed down as which site pinged it

    let pathName = userRequest.url //user request URL
    let jsonFile = "todo.json"
    let htmlFile = "index.html"

    function callbackFunctionAfterAccessedFile(errorsFound, dataInsideFileAccessed){


        if(errorsFound){

            console.log(errorsFound)
            serverResponse.writeHead(400, {"Content-type": "application/json"})
            serverResponse.write(`<!DOCTYPE><html><body><div> PAGE NOT FOUND </div></body></html></!DOCTYPE>`)
        }
        else{

            serverResponse.writeHead(200, ({"Content-type": "application/json"})); //Message Tag and Category Header for the response site //what content will the site host
            serverResponse.write(dataInsideFileAccessed.toString())
            //serverResponse.end("URL Requested: " + url); //Message on the user end //for the response sites
        }
        serverResponse.end();
    }

    function callbackFunctionHTML(errorsFound, dataInsideFileAccessed){

        if(errorsFound){

            console.log(errorsFound)
            serverResponse.writeHead(400, {"Content-type": "application/json"})
            serverResponse.write(`<!DOCTYPE><html><body><div> PAGE NOT FOUND </div></body></html></!DOCTYPE>`)
        }
        else{

            serverResponse.writeHead(200, ({"Content-type": "text/html"})); //Message Tag and Category Header for the response site //what content will the site host
            serverResponse.write(dataInsideFileAccessed.toString())
            //serverResponse.end("URL Requested: " + url); //Message on the user end //for the response sites
        }
        serverResponse.end();
    }

    if(pathName == "/todo"){

        fileSystemLibrary.readFile(jsonFile, callbackFunctionAfterAccessedFile) //checks file to read // checks encoding of the file and its default value is utf8 // then calls a function to call after reading the file(this function takes 2 paratemers errors if there are errors, and data to load as the contents of the file)
        //the readfile functions returns the date stored in the file
    }
    else if(pathName == "/index"){

        fileSystemLibrary.readFile(htmlFile, callbackFunctionHTML) //checks file to read // checks encoding of the file and its default value is utf8 // then calls a function to call after reading the file(this function takes 2 paratemers errors if there are errors, and data to load as the contents of the file)
        //the readfile functions returns the date stored in the file
    }
    else if(pathName == "/read-todo"){

        var currentMethod = userRequest.method;
        console.log("Current Method" + currentMethod)
  
        // if request is a GET, then then we get the JSON Data

        if (currentMethod == 'GET') {

            fileSystemLibrary.readFile("loadup.html", callbackFunctionAfterAccessedFile)

            function callbackFunctionAfterAccessedFile(errorsFound, dataInsideFileAccessed){
            
                var headers = {
                    'Content-Type': 'application/json'
                };
                

                if(errorsFound){

                    console.log(errorsFound)
                    serverResponse.writeHead(400, headers)
                    serverResponse.write(`<!DOCTYPE><html><body><div> PAGE NOT FOUND </div></body></html></!DOCTYPE>`)
                }
                else{
        
                    serverResponse.writeHead(200, ({"Content-type": "text/html"})); //Message Tag and Category Header for the response site //what content will the site host
                    serverResponse.write(dataInsideFileAccessed.toString())
                    //serverResponse.end("URL Requested: " + url); //Message on the user end //for the response sites
                    
                }
                serverResponse.end();
            }
        }
    }
    else{

        serverResponse.writeHead(301, {
            Location: `http://localhost:3000/index`
          }).end();

    }
}



console.log("Server just ran");
