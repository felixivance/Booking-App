class ErrorHandler extends Error{
    statusCode: number;
    

    constructor(message:string, statusCode:number ){

        super(message) // call the parent constructor (Error)
        this.statusCode = statusCode;

    }
}

export default ErrorHandler;