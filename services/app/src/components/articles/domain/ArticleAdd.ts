import Exception from "@/lib/Exception";
import { Request } from "express";

type ReqBody = {
    
    user_id: number;
    body: string;
}

class ArticleAdd {
    public readonly _id: number;
    public readonly _user_id: number;
    public readonly _body: string;
    public readonly _created_at: Date;

    public constructor(request: Request<{}, {}, ReqBody>){
        const { user_id, body } = request.body;

        // 入力内容の検証
        if (!body) throw new Exception("本文を入力してください", 422);
        if (body.length > 144)
            throw new Exception("本文は144文字以下にしてください", 422);
    
        this._user_id = user_id;
        this._body = body;
    }

    public get user_id() {
        return this._user_id;
    }

    public get body() {
        return this._body;
    }

}

export default ArticleAdd;