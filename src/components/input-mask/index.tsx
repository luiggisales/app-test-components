import * as React from "react";
import { cn } from "@/lib/utils";
import Mask from 'react-input-mask';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
}

const InputMask = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask = '', ...props }, ref) => {
    return (
      <Mask
        type={type}
        mask={mask}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
        inputRef={ref as React.RefObject<HTMLInputElement>}
      />
    )
  }
);

InputMask.displayName = "InputMask";

export { InputMask };