import { restAPI } from "./rest api/restApi.js";
/**
 * class that represent server working
 */
export class server{
  /**
   * this function is handeling calls that arrived to the server from the network
   * @param FXMLhttpRequest the request to the server
   * @param onReady the call back function 
   */
  static UseServer = (FXMLhttpRequest, onReady) => {
    var url = FXMLhttpRequest.url
    var body = FXMLhttpRequest.body
    var method = FXMLhttpRequest.method
    var response = {}
    switch(method){
      case 'GET':
      {
        if(url === "/SignIn"){
          var user = restAPI.getAdminData(body.username)
          // if user exists
          if (user !== undefined) {
              response = { status: 200, body: user }
          } else {
              response = { status: 404, body: null }
          }
          // call onReady when done
        } else {
          if (body === null) {
            var books =restAPI.getAllBookData()
            if (books)
              response = { status: 200, body: books }
            else 
              response = { status: 404, body: null }
          } else {
            var book = restAPI.getBookData(body.book_name)
            if (book !== undefined)
              response = { status: 200, body: book }
            else 
              response = { status: 404, body: null }
          }
        }
        onReady(response)
        break
      }
      case 'POST':
      {
        if(url === "/SignUp"){
          var user = restAPI.getAdminData(body.data.UserName)
          if (user !== undefined) { // if user exists
              response = { status: 404 , body: null }
          } else {
            var user = restAPI.createAdminData(body.data)
            response = { status: 200 , body: user }
        }
        } else {
          var book = restAPI.getBookData(body.data.book_name)
          if (book !== undefined) {
            response = { status: 404, body: null }
          } else {
            var book = restAPI.createBookData(body.data)
            response = { status: 200, body: book }
          }
        }
        onReady(response)
        break
      }
      case 'PUT':
      {
        var book = restAPI.updateBookData(body.book_name, body.data)
        if (book)
        response = { status: 200, body: book }
        else 
        response = { status: 404, body: null }
        onReady(response)
        break
      }
      case 'DELETE':
      {
        var books = restAPI.deleteBookData(body.book_name)
        if (books)
          response = { status: 200, body: books }
        else 
          response = { status: 404, body: null }
        onReady(response)
        break
      }
    }
  }
}