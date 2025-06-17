import * as React from "react";
import { cn } from "@/lib/utils";
import ColSection from "./col-section";

interface TextSectionProps {
  titleWidth?: number;
  contentWidth?: number;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
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
  const titleElement = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === TextSectionTitle,
  );
  const contentElement = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === TextSectionContent,
  );

  return (
    <div
      className={cn(
        "tablet:flex-row tablet:gap-6 tablet:px-[24px] tablet:py-[64px] desktop:px-[64px] desktop:py-[70px] flex shrink-0 flex-col items-start gap-12 px-[24px] py-[30px]",
        className,
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
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-5xl px-4 font-extralight font-(family-name:--font-heading) leading-[110%] tracking-[-0.2px]",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function TextSectionContent({
  className,
  children,
  as = "p",
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  as?: "p" | "div";
}) {
  const Component = as;

  return (
    <Component
      className={cn(
        "px-4 text-justify text-5xl font-(family-name:--font-heading-light) leading-[110%] tracking-[-0.2px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export { TextSection, TextSectionTitle, TextSectionContent };
