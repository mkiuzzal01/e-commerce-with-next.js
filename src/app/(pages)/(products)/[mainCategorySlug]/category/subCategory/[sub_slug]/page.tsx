import SubCategoryProducts from "./components/SubCategoryProducts";
type PageProps = {
  params: Promise<{
    mainCategorySlug: string;
    sub_slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { mainCategorySlug, sub_slug } = await params;
  return <SubCategoryProducts params={{ mainCategorySlug, sub_slug }} />;
}
