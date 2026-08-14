async function testErrors() {
  try {
    const res = await fetch("https://this-url-does-not-exist-example.com/data");

    if (!res.ok) {
      throw new Error("HTTP error: " + res.status);
    }

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log("Network error caught:", error.message);
  }

  // 2. Real URL that returns 404
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users/999999",
    );

    console.log("404 response received");
    console.log("res.ok:", res.ok);
    console.log("status:", res.status);

    if (!res.ok) {
      throw new Error("HTTP error: " + res.status);
    }

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log("HTTP error caught:", error.message);
  }
}

testErrors();
