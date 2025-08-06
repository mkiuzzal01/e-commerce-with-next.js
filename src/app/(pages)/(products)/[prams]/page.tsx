import MainCategoryProducts from "./components/MainCategoryProducts";

type PageProps = {
  params: {
    prams: string;
  };
};

export default function Page({ params }: PageProps) {
  return <MainCategoryProducts prams={params?.prams} />;
}
