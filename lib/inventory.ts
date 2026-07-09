import { InventoryStatus } from "@/lib/generated/prisma/enums";

export function calculateInventoryStatus(
  quantityOnHand: number,

  lowStockThreshold: number,
): InventoryStatus {
  if (quantityOnHand <= 0) {
    return InventoryStatus.OUT_OF_STOCK;
  }

  if (quantityOnHand <= lowStockThreshold) {
    return InventoryStatus.LOW_STOCK;
  }

  return InventoryStatus.IN_STOCK;
}
