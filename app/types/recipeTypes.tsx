export type Recipe = {
  _id: string;
  recipeName: string;
  subtitle: string;
  author: {
    _id: string;
  };
  name: string;
  userName: string;
  favorite: [string];
  dateCreated: Date;
  ingredients: string;
  description: string;
  instructions: string;
};
