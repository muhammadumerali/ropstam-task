import { View, Text, FlatList, SafeAreaView, StyleSheet, StatusBar  } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { DETAIL_URL } from "../constants/baseURLs";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';  

const Home = () =>{

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchDetails = async () => {
    axios.get(`${DETAIL_URL}`, {}).then((res) => {
      setData(res.data);        
    }).catch((err) => {
      console.error('There was an error!', err.message);            
    });
  };

  useEffect(()=>{
    fetchDetails();
  }, []);
  


  function renderData({item, index}) {      
      return (
        <View style={styles.item}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View>
            <Text>{item.body}</Text>
          </View>
        </View>
      );
  }



    return (
        <SafeAreaView style={styles.container}>
          <FlatList data={data} renderItem={renderData} />         
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9f9f9',//f8f8f8
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default Home;
