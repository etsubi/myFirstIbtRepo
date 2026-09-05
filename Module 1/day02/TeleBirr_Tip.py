bill_total = 6000
people_number = 3
def split_bill(total, people, tip_rate=0.10):
    tip = total * tip_rate
    total_amount = total + tip
    share = total_amount / people
    return share
amount_per_person = split_bill(bill_total, people_number)
people=["Aster" , "Abebe" , "Alemayehu"]
for person in people:
    print(person, "pays", amount_per_person, "ETB")