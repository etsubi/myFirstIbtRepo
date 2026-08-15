async function getDetails() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    const firstTwo = posts.slice(0, 2);
    const users = await Promise.all(
      firstTwo.map(async function (post) {
        const userRes = await fetch(
          `https://jsonplaceholder.typicode.com/users/${post.userId}`,
        );

        if (!userRes.ok) {
          throw new Error("Failed to fetch user " + post.userId);
        }

        return userRes.json();
      }),
    );

    console.log("Users:", users);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

getDetails();
