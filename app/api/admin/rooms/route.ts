import dbConnect from "@/backend/config/dbConnect";
import { newRoom } from "@/backend/controllers/roomController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string;
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(newRoom);


export async function POST( request: NextRequest , context: RequestContext) {
    return router.run(request, context);
}