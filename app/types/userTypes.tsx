export type User = {
  _id: string;
  name: string;
  userName: string;
  email: string;
  password?: string;
  dateCreated: Date;
  tagsUsed?: string[];
  savedRecipes?: string[];
};
