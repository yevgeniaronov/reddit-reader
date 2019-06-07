export class PostData {
  kind: string;
  data: {
    thumbnail: string;
    url: string;
    title: string;
    author: string;
    ups: number;
    created_utc: number;
    subreddit: string;
    /*  the best practice would be to serialize the json data recived from reddit and create a model that is
        only 'known' by the front-end, but for our purpose this will do
    */
    date: Date;
  };
}
