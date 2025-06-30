import React from "react";

type SectionHeaderProps = {
  title: string;
  subTitle: string;
  description?: string;
  icon?: React.ReactNode;
  alignment?: "left" | "center" | "right";
};

export default function SectionHeader({
  title,
  subTitle,
  description,
  icon,
  alignment = "center",
}: SectionHeaderProps) {
  const alignmentMap: Record<string, string> = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const alignmentClass = alignmentMap[alignment] || alignmentMap.left;
  const isCentered = alignment === "center";

  return (
    <div className={`flex flex-col gap-3 ${alignmentClass}`}>
      <div
        className={`flex ${
          isCentered ? "flex-col gap-4" : "flex-row gap-3"
        } items-center`}
      >
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-wider">
            {subTitle}
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {title}
          </h2>
        </div>
      </div>

      {description && <p className="text-gray-600 max-w-2xl">{description}</p>}
    </div>
  );
}
