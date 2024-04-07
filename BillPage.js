import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Sms from 'react-native-sms'; // Import the SMS library

export default function BillPage({ navigation, route }) {
  const { cartItems, totalAmount } = route.params;
  let billCounter = 10598;

  const handlePayment = () => {
    // Generate a bill string (customize this based on your needs)
    const billNumber = `${billCounter}`;
    billCounter++;
    const recipientName = 'Dhanvanth'; // Set the recipient's name
    const billInfo = `Bill Number: ${billNumber}\nRecipient: ${recipientName}\nTotal Amount: ₹${totalAmount}\nStatus: Paid\nUPI ID: ${generateRandomUPIId()}`;
    // Define the recipient's phone number
    const recipient = '7907665638'; // Replace with the recipient's phone number

    // Send the SMS
    Sms.send(
      recipient,
      billInfo,
      (completed, cancelled, error) => {
        if (completed) {
          console.log('Message sent successfully');
        } else if (cancelled) {
          console.log('Message sending cancelled');
        } else if (error) {
          console.error('Error sending message:', error);
        }
      }
    );

    // Navigate to the QRCodePage with bill information
    navigation.navigate('QRCodePage', { billInfo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PSG Food Court</Text>
      <Text style={styles.heading}>Ordered Food</Text>
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
            <Text style={styles.itemAmount}>₹{item.price * item.quantity}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      )}
      <Text style={styles.totalPrice}>Total Amount: ₹{totalAmount}</Text>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
}

// Function to generate a random UPI ID
function generateRandomUPIId() {
  const min = 100000000000; // Minimum 12-digit number
  const max = 999999999999; // Maximum 12-digit number
  const randomUPIId = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomUPIId.toString(); // Convert to string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#f4f4f4', // Set a background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Text color
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#555', // Text color
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 16,
    color: '#333', // Text color
  },
  itemQuantity: {
    fontSize: 16,
    color: '#555', // Text color
  },
  itemAmount: {
    fontSize: 16,
    color: 'green', // Text color
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green', // Text color
  },
  emptyCart: {
    fontSize: 16,
    marginTop: 20,
    color: '#777', // Text color
  },
});
