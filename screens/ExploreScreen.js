// screens/ExploreScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Gainers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'ZANIP0AKHH39GJGC';
  // const API_KEY = 'demo';
  const API_URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`;

  const [data, setData] = useState({
    Gainers: [],
    Losers: [],
  });

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      // console.log('res explore:', result);

      const updatedData = {
        Gainers: result.top_gainers,
        Losers: result.top_losers,
      };

      setData(updatedData);
    } catch (error) {
      setError(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('Gainers')}
          style={[styles.tab, activeTab === 'Gainers' && styles.activeTab]}>
          <Text style={styles.tabText}>Top Gainers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('Losers')}
          style={[styles.tab, activeTab === 'Losers' && styles.activeTab]}>
          <Text style={styles.tabText}>Top Losers</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data[activeTab]}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={item.ticker + index}
            style={styles.card}
            onPress={() => navigation.navigate('Product', { item })}>
            <View>
              <Image
                src="https://i.pinimg.com/474x/cf/52/02/cf5202146c65aa1b58802b2ad37bc900.jpg"
                style={{
                  height: 50,
                  width: 50,
                  borderWidth: 2,
                  borderRadius: 100,
                }}
              />
            </View>
            <Text style={[styles.cardText, { fontWeight: 'bold' }]}>
              {item.ticker}
            </Text>
            <Text style={styles.cardText}>{item.price}</Text>
            {activeTab === 'Gainers' ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.cardText, { color: 'green' }]}>
                  +{item.change_percentage}
                </Text>
                <Icon name="arrow-drop-up" size={25} color="green" />
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.cardText, { color: 'red' }]}>
                  {item.change_percentage}
                </Text>
                <Icon name="arrow-drop-down" size={25} color="red" />
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#ccc',
  },
  tabText: {
    fontSize: 16,
  },
  card: {
    padding: 16,
    marginHorizontal: 5,
    marginBottom: 8,
    backgroundColor: '#fffff',
    borderWidth: 0.5,
    borderRadius: 5,
    flex: 1,
  },
  cardText: {
    fontSize: 16,
  },
});

export default ExploreScreen;
