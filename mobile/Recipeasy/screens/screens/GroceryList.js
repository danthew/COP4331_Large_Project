import React, {useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    StatusBar,
    FlatList,
} from 'react-native';

import { useEffect } from 'react';

/* User Context */
import { useContext } from 'react';
import { UserContext } from '../UserContext';

import tryGetGroceryList from '../api/groceries';
import addGrocery from '../api/groceries/addGrocery';

const renderItemCard = ({ item, onDeleteItem }) => {
  return <Item title={item} onPressDelete={() => onDeleteItem(item)} />;
};

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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

/*
const Item = ({item, onPress, backgroundcolor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
        <Text style={[styles.title, {color: textColor}]}>
            {item.title}
        </Text>
    </TouchableOpacity>
);
*/

const listPlaceholder = [
        {id: 0, title: "First Item"},
        {id: 1, title: "Second Item"},
        {id: 2, title: "Third Item"}
];

const placeHolderIngredient = {
    "name": "carrots",
    "quantity": "1",
    "unit": "",
    "userId": "kePOq38lYBZeBYIJmDXwSYF7xCg1",
    "brand": "carrots inc.",
    "cost": "1.00",
    "onList": false,
};

const Grocery = ()=> {
    const [ selectedId, setSelectedId ] = useState();
    const [ groceries, setGroceries ]= useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const { user, updateUser } = useContext(UserContext);

    useEffect(() => {
        async function fetchGroceryList() {
            setIsLoading(true);
            const getList = async () => {
                return await tryGetGroceryList({
                    "userId": user.userId,
                });
            };

            var list = getList();
            if (list.success) {
                console.log("[GroceryList]: successfully got grocery list for ", user.name);
                var groceries = list.response;
                console.log("Got groceries: ", groceries);
                if (groceries === undefined || groceries.length === 0) {
                    const addPlaceholders = async () => {
                        console.log("Adding placeholder ingredients...");
                        var cnt = 0;
                        for (var i = 0; i < 10; i++) {
                            var res = await tryAddGrocery(placeholderIngredient);
                            if (!res.success) {
                                console.log("failed adding an ingredient!");
                            } else {
                                cnt++;
                            }
                        };
                        console.log("Done. Added ", cnt, " ingedients");
                    }
                    addPlaceholders();
                }
            } else {
                console.log("[GroceryList]: unable to get user grocery list");
                return;
            }
        }

        fetchGroceryList();
    }, [user.userId]);

    const renderItemm = ({item}) => {
        console.log("rendering ", item);
        const backgroundColor = item.id === selectedId ?
            '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';
    }

    const handleDeleteItem = (itemToDelete) => {
        const filteredItems = items.filter((item) => item !== itemToDelete);
        setItems(filteredItems);
    };

    /*
    const [ groceryList, setGroceryList ] = useState(["Hello", ", ", "World!"]);
    for (const s of groceryList) {
        console.log(s);
    }
    */
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Grocery List Page </Text>
            <FlatList
        data={listPlaceholder}
        renderItem={({item}) => renderItemCard(item)}
        keyExtractor={item => item.title}
        />
    </View>
    );
}

const __styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    flatView: {
        backgroundColor: "green",
        marginHorizontal: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        fontSize: 42,
    },
});

/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        flex: 0,
        position: "relative",
        alignItems: "center",
        height: "10%",
        width: "50%",
    }
});
*/

export default Grocery;
