import ProductDetails from "@/components/shared/ProductDetails";
import { Box } from "@mui/material";

type PageProps = {
  params: Promise<{
    mainCategorySlug: string;
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <Box>
      <ProductDetails slug={id} />
    </Box>
  );
}
