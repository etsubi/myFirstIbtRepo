class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Must be positive")
        self.__balance += amount

    def withdraw(self, amount):
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount

    def statement(self):
        print(f"""
Account Type: Account
Owner: {self.owner}
Account Number: {self.account_number}
Balance: {self.__balance} ETB
""")


class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        self.deposit(self.balance * self.rate)

    def statement(self):
        print(f"""
Account Type: Savings Account
Owner: {self.owner}
Account Number: {self.account_number}
Balance: {self.balance} ETB
""")


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft=1000):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount > self.balance + self.overdraft:
            raise ValueError("Over limit")
        self._Account__balance -= amount

    def statement(self):
        print(f"""
Account Type: Current Account
Owner: {self.owner}
Account Number: {self.account_number}
Balance: {self.balance} ETB
""")


bank = [
    SavingsAccount("Almaz", "CBE-1001", 1500),
    CurrentAccount("Dawit", "CBE-1002", 800),
]

for account in bank:
    account.statement()