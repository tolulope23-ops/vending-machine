import { VendingMachine } from "./vendingTypes";

// This takes up for initial view when you've not stored to the local storage
export const defaultStock: VendingMachine = {
  machineId: "M001",
  slots:[
    { 
      slotCode: "A1", product: {p_id: "COKE-500", name: "Coca-Cola", price: 1000, imageURL: "./images/Coca-cola.png", category: "Drink", size: "500ml"}, 
      quantity: 2, 
      capacity: 10,
      lastRestockedAt: new Date().toISOString(), 
      soldCount: 0, 
      status: "ACTIVE" 
    },

    { 
      slotCode: "A2", product: {p_id: "PEPSI-500", name: "Pepsi", price: 900, imageURL: "./images/Pepsi.png", category: "Drink", size: "500ml"}, 
      quantity: 5, 
      capacity: 10,
      lastRestockedAt: new Date().toISOString(), 
      soldCount: 0, 
      status: "ACTIVE" 
    },

    { 
      slotCode: "B3", product: {p_id: "Yoghurt-500ml", name: "Yoghurt", price: 900, imageURL: "./images/Yoghurt.png", category: "Drink", size: "500ml"}, 
      quantity: 5, 
      capacity: 10,
      lastRestockedAt: new Date().toISOString(), 
      soldCount: 0, 
      status: "ACTIVE" 
    },

    { 
      slotCode: "B5", product: {p_id: "Water-50CL", name: "BottleWater", price: 500, imageURL: "./images/Bottle-Water.png", category: "Snack", size: "50g"}, 
      quantity: 8, 
      capacity: 10,
      lastRestockedAt: new Date().toISOString(), 
      soldCount: 0, 
      status: "ACTIVE" 
    },

    { 
      slotCode: "C2", product: {p_id: "CHIPS-50G", name: "Plantain Chips", price: 500, imageURL: "./images/Plantain-Chips.png", category: "Snack", size: "50g"}, 
      quantity: 5, 
      capacity: 10,
      lastRestockedAt: new Date().toISOString(), 
      soldCount: 0, 
      status: "ACTIVE" 
    }
    
  ]
};