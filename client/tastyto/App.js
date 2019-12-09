/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch('http://10.0.2.2:3000/api/dataList')
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    function Item({ data }) {
      console.log('--------')
      console.log(data)
      return (
        <View style={styles.item}>
          <Button style={styles.title}
            title={data.name}
            onPress={() => 
              this.props.navigation.navigate('Details')
            }
          />
        </View>
      );
    }

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    else {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            {/* <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}> */}
            <View style={styles.body}>
              <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={({ id }, index) => id}
              />
              {/* <View style={styles.sectionContainer}>
                  <Button title="Go To details"
                    onPress={() => this.props.navigation.navigate('Details')}
                  />
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Step One</Text>
                  <Text style={styles.sectionDescription}>
                    Edit <Text style={styles.highlight}>App.js</Text> to change this
                    screen and then come back to see your edits.
              </Text>
                </View> */}

            </View>
            {/* </ScrollView> */}
          </SafeAreaView>
        </>

      );
    }
  }
}

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }
  render() {
    // function Item({ data }) {
    //   console.log('--------')
    //   console.log(data)
    //   return (
    //     <View style={styles.item}>
    //       <Text style={styles.title}>{data.name}</Text>
    //     </View>
    //   );
    // }
    // const { navigation } = this.props;
    // console.log(navigation)
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Text>df</Text>
            {/* <FlatList
            data={navigation}
            renderItem={({ item }) => <Item data={item} />}
            keyExtractor={({ id }, index) => id}
          /> */}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);




const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}