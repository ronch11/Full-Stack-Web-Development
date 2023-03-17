import { network } from "./network/network.js";

export class FXMLhttpRequest {
    /**
     * method to open request to the server through the network
     * @param {string} method the method whated to do
     * @param {string} url the url to do the method
     * @param {string} body the request body
     * @param {Function} onReady the function to actived when to request is finished
     */
    open = (method, url, body, onReady) => {
        this.method = method;
        this.url = url;
        this.body = body;
        this.onReady = onReady;
    }
    /**
     * send the method to the server through the network
     */
    send = () => {
        network.send(this);
    }
}