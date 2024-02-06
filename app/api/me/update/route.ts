import dbConnect from "@/backend/config/dbConnect";
import { updateProfile } from "@/backend/controllers/authController";
import { getRoomDetails, updateRoom } from "@/backend/controllers/roomController";
import { isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string;
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).get(updateProfile);


export async function PUT( request: NextRequest , context: RequestContext) {
    return router.run(request, context);
}

