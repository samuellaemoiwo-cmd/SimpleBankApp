# Simple Mobile Banking App

A mobile application built with Expo (React Native) that allows users to view their account balance, transfer money, and view transaction history.

## Links

- **Source Code (GitHub):** https://github.com/samuellaemoiwo-cmd/SimpleBankApp.git
- **Website URL (web preview):** simplebanka.netlify.app 


## Features
- View current account balance
- Transfer money to a recipient (with input validation)
- View a history of all past transactions

## Tech Stack
- React Native (Expo)
- Expo Router (file-based navigation)
- React Context API (for shared state management)
- TypeScript

## Project Structure

app/
(tabs)/
index.tsx      → Home screen (balance + recent transactions)
explore.tsx     → Transfer screen
history.tsx     → Transaction history screen
_layout.tsx      → Tab navigation layout
_layout.tsx        → Root layout (wraps app in BankProvider)
context/
BankContext.tsx    → Shared state: balance, transactions, addTransaction

## Installation & Setup
1. Clone or download this project
2. Install dependencies:
   npm install
3. Start the development server:
   npx expo start

4. Scan the QR code with the Expo Go app (or run on an emulator)

## How It Works
- Balance and transaction data are stored in a shared `BankContext`, accessible from all three screens.
- Making a transfer subtracts the amount from the balance and adds a new record to transaction history.
- Input validation prevents blank recipients, invalid amounts, and transfers exceeding the available balance.

## Test Cases
| Test | Expected Result | Result |
|------|-----------------|--------|
| Transfer more than balance | Shows "Insufficient funds" alert | Pass |
| Blank recipient field | Shows "Missing recipient" alert | Pass |
| Zero or negative amount | Shows "Invalid amount" alert | Pass |
| Valid transfer | Balance decreases, transaction appears in history | Pass |