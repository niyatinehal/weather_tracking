import React from "react";
import { cn } from "../../utils/utils";

// Base Card component
export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-md transition-all duration-300 ease-in-out sm:p-4 p-3",
        className
      )}
      {...props}
    />
  );
}

// Header
export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 sm:space-y-1.5 sm:p-6 p-4",
        className
      )}
      {...props}
    />
  );
}

// Title
export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn(
        "text-xl sm:text-2xl font-semibold leading-tight tracking-tight",
        className
      )}
      {...props}
    />
  );
}

// Description
export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground sm:text-base",
        className
      )}
      {...props}
    />
  );
}

// Content
export function CardContent({ className, ...props }) {
  return (
    <div
      className={cn(
        "sm:p-6 p-4 pt-0",
        className
      )}
      {...props}
    />
  );
}

// Footer
export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center sm:justify-between sm:p-6 p-4 pt-0 gap-4",
        className
      )}
      {...props}
    />
  );
}
