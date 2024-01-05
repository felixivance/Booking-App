import { NextRequest, NextResponse } from "next/server";

type handlerFunction = (request: NextRequest, params:any) => Promise<NextResponse>;

interface InterfaceValidationError {
    message: string;
}

export const catchAsyncErrors = ( handler: handlerFunction ) => async(request:NextRequest, params:any)=>{
    try{
        return await handler(request, params)
    }catch(error:any){
        console.log(error)
        if(error?.name === 'CastError'){
            error.message = `Resource not found. Invalid: ${error.path}`
            error.statusCode = 400; // bad request
        }

        if(error?.name == 'ValidationError'){
            const message = Object.values<InterfaceValidationError>(error.errors).map((value:any) => value.message);
            // const message = Object.values(error.errors)
            error.message = message;
            error.statusCode = 400;
        
        }

        return NextResponse.json({
            success: false,
            message: error.message
        }, {status: error.statusCode || 500})
    }

}