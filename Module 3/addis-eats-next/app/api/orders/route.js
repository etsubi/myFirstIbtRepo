export async function POST(request) {
  const body = await request.json();

  const { name, phone } = body;

  if (!name || !phone) {
    return Response.json(
      {
        error: "Name and phone are required.",
      },
      {
        status: 422,
      },
    );
  }

  if (!/^09\d{8}$/.test(phone)) {
    return Response.json(
      {
        error: "Enter a valid Ethiopian phone number.",
      },
      {
        status: 422,
      },
    );
  }

  return Response.json(
    {
      message: "Order created successfully.",
    },
    {
      status: 201,
    },
  );
}
