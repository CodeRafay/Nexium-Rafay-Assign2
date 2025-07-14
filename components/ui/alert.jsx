import * as React from "react";
import { cn } from "@/lib/utils";
//import { cn } from "../../lib/utils";

function Alert({ className, variant = "default", ...props }) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7",
        {
          default: "bg-background text-foreground",
          destructive: "border-destructive/50 text-destructive dark:border-destructive",
        }[variant],
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

export { Alert, AlertDescription };