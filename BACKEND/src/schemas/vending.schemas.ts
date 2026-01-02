import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Category name is required'),
    description: z.string().min(1, 'description is required')
});

export type Productcategory = z.infer<typeof createCategorySchema>;


export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price cannot be less than 0.00'),
  category: z.string().min(1, "Category name is required"),
  imageUrl: z.string().url().min(1, "Image url is required"),
  serialNo: z.string().optional()
});

export type Product = z.infer<typeof createProductSchema>; // This auto-generates a typeScript type at compile time.


export const createVendingMachine = z.object({
    name: z.string().min(1, 'Vending name is required'),
    vendLocation: z.string().min(1, 'Vending location is required'),
    isActive: z.boolean()
});

export type VendingMachine = z.infer<typeof createVendingMachine>;


export const createMachineInventory = z.object({
    machineName: z.string().min(1, 'Machine name is required'),
    productName: z.string().min(1, 'Product name is required'),
    quantity: z.number().positive('Quantity cannot be less than 0'),
    slotCode: z.string().min(2, 'SlotCode has to contain two text, a letter and a number.')
});

export type machineInventory = z.infer<typeof createMachineInventory>;


export const createMachineTransaction  = z.object({
    machineName: z.string().min(1, 'Machine name is required'),
    productName: z.string().min(1, 'Product name is required'),
    amount: z.number().positive('Amount cannot be less than 0.00'),
    status: z.enum(['success', 'failed'])
});

export type machineTransaction = z.infer<typeof createMachineTransaction>;