import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from './ui/BreadCrumb'; // Adjust import as needed
import Link from 'next/link'; // Adjust based on your routing setup

const DynamicBreadcrumb = ({ items }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink>
              {item.link ? (
                <Link href={item.link}>{item.label}</Link>
              ) : (
                item.label
              )}
            </BreadcrumbLink>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
