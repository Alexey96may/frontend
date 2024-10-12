export interface CardProps {
  title: string;
  description: string | null;
  endlink: number;
  year: number | null;
  isAvailable: boolean;
  isSelling: boolean;
  imagePath: [string | null, string | null, string | null];
}
