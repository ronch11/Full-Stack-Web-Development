import { server } from "./server/server.js";
 
export class network {
    /**
     * send the reuest to the server.
     * @param FXMLhttpRequest the request to the server
     * @returns pass throw the callback function for the return
     */
     static send = (FXMLhttpRequest) => {
        server.UseServer( FXMLhttpRequest, 
            function (response){
                FXMLhttpRequest.onReady(response)
            }
        )
    }
}