const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 1050,
  },
  {
    id: "kitfo",
    name: "Kitfo",
    price: 1420,
  },
  {
    id: "tibs",
    name: "Tibs",
    price: 1290,
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    price: 580,
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    price: 520,
  },
];

export async function GET() {
  return Response.json(
    {
      dishes,
    },
    {
      status: 200,
    },
  );
}
