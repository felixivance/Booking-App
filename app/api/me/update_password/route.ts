import dbConnect from "@/backend/config/dbConnect";
import { updatePassword, updateProfile } from "@/backend/controllers/authController";
import { getRoomDetails, updateRoom } from "@/backend/controllers/roomController";
import { isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(updatePassword);


export async function PUT( request: NextRequest , context: RequestContext) {
    return router.run(request, context);
}

