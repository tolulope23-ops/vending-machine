export enum category{
    DRINKS = "DRINKS",
    SNACKS = "SNACKS",
    CANDY = "CANDY",
    CHIPS = "CHIPS"
}

export enum TransactionStatus{
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface MachineInventory {
  id: string;
  vendingMachineId: string;
  productId: string;
  quantity: number;
  slotCode: string;
  updatedAt: Date;
}


export interface VendingMachine {
  id: string;
  name: string;
  location?: string;
  isActive: boolean;
  createdAt: Date;
}


export interface Transaction {
  id: string;
  vendingMachineId: string;
  productId: string;
  quantity: number;
  amountPaid: number;
  status: TransactionStatus;
  createdAt: Date;
}
