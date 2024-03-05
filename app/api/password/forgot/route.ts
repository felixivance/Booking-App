import dbConnect from "@/backend/config/dbConnect";
import { forgotPassword } from "@/backend/controllers/authController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";


interface RequestContext{}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(forgotPassword);

export async function POST( request: NextRequest , context: RequestContext) {
    return router.run(request, context);
}

