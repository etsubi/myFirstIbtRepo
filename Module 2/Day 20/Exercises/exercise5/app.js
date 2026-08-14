const output = document.querySelector("#output");
async function loadData() {
  output.textContent = "Loading...";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    output.textContent = "Name: " + data.name;
  } catch (error) {
    output.textContent = "Error: " + error.message;
  }
}
loadData();
