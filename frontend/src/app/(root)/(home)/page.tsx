import IconButton from "@/components/Buttons/Icon";
import HeroText from "@/components/Text/Hero";
import { ArrowRight, BookIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroText text="Revolutionising lending through blockchain" />

      {/* Introduction */}
      <div className="flex flex-col items-center gap-2">
        <p className="max-w-prose text-primary sm:text-lg">
          We are a group of students from KKCEM Dhanbad.
        </p>
        <p className="max-w-prose text-primary sm:text-lg">
          We learn the emerging technologies together.
        </p>
        <div className="flex gap-7 mt-2 flex-col sm:flex-row">
          <Link href="/borrow">
            <IconButton label="Borrow" Icon={BookIcon} variant="secondary" />
          </Link>
          <IconButton label="Lend" Icon={ArrowRight} />
        </div>
      </div>
    </>
  );
}
