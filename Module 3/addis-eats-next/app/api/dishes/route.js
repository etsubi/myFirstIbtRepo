const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 1050,
    category: "Traditional",
  },
  {
    id: "kitfo",
    name: "Kitfo",
    price: 1420,
    category: "Traditional",
  },
  {
    id: "tibs",
    name: "Tibs",
    price: 1290,
    category: "Traditional",
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    price: 580,
    category: "Dessert",
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    price: 520,
    category: "Dessert",
  },
];

export async function GET() {
  return Response.json({ dishes }, { status: 200 });
}
