import React, { createContext, useContext, useState, ReactNode } from 'react';

type Transaction = {
  id: string;
  type: 'deposit' | 'transfer';
  amount: number;
  recipient?: string;
  date: string;
};

type BankContextType = {
  balance: number;
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
};

const BankContext = createContext<BankContextType | undefined>(undefined);

export function BankProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(500); // starting balance
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (t: Transaction) => {
    setTransactions((prev) => [t, ...prev]);
    if (t.type === 'transfer') {
      setBalance((prev) => prev - t.amount);
    } else {
      setBalance((prev) => prev + t.amount);
    }
  };

  return (
    <BankContext.Provider value={{ balance, transactions, addTransaction }}>
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  const context = useContext(BankContext);
  if (!context) throw new Error('useBank must be used within a BankProvider');
  return context;
}