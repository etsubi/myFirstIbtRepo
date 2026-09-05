customers = {}

try:
    with open("transactions.txt", "r") as file:
        for line in file:
            name, amount = line.strip().split(",")
            amount = float(amount)

            if name in customers:
                customers[name] += amount
            else:
                customers[name] = amount

    sorted_customers = sorted(
        customers.items(),
        key=lambda item: item[1],
        reverse=True
    )

    for name, total in sorted_customers:
        print(f"{name}: {total}")

    with open("report.txt", "w") as report:
        for name, total in sorted_customers:
            report.write(f"{name}: {total}\n")

except FileNotFoundError:
    print("Error: transactions.txt was not found.")