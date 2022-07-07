import { prisma } from "@/lib/Database/prisma";
import { articles } from "@prisma/client";

/**
 * データベースに新規記事を登録する
 * @param user_id
 * @param body
 * @returns
 */
const insert = async (user_id: articles["user_id"], body: articles["body"]) => {
  const article = await prisma.articles.create({
    data: {
      user_id,
      body,
    },
  });
  return article;
};

/**
 * データベースから記事一覧を取得
 * @returns
 */
const select = async () => {
  const result = await prisma.articles.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return result;
};

const booksMapper = {};
export default Object.assign(booksMapper, {
  insert,
  select,
});
