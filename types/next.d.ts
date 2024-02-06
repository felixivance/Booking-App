import { InterfaceUser } from "@/backend/models/user";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";


declare module "next/server" {
    interface NextRequest {
       user: InterfaceUser
    }
}

declare module "@reduxjs/toolkit/query/react" {
    interface FetchBaseQueryError {
        data?: any;
    }
}