import {Server as NetServer} from "http";
import { NextApiRequest } from "next";
import {Server as ServerIo} from "socket.io";

import { NextApiResponseServerIo } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const config={
    api :{
        bodyParser : false,
    }
};

const ioHandler = (req: NextRequest, res:NextApiResponseServerIo)=>{
    if(!res.socket.server.io){
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIo(httpServer, {
            path:path, 
            addTrailingSlash:false,
        });
        res.socket.server.io = io;
    }
    res.end();
}

export default ioHandler;