# Validated Persistent Signup Form

This project is a signup form that validates an Ethiopian name and phone number.

## What it does

The form:

- Accepts a user's full name
- Accepts an Ethiopian phone number
- Validates the name
- Validates the phone using a regular expression
- Shows clear error messages
- Saves valid signups to localStorage
- Restores saved signups after a page reload
- Shows how many people have signed up

## Validation

The phone number uses:

    /^(?:\+251|0)9\d{8}$/

It accepts numbers such as:

    0911223344

and:

    +251911223344

## Storage

Signups are saved to localStorage as JSON.

The application also handles:

- Missing localStorage data
- Corrupt localStorage data

## How to run

Open `index.html` with Live Server.
