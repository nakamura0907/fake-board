import Serializer from "@/lib/Serializer";
import ArticleEntity from "./entity";

class ArticlesSerializer extends Serializer {
  articleAdd(entity: ArticleEntity) {
    return {
      id: entity.id,
      user_id: entity.user_id,
      body: entity.body,
      created_at: entity.created_at
    };
  }

  articleList(entity: ArticleEntity[]) {
    return {
      articles: entity
    };
  }
}

export default ArticlesSerializer;
