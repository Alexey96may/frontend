export interface CoinsObj {
  circulation: number | null;
  coin_kind: "регулярные" | "юбилейные" | "другие";
  coin_type: "монеты" | "банкноты" | "марки" | "облигации" | "другое";
  count: number;
  country: string | null;
  created_at: string;
  updated_at: string;
  denomination: number | null;
  description: string | null;
  diameter: number | null;
  id: number;
  image_additional: string | null;
  image_back: string | null;
  image_front: string | null;
  inСirculation: boolean | number;
  isSelling: boolean | number;
  likes: number;
  material: string | null;
  meta_description: string | null;
  meta_keys: string | null;
  meta_title: string | null;
  price: number | null;
  producer: string | null;
  safety:
    | "Poor"
    | "Fair"
    | "AG"
    | "G"
    | "VG"
    | "F"
    | "VF"
    | "XF"
    | "AU"
    | "UNC";
  series: string | null;
  status: "draft" | "publish" | "invisible";
  thickness: number | null;
  title: string;
  user_id: number;
  views: number;
  year: number | null;
  weight: number | null;
}
