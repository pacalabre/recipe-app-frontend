import { Tag } from "./tagTypes";

export type Recipe = {
  _id?: string;
  image?: string;
  recipeName: string;
  author: {
    _id: string;
    name: string;
  };
  favorites?: string[];
  dateCreated?: Date;
  tags?: Tag[];
  recipeDifficulty: string;
  totalMakeTime?: string;
  ingredients: string;
  description: string;
  recipeInstructions: string;
};
