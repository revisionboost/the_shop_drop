import Page from "@/components/Page";
import AddIngredient from "./sub-pages/AddIngredient";

export default function Ingredients({}){

  const subPages = [
    {
      title: "📚\xa0\xa0Library",
      content: <p>hi</p>
    },
    {
      title: "🥦\xa0\xa0Add Ingredient",
      content: <AddIngredient />
    },
  ];

  return (
    <Page subPages={subPages}/>
  );
}
