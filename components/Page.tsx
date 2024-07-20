"use client";
import { useState } from "react";

type SubPage = {
  title: string,
  content: React.ReactNode
}

type PageProps = {
  subPages: SubPage[]
}

type SubPageButtonProps = {
  title: string,
  index: number,
  selected: boolean,
}

export default function Page({ subPages }: PageProps){

  const [contentIndex, setContentIndex] = useState<number>(0);

  function SubPageButton({title, index, selected}: SubPageButtonProps){
    return(
      <button onClick={()=>{
          setContentIndex(index);
        }}
        className={`${selected ? `font-semibold` : ``} hover:bg-[#ededed] w-full text-left p-2 rounded-md transition-colors whitespace-nowrap text-green-dark`}
      >
        {title}
      </button>
    );
  }

  return (
    <div className={`w-full min-h-full flex justify-center bg-[#fafafa] px-4 md:px-8 py-10 md:py-16`}>
      <div className={`w-full max-w-[1200px] grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[min-content_1fr] gap-10`}>
        <div className={`flex flex-col gap-2`}>
          {subPages.map((subPage, index)=>{
            return(
              <div key={index}>
                <SubPageButton title={subPage.title} index={index} selected={index === contentIndex}/>
              </div>
            );
          })}
        </div>
        <div>
          <div className={`rounded-lg bg-white border p-6`}>
            {subPages[contentIndex].content}
          </div>
        </div>
      </div>
    </div>
  );
}
