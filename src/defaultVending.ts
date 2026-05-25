import { VendingMachine } from "./vendingTypes";

export const defaultStock: VendingMachine = {
  machineId: "M001",

  slots: [
    {
      slotCode: "A1",
      product: {
        p_id: "COKE-500",
        name: "Coca-Cola",
        price: 400,
        imageURL: "./images/Coca-cola.png",
        category: "Drink",
        size: "500ml",
      },
      quantity: 5,
      capacity: 10,
      soldCount: 0,
      lastRestockedAt: new Date().toISOString(),
      status: "ACTIVE",
    },

    {
      slotCode: "A2",
      product: {
        p_id: "PEPSI-500",
        name: "Pepsi",
        price: 350,
        imageURL: "./images/Pepsi.png",
        category: "Drink",
        size: "500ml",
      },
      quantity: 5,
      capacity: 10,
      soldCount: 0,
      lastRestockedAt: new Date().toISOString(),
      status: "ACTIVE",
    },

    {
      slotCode: "A3",
      product: {
        p_id: "FANTA-500",
        name: "Fanta",
        price: 350,
        imageURL: "./images/Fanta.png",
        category: "Drink",
        size: "500ml",
      },
      quantity: 5,
      capacity: 10,
      soldCount: 0,
      lastRestockedAt: new Date().toISOString(),
      status: "ACTIVE",
    },

    {
      slotCode: "B1",
      product: {
        p_id: "WATER-75CL",
        name: "Bottle Water",
        price: 200,
        imageURL: "./images/Bottle-Water.png",
        category: "Drink",
        size: "75cl",
      },
      quantity: 6,
      capacity: 10,
      soldCount: 0,
      lastRestockedAt: new Date().toISOString(),
      status: "ACTIVE",
    },

    {
      slotCode: "B2",
      product: {
        p_id: "YOG-250",
        name: "Yoghurt",
        price: 500,
        imageURL: "./images/Yoghurt.png",
        category: "Drink",
        size: "250ml",
      },
      quantity: 4,
      capacity: 10,
      soldCount: 0,
      lastRestockedAt: new Date().toISOString(),
      status: "ACTIVE",
    },

    {
      slotCode: "B3",
      product: {
        p_id: "WM-400",
        name: "Wheat Milk",
        price: 450,
        imageURL: "./images/WheatMilk.png",
        category: "Drink",
        size: "400ml",
      },
      quantity: 4,
      capacity: 10,
      soldCount: 0,
      lastRestockedAt: new Date().toISOString(),
      status: "ACTIVE",
    },

    {
      slotCode: "C1",
      product: {
        p_id: "LAYS-50",
        name: "Lay Chips",
        price: 700,
        imageURL: "./images/Lay-Chips.png",
        category: "Snack",
        size: "50g",
      },
      quantity: 5,
      capacity: 10,
      soldCount: 0,
      lastRestockedAt: new Date().toISOString(),
      status: "ACTIVE",
    },

    {
      slotCode: "C2",
      product: {
        p_id: "PLANTAIN-50",
        name: "Plantain Chips",
        price: 600,
        imageURL: "./images/Plantain-Chips.png",
        category: "Snack",
        size: "50g",
      },
      quantity: 5,
      capacity: 10,
      soldCount: 0,
      lastRestockedAt: new Date().toISOString(),
      status: "ACTIVE",
    },
  ],
};