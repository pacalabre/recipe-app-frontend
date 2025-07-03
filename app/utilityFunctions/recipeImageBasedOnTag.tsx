export const recipeImageBasedOnTag = (tag: any) => {
  let image = "";

  switch (tag) {
    case "italian":
      image = "italian.png";
      break;
    case "mexican":
      image = "mexican.png";
      break;
    case "asian":
      image = "asian.png";
      break;
    case "indian":
      image = "indian.png";
      break;
    case "french":
      image = "french.png";
      break;
    case "greek":
      image = "greek.png";
      break;
    case "spanish":
      image = "spanish.png";
      break;
    case "american":
      image = "american.png";
      break;
    case "caribbean":
      image = "caribbean.png";
      break;
    case "seafood":
      image = "seafood.png";
      break;
    case "vegetarian":
      image = "vegetarian.png";
      break;
    case "vegan":
      image = "vegan.png";
      break;
    case "breakfast":
      image = "breakfast.png";
      break;
    case "lunch":
      image = "lunch.png";
      break;
    case "dinner":
      image = "dinner.png";
      break;
    case "appetizers":
      image = "appetizers.png";
      break;
    case "snacks":
      image = "snacks.png";
      break;
    case "desserts":
      image = "desserts.png";
      break;
    case "weeknight":
      image = "weeknight.png";
      break;
    case "healthy":
      image = "healthy.png";
      break;
    case "date night":
      image = "datenight.png";
      break;
    case "cheap":
      image = "cheap.png";
      break;
    default:
      image = "cooking.png";
  }
  return {
    backgroundImage: `url(foodImages/${image})`,
  };
};
