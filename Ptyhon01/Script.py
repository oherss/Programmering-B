import math
import os

name = "Joe"
age = 32

items = ["phone", "wallet", "keys"]



def Welcome(name):
    print(f"Hello, {name}!")

def About(name, age, things):
    Welcome(name)
    print(f"You are {age} years old")
    for thing in things:
        print(f"You have your {thing}")

def AddThenPrint(num1, num2):
    num3= num1 + num2
    print(f"{num1} + {num2} = {num3}")

About(name, age, items)

print("Let's do some math!")
print("let's start with addition, enter the first number!")
num1 = int(input())
print("+")
num2 = int(input())
AddThenPrint(num1, num2)
