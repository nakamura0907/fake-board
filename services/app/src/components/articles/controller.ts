import express, {Request, Response, NextFunction } from 'express';
import ArticleAdd from './domain/ArticleAdd';
import ArticleList from './domain/ArticleList';
import ArticlesSerializer from './Serializer';
import articlesUseCase from './useCase';

const articleController = () => {
  const serializer = new ArticlesSerializer();
  const useCase = articlesUseCase();
  
  //記事登録
  const articleAdding = (req: Request, res: Response, next: NextFunction) => {
    (async() => {
      // リクエスト内容の受け取り
      const articleAdd = new ArticleAdd(req);

      // 記事登録ユースケースの実行
      const result = await useCase.articleAdd(articleAdd);

      // レスポンスの返却
      res.status(201).send(serializer.articleAdd(result));
    })().catch(next);

  };

  //記事一覧
  const articleListing = (req: Request, res: Response, next: NextFunction) => {
    (async() => {
      // リクエスト内容の受け取り
      const articleList = new ArticleList(req);
      
      // 記事一覧ユースケースの実行
      const result = await useCase.articleList(articleList);

      // レスポンスの返却
      res.status(200).send(serializer.articleList(result));
    })().catch(next);
  };

  return { articleAdding, articleListing };
};

export default articleController;