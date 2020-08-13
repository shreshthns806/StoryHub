import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';

export default class ReadStoryScreen extends React.Component {
    
  constructor () {
    super();
    this.state = {
      allEntries : [],
      lastVisibleEntry : null,
      search:'',
    }
  }

    componentDidMount = async()=> {

      const entries = await db.collection('stories').limit(10).get();
      entries.docs.map(
        (item)=>{
          this.setState({
            allEntries:[...this.state.allEntries,item.data()],
            lastVisibleEntry:item,
          })
        }
      )
      //console.log(this.state.allEntries)
    }

    //retrieveEntries = async ()=> {
    //  //console.log('Entered retrieveEntries')
    //  const entries = await db.collection('stories').liimit(10).get();
    //  entries.docs.map(
    //    (item)=>{
    //      this.setState({
    //        allEntries:[...this.state.allEntries,item.data()],
    //        lastVisibleEntry:item,
    //      })
    //    }
    //  )
    //  console.log('Exited RetrieveEntries')
    //}

    fetchMoreEntries = async ()=> {
      //console.log('Entered FetchMoreEntries')
      const entries = await db.collection('stories').startAfter(this.state.lastVisibleEntry).limit(10).get()
      entries.docs.map(
        (item)=>{
          this.setState({
            allEntries:[...this.state.allEntries,item.data()],
            lastVisibleEntry:item,
          })
        }
      )
      //console.log('Exited fetchMoreEntries')
    }

    render(){
      //console.log('inside Render')
      return(
        <View style = {{flex:1, backgroundColor:'black'}}>
          <Header
            backgroundColor={'black'}
            centerComponent={{
              text: 'Bed Time Stories',
              style: { color: '#fff', fontSize: 20 },
            }}
          />
          <FlatList
            data = {this.state.allEntries}
            renderItem = {
              ({ item })=>{
                console.log(item);
                return(
                  <View style = {{marginTop:10}}>
                    <Text style = {{fontSize : 10,}}>{'storyAuthor: '+item.storyAuthor}</Text>
                    <Text style = {{fontSize:10,}}>{'storyTitle: '+item.storyTitle}</Text>
                  </View>
                )
              }
            }
            keyExtractor = {
              (item,index)=>{
                return index.toString();
              }
            }
            onEndReached = {
              this.fetchMoreEntries
            }

            onEndReachedThreshold = {0.7}

          ></FlatList>
        </View>
      )
    }
}  