import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function BlogPost({
  imgUrl,
  title,
  description,
  footerUrl,
  footer,
}: {
  imgUrl: string;
  title: string;
  description: string | JSX.Element;
  footer: string;
  footerUrl: string;
}) {
  return (
    <article className="relative rounded-lg backdrop-blur-lg shadow-2xl cursor-pointer">
      <Card className="w-[350px]">
        <CardImage src={imgUrl} />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Link href={footerUrl ?? ""} target="_blank">
              <p className="font-bold text-lg text-blue-500">
                {footer || "Read more"}
              </p>
            </Link>
            <ArrowRight className="text-blue-500" />
          </div>
          <GitHubLogoIcon className="h-10 w-10" />
        </CardFooter>
      </Card>
    </article>
  );
}
