price = float(input("The price is:"))
def discount(price, discount_percent=10):
    discount_amount = price * (discount_percent / 100)
    final_amount = price - discount_amount
    return final_amount
print("The final price after discount is:", discount(price))