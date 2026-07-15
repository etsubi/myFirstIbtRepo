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
            print("Deposit amount must be positive.")
            return

        self.__balance += amount
        print(f"{amount} ETB deposited successfully.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return

        if amount > self.__balance:
            print("Insufficient funds.")
            return

        self.__balance -= amount
        print(f"{amount} ETB withdrawn successfully.")

    def statement(self):
        print(f"""
Owner: {self.owner}
Account Number: {self.account_number}
Balance: {self.__balance} ETB
""")

account1 = Account("Eshetu", "1001", 1000)
account2 = Account("Abel", "1002", 500)

account1.deposit(500)
account1.withdraw(300)
account2.deposit(-50)
account2.withdraw(700)
account1.statement()
account2.statement()