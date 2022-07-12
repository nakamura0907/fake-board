class ArticleEntity {
  public constructor(
    public readonly id: number,
    public readonly user_id: number,
    public readonly body: string,
    public readonly created_at: Date
  ) {}
}

export default ArticleEntity;
