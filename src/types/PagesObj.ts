type MainInfo = {
  image: string;
  description: string;
};

export interface PagesObj {
  id: number;
  name: string;
  title: string;
  main_info: Array<MainInfo>;
  meta_title: string;
  meta_description: string;
  meta_keys: string;
}
