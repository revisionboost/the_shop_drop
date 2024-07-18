"use client";
import Page from "@/components/Page";
import UnitLibrary from "./sub-pages/UnitLibrary";

export default function Units({}){

  const subPages = [
    {
      title: "📚\xa0\xa0Library",
      content: <UnitLibrary />
    },
    {
      title: "📏\xa0\xa0Add Unit",
      content: <p>hi again</p>
    },
  ];

  return (
    <Page subPages={subPages}/>
  );
}
