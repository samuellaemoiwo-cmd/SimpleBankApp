import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useBank } from '@/context/BankContext';
import { FlatList, StyleSheet } from 'react-native';

export default function HistoryScreen() {
  const { transactions } = useBank();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Transaction History</ThemedText>

      {transactions.length === 0 ? (
        <ThemedText style={styles.emptyText}>No transactions yet.</ThemedText>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ThemedView style={styles.row}>
              <ThemedView style={styles.rowLeft}>
                <ThemedText type="defaultSemiBold">
                  {item.type === 'transfer' ? `To ${item.recipient}` : 'Deposit'}
                </ThemedText>
                <ThemedText style={styles.date}>{item.date}</ThemedText>
              </ThemedView>
              <ThemedText style={styles.amount}>
                {item.type === 'transfer' ? '-' : '+'}Le {item.amount.toFixed(2)}
              </ThemedText>
            </ThemedView>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  emptyText: {
    marginTop: 20,
    opacity: 0.7,
  },
  list: {
    gap: 4,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  rowLeft: {
    gap: 2,
  },
  date: {
    opacity: 0.6,
    fontSize: 12,
  },
  amount: {
    fontWeight: '600',
  },
});