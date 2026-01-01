export enum category{
    DRINKS = "DRINKS",
    SNACKS = "SNACKS",
    CANDY = "CANDY",
    CHIPS = "CHIPS",
    BUISCUIT = "BUISCUIT"
}


export enum TransactionStatus{
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export interface image{
  id: bigint
}


export interface Product {
  id: bigint;
  name: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface Category {
  id: bigint;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface MachineInventory {
  id: bigint;
  vendingMachineId: string;
  productId: string;
  quantity: number;
  slotCode: string;
  updatedAt: Date;
}


export interface VendingMachine {
  id: bigint;
  name: string;
  location?: string;
  isActive: boolean;
  createdAt: Date;
}


export interface Transaction {
  id: bigint;
  vendingMachineId: bigint;
  productId: bigint;
  quantity: number;
  amountPaid: number;
  status: TransactionStatus;
  createdAt: Date;
}
