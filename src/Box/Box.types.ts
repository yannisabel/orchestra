import { ElementType, ReactNode } from "react";

export interface BoxProps<T extends ElementType> {
  as?: T;
  className?: string
  children?: ReactNode;
}
