import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList,Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);

  // Fetch repositories from GitHub API
  const fetchRepositories = () => {
    if (!keyword) {
      Alert.alert('Please enter a keyword');
      return;
    }
    fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(data => setData(data.meals))
      .catch(err => Alert.alert('Error', err.message))
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) =>
          <View style={{ margin: 10, }}>
            <Text style={{fontSize:18, fontWeight: "bold"}} >{item.strMeal}</Text>
            <Image style={{width: 50, height: 50}} source={{uri: item.strMealThumb}} />          
          </View>
        }
      />
      <TextInput
        style={{fontSize:18, width:200}}
        placeholder='keyword'
        onChangeText={text => setKeyword(text)}
      />
      <Button
        title="Search"
        onPress={fetchRepositories}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const listSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});