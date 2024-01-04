import dbConnect from "@/backend/config/dbConnect";
import { deleteRoom, updateRoom } from "@/backend/controllers/roomController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string;
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.put(updateRoom);
router.delete(deleteRoom);


export async function PUT( request: NextRequest, context: RequestContext){
    return router.run(request,context)
}


export async function DELETE(request: NextRequest, context: RequestContext){
    return router.run(request,context)
}