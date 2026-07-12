Temp = int(input("Enter the temperature in °C: "))

if Temp < 15:
    print("It's cold")
elif Temp >= 15 and Temp <= 28:
    print("It's warm")
else:
    print("It's hot")