import * as React from "react";
import { cn } from "@/lib/utils";
import ColSection from "./col-section";
import GradientBorder from "./gradient-border";

interface TextSectionProps {
  titleWidth?: number;
  contentWidth?: number;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

// Utility function to process text and add random gradient effects
function processTextWithGradients(text: string): React.ReactNode[] {
  const separators = /([,.?!])/g;
  const parts = text.split(separators);
  const processedParts: React.ReactNode[] = [];
  
  let key = 0;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    
    
    // For text parts, process words
    const words = part.split(/(\s+)/); // Split on whitespace but keep spaces

    // Collect all non-whitespace words with their indices
    const validWordIndices: number[] = [];
    words.forEach((word, wordIndex) => {
      if (word.trim().length > 0) {
        validWordIndices.push(wordIndex);
      }
    });
    
    // Choose one random word index to apply gradient to
    const randomWordIndex = validWordIndices.length > 0 
      ? validWordIndices[Math.floor(Math.random() * validWordIndices.length)]
      : -1;
    
    words.forEach((word, wordIndex) => {
      if (word.match(/^\s+$/)) {
        // If it's just whitespace, add it as is
        processedParts.push(word);
      } else if (word.trim().length > 0) {
        // Apply gradient only to the randomly selected word
        if (wordIndex === randomWordIndex) {
          const randomReverse = Math.random() < 0.5;
          processedParts.push(
            <GradientBorder key={key++} reverse={randomReverse}>
              {word}
            </GradientBorder>
          );
        } else {
          processedParts.push(word);
        }
      }
    });

  }
  
  return processedParts;
}

// Hook to memoize the processed text to prevent re-randomization on re-renders
function useProcessedText(children: React.ReactNode): React.ReactNode {
  return React.useMemo(() => {
    if (typeof children === 'string') {
      return processTextWithGradients(children);
    }
    return children;
  }, [children]);
}

function TextSection({
  titleWidth = 1,
  contentWidth = 3,
  className,
  titleClassName,
  contentClassName,
  children,
  ...props
}: TextSectionProps & React.HTMLAttributes<HTMLDivElement>) {
  const childrenArray = React.Children.toArray(children);
  const titleElement = childrenArray.find(child => 
    React.isValidElement(child) && child.type === TextSectionTitle
  );
  const contentElement = childrenArray.find(child => 
    React.isValidElement(child) && child.type === TextSectionContent
  );

  return (
    <div
      className={cn(
        "tablet:flex-row tablet:gap-6 tablet:px-[24px] tablet:py-[64px] desktop:px-[64px] desktop:py-[70px] flex shrink-0 flex-col items-start gap-12 px-[24px] py-[30px]",
        className
      )}
      {...props}
    >
      {/* Mobile layout - Title */}
      {titleElement && (
        <div className="tablet:hidden">
          <ColSection width={2}>
            <div className={cn("text-white", titleClassName)}>
              {titleElement}
            </div>
          </ColSection>
        </div>
      )}
      
      {/* Tablet/Desktop layout - Title */}
      {titleElement && (
        <div className="hidden tablet:block">
          <ColSection width={titleWidth}>
            <div className={cn("text-white", titleClassName)}>
              {titleElement}
            </div>
          </ColSection>
        </div>
      )}

      {/* Mobile layout - Content */}
      {contentElement && (
        <div className="tablet:hidden">
          <ColSection width={2}>
            <div className={cn("text-white", contentClassName)}>
              {contentElement}
            </div>
          </ColSection>
        </div>
      )}
      
      {/* Tablet/Desktop layout - Content */}
      {contentElement && (
        <div className="hidden tablet:block">
          <ColSection width={contentWidth}>
            <div className={cn("text-white", contentClassName)}>
              {contentElement}
            </div>
          </ColSection>
        </div>
      )}
    </div>
  );
}

// Additional components for more flexibility
function TextSectionTitle({ 
  className, 
  children,
  enableGradientWords = false,
  ...props 
}: React.HTMLAttributes<HTMLHeadingElement> & {
  enableGradientWords?: boolean;
}) {
  const processedChildren = enableGradientWords ? useProcessedText(children) : children;
  
  return (
    <h1
      className={cn(
        "text-5xl px-4 font-extralight font-(family-name:--font-heading) leading-[110%] tracking-[-0.2px]",
        className
      )}
      {...props}
    >
      {processedChildren}
    </h1>
  );
}

function TextSectionContent({ 
    className, 
    children,
    enableGradientWords = false,
    as = 'p',
    ...props 
}: React.HTMLAttributes<HTMLElement> & {
    enableGradientWords?: boolean;
    as?: 'p' | 'div';
}) {
    const processedChildren = enableGradientWords ? useProcessedText(children) : children;
    
    const Component = as;
    
    return (
        <Component
            className={cn(
                "px-4 text-justify text-5xl font-(family-name:--font-heading-light) leading-[110%] tracking-[-0.2px]",
                className
            )}
            {...props}
        >
            {processedChildren}
        </Component>
    );
}

export { TextSection, TextSectionTitle, TextSectionContent };
