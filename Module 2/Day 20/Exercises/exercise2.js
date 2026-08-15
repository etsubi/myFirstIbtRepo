async function getUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await res.json();

    console.log("Users:");

    users.forEach(function (user) {
      console.log(user.name);
    });
  } catch (error) {
    console.log("Error:", error.message);
  }
}

getUsers();
