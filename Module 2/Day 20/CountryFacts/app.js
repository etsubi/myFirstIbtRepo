const form = document.querySelector("#searchForm");
const input = document.querySelector("#countryInput");
const out = document.querySelector("#facts");

function render(out, label, value) {
  const container = document.createElement("div");

  container.className = "fact";

  const heading = document.createElement("h2");

  heading.textContent = label;

  const paragraph = document.createElement("p");

  paragraph.textContent = value;

  container.appendChild(heading);
  container.appendChild(paragraph);

  out.appendChild(container);
}

async function showCountry(name) {
  // Loading state
  out.textContent = "Loading...";

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`,
    );

    // HTTP error
    if (!res.ok) {
      throw new Error("Country not found");
    }

    const [country] = await res.json();

    // Clear loading message
    out.innerHTML = "";

    // Capital
    const capital = country.capital ? country.capital[0] : "N/A";

    // Population
    const population = country.population.toLocaleString();

    // Region
    const region = country.region || "N/A";

    // Currencies
    const currencies = country.currencies
      ? Object.values(country.currencies)
          .map(function (currency) {
            return currency.name;
          })
          .join(", ")
      : "N/A";
    const flag = country.flags ? country.flags.png : "";

    render(out, "Capital", capital);

    render(out, "Population", population);

    render(out, "Region", region);

    render(out, "Currencies", currencies);

    if (flag) {
      const image = document.createElement("img");

      image.src = flag;

      image.alt = country.name.common + " flag";

      image.className = "flag";

      out.appendChild(image);
    }
  } catch (error) {
    out.textContent = error.message;
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const countryName = input.value.trim();

  if (!countryName) {
    out.textContent = "Please enter a country name.";

    return;
  }

  showCountry(countryName);
});

showCountry("Ethiopia");
