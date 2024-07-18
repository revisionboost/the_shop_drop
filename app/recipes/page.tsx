"use client";
import Page from "@/components/Page";

export default function Recipes({}){

  const subPages = [
    {
      title: "📚\xa0\xa0Library",
      content: <p>example</p>
    },
    {
      title: "🍱\xa0\xa0Add Recipe",
      content: <p>example</p>
    },
  ];

  return (
    <Page subPages={subPages}/>
  );
}
