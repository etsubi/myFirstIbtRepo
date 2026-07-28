class SMSAlert:
    def update(self, message):
        print(f"SMS Alert: {message}")


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self._balance = balance
        self.observers = []

    def subscribe(self, observer):
        self.observers.append(observer)

    def notify(self, message):
        for observer in self.observers:
            observer.update(message)

    def deposit(self, amount):
        self._balance += amount
        self.notify(f"{amount} ETB deposited")

    def statement(self):
        print(f"{self.owner}: {self._balance} ETB")


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


# Create accounts using Factory
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


# Observer
sms = SMSAlert()

account1.subscribe(sms)
account2.subscribe(sms)


# Test
account1.deposit(500)
account2.deposit(200)

account1.statement()
account2.statement()