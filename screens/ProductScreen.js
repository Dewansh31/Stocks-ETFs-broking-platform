// screens/ProductScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PointBetweenNumbers from '../components/PointBetweenNumbers';
import RadioButtonGroup from '../components/RadioButtonGroup';

const ProductScreen = (props) => {
  const screenWidth = Dimensions.get('window').width;
  const [symbol, setSymbol] = useState(props.route.params.item.ticker)
  const [detail, setDetail] = useState({});
  const [mini, setMini] = useState(0);
  const [maxi, setMaxi] = useState(100);
  const [avg, setAvg] = useState(0);
  const [value, setValue] = useState('I');

  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  });

  const API_KEY = 'ZANIP0AKHH39GJGC';
  // const API_KEY = 'demo';

  const API_URL2 = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
  const API_URL3 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
  const API_URL4 = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${API_KEY}`;
  const API_URL5 = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`;

  const fetchData = async (name) => {
    console.log("name:", name);
    try {
      const API_URL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${name}&apikey=${API_KEY}`;

      const response = await fetch(API_URL);
      const result = await response.json();
      console.log('result:', result);
      setMaxi(result['52WeekHigh']);
      setMini(result['52WeekLow']);
      setAvg(result['50DayMovingAverage']);
      setDetail(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGraphData_Intraday = async () => {
    try {
      const response = await fetch(API_URL2);
      const result = await response.json();
      let arrayOfObjects = Object.values(result['Time Series (5min)']);
      arrayOfObjects = arrayOfObjects.map((item) => item['4. close']);
      // console.log('result graph:', arrayOfObjects);

      const labeldata = Object.keys(result['Time Series (5min)']).map(
        (dateTime) => dateTime.split(' ')[1]
      );
      // console.log(labeldata);

      setData({
        labels: labeldata.slice(0, 7).reverse(),
        datasets: [
          {
            data: arrayOfObjects.slice(0, 7).reverse(),
          },
        ],
      });

    } catch (error) {
      console.log(error);
    }
  };

  const fetchGraphData_Daily = async () => {
    try {
      const response = await fetch(API_URL3);
      const result = await response.json();
      let arrayOfObjects = Object.values(result['Time Series (Daily)']);
      arrayOfObjects = arrayOfObjects.map((item) => item['4. close']);
      // console.log('result graph:', arrayOfObjects);

      const labeldata = Object.keys(result['Time Series (Daily)']).map(
        (dateTime) => dateTime.split(' ')[0]
      );
      // console.log('l', labeldata);

      setData({
        labels: labeldata.slice(0, 7).reverse(),
        datasets: [
          {
            data: arrayOfObjects.slice(0, 7).reverse(),
          },
        ],
      });

    } catch (error) {
      console.log(error);
    }
  };

  const fetchGraphData_Weekly = async () => {
    try {
      const response = await fetch(API_URL4);
      const result = await response.json();
      let arrayOfObjects = Object.values(result['Weekly Time Series']);
      arrayOfObjects = arrayOfObjects.map((item) => item['4. close']);
      // console.log('result graph week:', arrayOfObjects);

      const labeldata = Object.keys(result['Weekly Time Series']);
      // console.log('l', labeldata);

      setData({
        labels: labeldata.slice(0, 7).reverse(),
        datasets: [
          {
            data: arrayOfObjects.slice(0, 7).reverse(),
          },
        ],
      });

    } catch (error) {
      console.log(error);
    }
  };

  const fetchGraphData_Monthly = async () => {
    try {
      const response = await fetch(API_URL5);
      const result = await response.json();
      let arrayOfObjects = Object.values(result['Monthly Time Series']);
      arrayOfObjects = arrayOfObjects.map((item) => item['4. close']);
      // console.log('result graph week:', arrayOfObjects);

      const labeldata = Object.keys(result['Monthly Time Series']);
      // console.log('l', labeldata);

      setData({
        labels: labeldata.slice(0, 7).reverse(),
        datasets: [
          {
            data: arrayOfObjects.slice(0, 7).reverse(),
          },
        ],
      });

    } catch (error) {
      console.log(error);
    }
  };

  const changeValue = (v) => {
    setValue(v);
    if (v == 'I') {
      console.log('Intraday........');
      fetchGraphData_Intraday();
    } else if (v == 'D') {
      console.log('Daily........');
      fetchGraphData_Daily();
    } else if (v == 'W') {
      console.log('Weekly........');
      fetchGraphData_Weekly();
    } else if (v == 'M') {
      console.log('Monthly');
      fetchGraphData_Monthly();
    }

  };

  useEffect(() => {
    console.log('PPP', JSON.stringify(props.route.params.item.ticker));
    fetchData(props.route.params.item.ticker)
    setSymbol(props.route.params.item.ticker)
    fetchGraphData_Intraday()
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            width: 'full',
          }}>
          <View style={{ width: '20%', padding: 20 }}>
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

          <View style={{ width: '50%', padding: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>{detail.Symbol}</Text>
            <Text>{detail.Name}</Text>
          </View>

          <View style={{ width: '30%', padding: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>{detail.RevenuePerShareTTM} {detail.Currency}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'around',
              }}>
              <Text>{detail.ReturnOnEquityTTM}%</Text>
              {(parseInt(detail.ReturnOnEquityTTM) >= 0)
                ?
                <Icon name="arrow-drop-up" size={25} color="green" />
                :
                <Icon name="arrow-drop-down" size={25} color="red" />
              }
            </View>
          </View>
        </View>

        <View style={{}}>
          <LineChart
            data={data}
            width={screenWidth}
            height={400}
            verticalLabelRotation={-40}
            propsForHorizontalLabels={{ marginTop: 50 }}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: 'blue',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 5,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 5,
            }}
          />
          <RadioButtonGroup value={value} changeValue={changeValue} />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flexDirection: 'column',
            borderRadius: 5,
            marginHorizontal: 20,
          }}>
          <View style={{ borderBottomWidth: 1, padding: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>About {detail.Symbol}</Text>
          </View>
          <View style={{ padding: 5 }}>
            <Text>{detail.Description}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            marginHorizontal: 20,
            width: 'full',
            flexWrap: 'wrap',
          }}>
          <View
            style={{
              padding: 5,
              borderRadius: 20,
              backgroundColor: '#ebc5c3',
              margin: 10,
            }}>
            <Text style={{ color: 'red' }}>INDUSTRY : {detail.Industry}</Text>
          </View>
          <View
            style={{
              padding: 5,
              borderRadius: 20,
              backgroundColor: '#ebc5c3',
              margin: 10,
            }}>
            <Text style={{ color: 'red' }}>SECTOR : {detail.Sector}</Text>
          </View>
        </View>

        <PointBetweenNumbers min={mini} max={maxi} avg={avg} />

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-around',
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text>M.C.</Text>
            <Text style={{ fontWeight: 'bold' }}>
              {detail.MarketCapitalization}
            </Text>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text>P/E</Text>
            <Text style={{ fontWeight: 'bold' }}>{detail.PERatio}</Text>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text>Beta</Text>
            <Text style={{ fontWeight: 'bold' }}>{detail.Beta}</Text>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text>D.Y.</Text>
            <Text style={{ fontWeight: 'bold' }}>{detail.DividendYield}</Text>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text>P.M.</Text>
            <Text style={{ fontWeight: 'bold' }}>{detail.ProfitMargin}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductScreen;
