/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppRegistry,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from '@apollo/client';

import gql from 'graphql-tag';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HttpLink } from 'apollo-link-http';
import {Picker} from '@react-native-picker/picker';
import { REACT_APP_API_KEY } from "@env";


const link = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${REACT_APP_API_KEY}`
  },
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const initialState = {
  language: "All languages",
};


var date = new Date().getDate();
var month = new Date().getMonth();
var year = new Date().getFullYear();

var queryDate = year.toString() + "-" + month.toString() + "-" + date.toString();

const Stack = createStackNavigator();

export const QUERY_REPO = gql`
query repositories($queryString: String!, $number_of_repos:Int!) {
  search(
    type:REPOSITORY,
    query: $queryString,
    last: $number_of_repos
  ) {
    repos: edges {
      repo: node {
        ... on Repository {
          name
          createdAt
          description
          forkCount
          stargazers(orderBy:{field:STARRED_AT,direction:DESC }) {
              totalCount
          }
          allIssues: issues {
            totalCount
          }
          openIssues: issues(states:OPEN) {
            totalCount
          }
          defaultBranchRef{
            target{
              ... on Commit{
                history(first:10){
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
}
`
;

const Home = ({navigation, language}) => {
  const [state, setState] = useState(initialState);

  handleChange = (language) => {
    setState({language: language});
  }

  const { loading, error, data } = useQuery(QUERY_REPO, {
    variables: {
      queryString: `language:${state.language} sort:stars created:>${queryDate}`,
      number_of_repos: 10,
    }
    });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;


  const repos = data.search.repos;
  console.log(state.language);
  return (
    <>
  <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        style={styles.body}
        contentInsetAdjustmentBehavior="automatic">
          <View style={styles.body}>
            <Text style={styles.header}>Most Starred Repositories Created During the Last Month:</Text>
            <Picker
              selectedValue={state.language}
              placeholder="Language"
              style={{backgroundColor: 'white', width: '95%', height: '5%', alignSelf: 'center'}}
              onValueChange={this.handleChange}
            >
              <Picker.Item label="All Languages" value="" />
              <Picker.Item label="Javascript" value="Javascript" />
              <Picker.Item label="Python" value="Python" />
              <Picker.Item label="Java" value="Java" />
              <Picker.Item label="Go" value="Go" />
              <Picker.Item label="TypeScript" value="TypeScript" />
              <Picker.Item label="C++" value="C++" />
              <Picker.Item label="Ruby" value="Ruby" />
              <Picker.Item label="PHP" value="PHP" />
              <Picker.Item label="C#" value="C#" />
              <Picker.Item label="C" value="C" />
            </Picker>
          {repos.map(({ repo }) =>
            <View key={repo.name}>
              <TouchableOpacity onPress = {() => navigation.navigate('Info', {repo})}>
                <View style={styles.issues}>
                  <Text style={{marginTop: 3, marginLeft: 5,}}>
                    <Text style={styles.reponame}>{repo.name}:</Text>
                    <Text> {'\n'}Stars: {' '}<Text style={styles.count}>{repo.stargazers.totalCount}</Text></Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  )
};

function Info ({route, navigation}){
  return (
    <>
    <SafeAreaView>
      <ScrollView
        style={styles.body}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          <Text style={styles.infoTextHeader}>
            <Text style={{fontSize: 22}}>{route.params.repo.name}{'\n'}</Text>
            <Text style={{fontSize: 12, fontStyle: 'italic',}}>Created at: {route.params.repo.createdAt}{'\n'}</Text>
          </Text>
          <Text style={styles.infoText}>
            <Text>Description:{'\n'}{route.params.repo.description}{'\n\n'}Statistics:{'\n'}</Text>
            <Text style={styles.count}>{route.params.repo.openIssues.totalCount}</Text>
            <Text>{' '}open issues out of</Text>
            <Text style={styles.count}>{' '}{route.params.repo.allIssues.totalCount}{'\n'}</Text>
            <Text>Forked:{' '}</Text><Text style={styles.count}>{route.params.repo.forkCount}{'\n'}</Text>
            <Text>Starred:{' '}</Text><Text style={styles.count}>{route.params.repo.stargazers.totalCount}{'\n'}</Text>
            <Text>Commits: {' '}</Text><Text style={styles.count}>{route.params.repo.defaultBranchRef.target.history.totalCount}</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Repositories:"
            component={Home}
          />
          <Stack.Screen
            name="Info"
            component={Info}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    backgroundColor: 'darkslategray',
    height: '100%',
  },
  header: {
    color: 'gainsboro',
    flexDirection: 'row',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  issues: {
    flexDirection: 'row',
    backgroundColor:'#cfe2e2',
    marginTop: 5,
    height: 60,
    width: '95%',
    alignSelf: 'center'
  },
  reponame: {
    marginLeft: 18,
    marginTop: 2,
    fontSize: 16,
    fontWeight: "bold",
  },
  count: {
    marginTop: 3,
    fontStyle: 'italic',
  },
  infoTextHeader: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'gainsboro',
    marginTop: 10,
  },
  infoText: {
    fontSize: 17,
    color: 'gainsboro',
    marginLeft: 10,
  },
});

export default App;
