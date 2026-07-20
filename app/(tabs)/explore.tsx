import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useBank } from '@/context/BankContext';

export default function TransferScreen() {
  const { balance, addTransaction } = useBank();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    const numericAmount = parseFloat(amount);

    if (!recipient.trim()) {
      Alert.alert('Missing recipient', 'Please enter who you are sending money to.');
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount greater than 0.');
      return;
    }
    if (numericAmount > balance) {
      Alert.alert('Insufficient funds', 'You do not have enough balance for this transfer.');
      return;
    }

    addTransaction({
      id: Date.now().toString(),
      type: 'transfer',
      amount: numericAmount,
      recipient: recipient.trim(),
      date: new Date().toISOString().split('T')[0],
    });

    Alert.alert('Success', `Le ${numericAmount.toFixed(2)} sent to ${recipient.trim()}`);
    setRecipient('');
    setAmount('');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Transfer Money</ThemedText>
      <ThemedText style={styles.balanceText}>Available Balance: Le {balance.toFixed(2)}</ThemedText>

      <ThemedText style={styles.label}>Recipient</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter recipient name"
        value={recipient}
        onChangeText={setRecipient}
      />

      <ThemedText style={styles.label}>Amount</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <ThemedText style={styles.buttonText}>Send Money</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    marginTop: 40,
  },
  balanceText: {
    marginBottom: 12,
    opacity: 0.7,
  },
  label: {
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0a7ea4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});