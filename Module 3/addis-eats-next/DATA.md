# Day 41 — Data Fetching Architecture

## Selected Feature: Menu Search with Category Filtering

### 1. What data is fetched?

The menu page fetches the list of dishes from `/api/dishes`.
Each dish contains an ID, name, price, and category.

### 2. Why is client-side data behavior needed?

Users need to search for dishes and select categories without reloading the page.
The menu also uses SWR to manage fetching, loading states, errors, and cached data.

### 3. Query key

The SWR query key is `/api/dishes`.
It identifies the menu data in the SWR cache.

### 4. Freshness and caching

The implementation sets `dedupingInterval` to 2000 milliseconds.
This helps prevent duplicate requests for the same key within two seconds.
It is not a guarantee that cached data remains fresh for two seconds.
No explicit periodic refresh interval is configured.

### 5. What triggers revalidation?

SWR is configured with `revalidateOnFocus: true`.
When the user returns to the browser tab, SWR can request updated menu data.
SWR also performs its normal initial fetching and revalidation behavior.

### 6. What happens after a mutation?

The menu search and category filter do not modify server data, so no mutation occurs.
If a future feature changes a dish, the menu cache should be revalidated after a successful update.

### 7. Is initial server data available?

No initial menu data is explicitly passed from a Server Component to SWR.
The client-side SWR hook fetches the data from `/api/dishes`.
The API currently returns a static list of five dishes.

### 8. Search and category filtering

Search input is debounced by 300 milliseconds.
The selected category and debounced search text are used to filter the fetched dishes in the browser.
Changing the search text or category does not change the SWR key or require another API request.

### 9. Loading, error, and empty states

- Loading: displays "Loading menu..."
- Error: displays a message when the menu request fails.
- Empty results: displays "No dishes match your search."
