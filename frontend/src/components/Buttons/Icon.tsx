import { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";

const IconButton = ({
  label,
  Icon,
  ...props
}: {
  label: string;
  Icon: (props: any) => ReactNode;
} & ButtonProps) => {
  return (
    <Button size="lg" className="h-16 text-lg" {...props}>
      {label} <Icon className="ml-1.5" />
    </Button>
  );
};

export default IconButton;
