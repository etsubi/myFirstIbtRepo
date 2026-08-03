class SMSAlert:
    def update(self, message):
        print(f"SMS: {message}")


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self._balance = balance
        self.subscribers = []
        self.history = []

    def subscribe(self, observer):
        self.subscribers.append(observer)

    def notify(self, message):
        for observer in self.subscribers:
            observer.update(message)

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        self._balance += amount
        self.history.append(f"Deposit {amount}")
        self.notify(f"{amount} ETB deposited")

    def withdraw(self, amount):
        if amount > self._balance:
            print("Insufficient funds")
            return

        self._balance -= amount
        self.history.append(f"Withdraw {amount}")
        self.notify(f"{amount} ETB withdrawn")

    def statement(self):
        print(f"""
Owner: {self.owner}
Number: {self.number}
Balance: {self.balance} ETB
History: {self.history}
""")
class SavingsAccount(Account):
    pass

class CurrentAccount(Account):
    pass

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind == "savings":
            return SavingsAccount(owner, number, balance)

        if kind == "current":
            return CurrentAccount(owner, number, balance)

        raise ValueError("Unknown account type")


class AccountRegistry:

    def __init__(self):
        self.accounts = {}

    def add(self, account):
        self.accounts[account.number] = account

    def find(self, number):
        return self.accounts.get(number)


    def list_all(self):
        return list(self.accounts.values())

    def top_by_balance(self, n):

        accounts = sorted(
            self.accounts.values(),
            key=lambda acc: acc.balance,
            reverse=True
        )

        return accounts[:n]

    def binary_search(self, numbers, target):

        left = 0
        right = len(numbers) - 1

        while left <= right:

            middle = (left + right) // 2

            if numbers[middle] == target:
                return middle

            elif numbers[middle] < target:
                left = middle + 1

            else:
                right = middle - 1

        return -1


    def find_by_number(self, number):

        numbers = sorted(self.accounts.keys())

        index = self.binary_search(numbers, number)

        if index != -1:
            return self.accounts[numbers[index]]

        return None

    def total_transactions(self, account, index=0):

        if index == len(account.history):
            return 0

        return 1 + self.total_transactions(account, index + 1)


account1 = AccountFactory.create(
    "savings",
    "Almaz",
    "CBE-1",
    1500
)

account2 = AccountFactory.create(
    "current",
    "Dawit",
    "CBE-2",
    800
)

account3 = AccountFactory.create(
    "savings",
    "Sara",
    "CBE-3",
    3000
)

registry = AccountRegistry()

registry.add(account1)
registry.add(account2)
registry.add(account3)

account1.deposit(500)
account1.withdraw(200)

account2.deposit(300)

account3.deposit(1000)

print("Top Accounts:")

for account in registry.top_by_balance(2):
    print(account.owner, account.balance)

found = registry.find_by_number("CBE-2")

if found:
    print("\nFound:")
    found.statement()

total = registry.total_transactions(account1)

print(
    "\nTotal transactions:",
    total
)
