declare module 'next/link' {
  import { ReactNode, MouseEventHandler } from 'react';
  
  export interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    legacyBehavior?: boolean;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
    onTouchStart?: MouseEventHandler<HTMLAnchorElement>;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    children?: ReactNode;
    className?: string;
    'aria-label'?: string;
  }
  
  export default function Link(props: LinkProps): JSX.Element;
}

declare module 'next/image' {
  import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
  
  export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    sizes?: string;
    loading?: 'lazy' | 'eager';
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    objectPosition?: string;
    className?: string;
    style?: React.CSSProperties;
  }
  
  declare const Image: React.FC<ImageProps>;
  export default Image;
}

declare module 'framer-motion' {
  import { ReactNode, ComponentType, HTMLAttributes } from 'react';
  
  export interface AnimatePresenceProps {
    children?: ReactNode;
    initial?: boolean;
    onExitComplete?: () => void;
    exitBeforeEnter?: boolean;
    presenceAffectsLayout?: boolean;
  }
  
  export const AnimatePresence: ComponentType<AnimatePresenceProps>;
  
  export interface MotionProps extends HTMLAttributes<HTMLElement> {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    whileHover?: any;
    whileTap?: any;
    whileFocus?: any;
    whileDrag?: any;
    drag?: boolean | 'x' | 'y';
    layout?: boolean;
    layoutId?: string;
  }
  
  export const motion: {
    div: ComponentType<MotionProps>;
    section: ComponentType<MotionProps>;
    button: ComponentType<MotionProps>;
    a: ComponentType<MotionProps>;
    span: ComponentType<MotionProps>;
    img: ComponentType<MotionProps>;
    p: ComponentType<MotionProps>;
    h1: ComponentType<MotionProps>;
    h2: ComponentType<MotionProps>;
    h3: ComponentType<MotionProps>;
    h4: ComponentType<MotionProps>;
    ul: ComponentType<MotionProps>;
    li: ComponentType<MotionProps>;
    svg: ComponentType<MotionProps>;
    path: ComponentType<MotionProps>;
  };
}

declare module 'react-error-boundary' {
  import { Component, ReactNode, ComponentType } from 'react';
  
  export interface FallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
  }
  
  export interface ErrorBoundaryProps {
    fallback?: ReactNode;
    FallbackComponent?: ComponentType<FallbackProps>;
    onError?: (error: Error, info: { componentStack: string }) => void;
    onReset?: () => void;
    resetKeys?: Array<any>;
    children?: ReactNode;
  }
  
  export class ErrorBoundary extends Component<ErrorBoundaryProps> {}
  
  export function useErrorHandler(error?: Error): (error: Error) => void;
  
  export function withErrorBoundary<P extends object>(
    Component: ComponentType<P>,
    errorBoundaryProps: ErrorBoundaryProps
  ): ComponentType<P>;
} 