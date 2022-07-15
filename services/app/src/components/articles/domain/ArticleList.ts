import Exception from "@/lib/Exception";
import { Request } from "express";

type ReqBody = {
    id: number;
    user_id: number;
    body: string;
    created_at: Date;
}

class ArticleList {
    public readonly _id: number;
    public readonly _user_id: number;
    public readonly _body: string;
    public readonly _created_at: Date;

    public constructor(request: Request< {}, {}, ReqBody>){
        const { id, user_id, body, created_at } = request.body;

        // 取得できたか検証
        if(!body) throw new Exception("お探しの記事は見つかりませんでした", 404);
    
        this._id = id;
        this._user_id = user_id;
        this._body = body;
        this._created_at = created_at;
    }

    public get id() {
        return this._id;
    }

    public get user_id() {
        return this._user_id;
    }

    public get body() {
        return this._body;
    }

    public get created_at() {
        return this._created_at;
    }
}

export default ArticleList;