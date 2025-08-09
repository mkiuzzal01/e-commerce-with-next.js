import SubCategoryProducts from "./components/SubCategoryProducts";
type PageProps = {
  params: {
    prams: string;
    sub_slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { prams, sub_slug } = await params;
  return <SubCategoryProducts params={{ prams, sub_slug }} />;
}
