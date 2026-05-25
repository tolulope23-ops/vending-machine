export interface Product {
  p_id: string;
  name: string;
  price: number;
  imageURL: string;
  category?: string;
  size?: string;
};

export interface SlotStock {
  slotCode: string;
  product: Product;
  quantity: number;
  capacity: number;
  soldCount: number;
  lastRestockedAt: string;
  status: "ACTIVE" | "INACTIVE";
};

export interface VendingMachine {
  machineId: string;
  slots: SlotStock[];
};