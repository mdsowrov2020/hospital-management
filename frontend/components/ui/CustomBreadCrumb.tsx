// components/Breadcrumb.js
import Link from "next/link";
import { Breadcrumb } from "antd";
import { useRouter } from "next/router";

const CustomBreadCrumb = () => {
  const router = useRouter();

  // Split the path into parts
  const pathParts = router.asPath.split("/").filter((part) => part !== "");

  // Build breadcrumb items
  let breadcrumbs = [];
  let currentPath = "";

  // Add Home as the first item
  breadcrumbs.push(
    <Breadcrumb.Item key="home">
      <Link href="/">Home</Link>
    </Breadcrumb.Item>
  );

  // Add other path parts
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    const isLast = index === pathParts.length - 1;

    breadcrumbs.push(
      <Breadcrumb.Item key={currentPath}>
        {isLast ? (
          part.charAt(0).toUpperCase() + part.slice(1) // Current page, no link
        ) : (
          <Link href={currentPath}>
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </Link>
        )}
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb style={{ margin: "16px 0" }}>{breadcrumbs}</Breadcrumb>;
};

export default CustomBreadCrumb;
