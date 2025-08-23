import { useState } from "react";

export const useSelectionManagement = () => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );

  const handleSelectItem = (cartItemId: string, isSelected: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [cartItemId]: isSelected,
    }));
  };

  const handleSelectAll = (
    items: Array<{ cartItemId: string }>,
    selectAll: boolean
  ) => {
    const newSelectedItems: Record<string, boolean> = {};
    if (selectAll) {
      items.forEach((item) => {
        newSelectedItems[item.cartItemId] = true;
      });
    }
    setSelectedItems(newSelectedItems);
  };

  return {
    selectedItems,
    handleSelectItem,
    handleSelectAll,
  };
};
