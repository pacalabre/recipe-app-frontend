export type Recipe = {
  _id?: string;
  recipeName: string;
  subtitle?: string;
  author: {
    _id: string;
    name?: string;
    userName?: string;
  };
  favorites?: string[];
  dateCreated?: Date;
  tags?: string[];
  recipeDifficulty: string;
  totalMakeTime?: string;
  ingredients: string;
  description: string;
  recipeInstructions: string;
};
