import CategoryProducts from "./components/CategoryProducts";
type PageProps = {
  params: Promise<{
    mainCategorySlug: string;
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { mainCategorySlug, slug } = await params;
  return <CategoryProducts params={{ mainCategorySlug, slug }} />;
}
