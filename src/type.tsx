export interface NewsDataType {
  author?: string;
  authors?: string;
  clean_url?: string;
  country?: string;
  excerpt?: string;
  is_opinion?: boolean;
  language?: string;
  link?: string;
  media?: string;
  published_date?: string;
  published_date_precision?: string;
  rank?: number;
  rights?: string;
  summary?: string;
  title?: string;
  topic?: string;
  twitter_account?: string;
  _id?: string;
  _score?: number;
}

export enum Topics {
  news = "news",
  sport = "sport",
  tech = "tech",
  world = "world",
  finance = "finance",
  politics = "politics",
  business = "business",
  economics = "economic",
  entertainment = "entertainment",
  beauty = "beauty",
  travel = "travel",
  music = "music",
  food = "food",
  science = "science",
  gaming = "gaming",
}
