import MainCategoryProducts from "./components/MainCategoryProducts";

type PageProps = {
  params: Promise<{
    mainCategorySlug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { mainCategorySlug } = await params;
  return <MainCategoryProducts mainCategorySlug={mainCategorySlug} />;
}
