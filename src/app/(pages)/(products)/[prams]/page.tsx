import MainCategoryProducts from "./components/MainCategoryProducts";

type PageProps = {
  params: {
    prams: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { prams } = await params;
  return <MainCategoryProducts prams={prams} />;
}
