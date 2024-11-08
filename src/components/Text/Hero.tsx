import { cn } from "@/lib/utils";
import React from "react";

export interface HeroTextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  text: string;
}

const HeroText = ({ text, className }: HeroTextProps) => {
  return (
    <h1
      className={cn(
        "text-4xl font-bold lg:text-7xl max-w-[360px] md:max-w-[400px] lg:max-w-xl",
        className
      )}
    >
      {text}
    </h1>
  );
};

export default HeroText;
