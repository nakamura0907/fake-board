import ArticleAdd from "./domain/ArticleAdd";
import ArticleList from "./domain/ArticleList";
import ArticleEntity from "./entity";
import mapper from "@components/articles/mapper";

const articlesUseCase = () => {
  const articleAdd = async (arti: ArticleAdd) => {
    // トークンからユーザー情報の取得
    WWW-Authenticate: Bearer realm="";

    // created_atの作成
    const created = new Date();

    // 記事のデータベース登録
    const article = await mapper.insert(-1, -1, "テスト投稿", created);

    return new ArticleEntity(article.id, article.user_id, article.body, article.created_at);
  };

  const articleList = async (arti: ArticleList) => {
    // トークンからユーザー情報の取得
    WWW-Authenticate: Bearer realm="";

    // データベースからuser_id, body, created_atの取得
    const articles = await mapper.select();
    return [new ArticleEntity(articles.id, articles.user_id, articles.body, articles.created_at)];
  };

  return { articleAdd, articleList };
};

export default articlesUseCase;