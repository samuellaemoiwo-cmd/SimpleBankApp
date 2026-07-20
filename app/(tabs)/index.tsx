import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useBank } from '@/context/BankContext';

export default function HomeScreen() {
  const { balance, transactions } = useBank();
  const recentTransactions = transactions.slice(0, 3);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My Account</ThemedText>

      <ThemedView style={styles.balanceCard}>
        <ThemedText type="subtitle">Current Balance</ThemedText>
        <ThemedText type="title" style={styles.balanceAmount}>
          Le {balance.toFixed(2)}
        </ThemedText>
      </ThemedView>

      <ThemedText type="subtitle" style={styles.recentTitle}>
        Recent Transactions
      </ThemedText>
      {recentTransactions.length === 0 ? (
        <ThemedText>No transactions yet.</ThemedText>
      ) : (
        recentTransactions.map((t) => (
          <ThemedView key={t.id} style={styles.transactionRow}>
            <ThemedText>{t.type === 'transfer' ? `To ${t.recipient}` : 'Deposit'}</ThemedText>
            <ThemedText>Le {t.amount.toFixed(2)}</ThemedText>
          </ThemedView>
        ))
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    marginTop: 40,
  },
  balanceCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0,150,80,0.1)',
    gap: 4,
  },
  balanceAmount: {
    fontSize: 32,
  },
  recentTitle: {
    marginTop: 8,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});