import React from "react";
import { Link } from "react-router-dom";

interface ListItemProps {
  title: string;
  subtitle?: string;
  image?: string;
  href?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  image,
  href,
}) => {
  const content = (
    <>
      {image && (
        <div className="mr-4 flex-shrink-0">
          <div className="w-16 h-16 relative overflow-hidden rounded-full">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
    </>
  );

  return (
    <div className="flex items-center p-4 mb-4 bg-white rounded-lg shadow-md border-l-4 border-primary-600 animate-fadeInUp gap-4 cursor-pointer hover:shadow-lg transition-shadow">
      {href ? (
        <Link to={href} className="flex items-center w-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

export default ListItem;
