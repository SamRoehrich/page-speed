import React from "react";
export function BlogCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="col-span-2 hover:cursor-pointer grid grid-cols-2 gap-2 h-60 bg-gradient-to-br from-blue-100 via-purple-200 to-pink-300 rounded-xl shadow hover:shadow-lg p-4"
    >
      <div className="flex items-center">
        <h3 className="flex flex-col text-xl items-center">{title}</h3>
      </div>
      <div className="flex items-center">
        <p className="">{description}</p>
      </div>
    </a>
  );
}
