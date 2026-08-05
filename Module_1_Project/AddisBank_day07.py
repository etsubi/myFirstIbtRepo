class SMSAlert:
    def update(self, message):
        print(f"SMS Alert: {message}")


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self._balance = balance
        self.observers = []

        # New Day 7: Stack for transaction history
        self.history = []

    def subscribe(self, observer):
        self.observers.append(observer)

    def notify(self, message):
        for observer in self.observers:
            observer.update(message)

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        self._balance += amount

        # push transaction into stack
        self.history.append(f"Deposited {amount} ETB")

        self.notify(f"{amount} ETB deposited")

    def withdraw(self, amount):
        if amount > self._balance:
            print("Insufficient funds")
            return

        self._balance -= amount

        # push transaction into stack
        self.history.append(f"Withdrew {amount} ETB")

        self.notify(f"{amount} ETB withdrawn")

    def undo_last(self):
        if self.history:
            last = self.history.pop()
            print(f"Undo: {last}")
        else:
            print("No transactions to undo")

    def statement(self):
        print(f"""
Owner: {self.owner}
Account Number: {self.number}
Balance: {self._balance} ETB
History: {self.history}
""")


class SavingsAccount(Account):
    def add_interest(self):
        self.deposit(self._balance * 0.05)


class CurrentAccount(Account):
    pass


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind == "savings":
            return SavingsAccount(owner, number, balance)

        if kind == "current":
            return CurrentAccount(owner, number, balance)


class AccountRegistry:

    def __init__(self):
        self.accounts = {}   # account number -> account

    def add(self, account):
        self.accounts[account.number] = account

    def find(self, number):
        return self.accounts.get(number)

    def list_all(self):
        return self.accounts.values()

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

registry = AccountRegistry()

registry.add(account1)
registry.add(account2)

sms = SMSAlert()

account1.subscribe(sms)
account2.subscribe(sms)

account1.deposit(500)
account1.withdraw(200)

account2.deposit(300)

found_account = registry.find("CBE-1")

found_account.statement()

found_account.undo_last()

found_account.statement()

for account in registry.list_all():
    account.statement()