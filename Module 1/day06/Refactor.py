class AlertService:
    def send(self, message):
        print(message)


class SMSAlert:
    def update(self, message):
        print(f"SMS: {message}")


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self._balance = balance
        self.subscribers = []

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
        self.notify(f"{amount} ETB deposited")


class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.rate = 0.05

    def add_interest(self):
        self.deposit(self.balance * self.rate)


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.overdraft = 1000


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)

        if kind == "current":
            return CurrentAccount(owner, number, balance)

account1 = AccountFactory.create("savings", "Almaz", "CBE-1", 1500)
account2 = AccountFactory.create("current", "Dawit", "CBE-2", 800)

sms = SMSAlert()

account1.subscribe(sms)
account2.subscribe(sms)

account1.deposit(500)
account2.deposit(200)