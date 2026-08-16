function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

// Test
const people = ["Almaz", "Dawit", "Tigist"];

save("people", people);

const loadedPeople = load("people");

console.log("Saved:", people);
console.log("Loaded:", loadedPeople);
