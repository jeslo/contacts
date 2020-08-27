import React, {Component} from 'react'
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from 'react-native'
import Contacts from 'react-native-contacts'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts: [],
      item: {},
    }
  }

  async componentDidMount () {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then((e, x) => {
        console.log('>>>>>>contcts', e, x)
        this.loadContacts()
        Contacts.requestPermission((err, permission) => {
          console.log('>>>>>>requestPermission', err, permission)
        })
      })
    } else {
      this.loadContacts()
    }
  }

  loadContacts () {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.log('>>>>>>', err)
        console.warn('Permission to access contacts was denied')
      } else {
        this.setState({contacts})
        contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
      }
    })
  }
  renderItem = ({item, index}) => {
    return (
      <View
        style={{
          justifyContent: 'center',

          backgroundColor: '#34495E',
          height: 50,
          flex: 1,
        }}>
           
        <View style={{flex: 1, flexDirection: 'column'}}>
        <Image
                source={require('./Images/user.png')}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 10,
                  resizeMode: 'contain',
                }}
              />
          <Text
            style={{
              color: '#ffffff',
              
            }}>
            {item.givenName}
          </Text>
          
        </View>
      </View>
    )
  }
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 25,
              marginLeft: 10,
              marginBottom: 4,
              color: '#ffffff'
            }}>
            Contacts
          </Text>
          <FlatList
            style={{
              marginLeft: 10,
              marginRight: 10,
            }}
            scrollEventThrottle={true}
            ItemSeparatorComponent={() => <View style={{margin: 10}} />}
            data={this.state.contacts}
            renderItem={this.renderItem}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E'
  },
})

export default App
