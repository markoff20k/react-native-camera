import {StyleSheet, Pressable, Image, View, Text} from 'react-native';

const PlaceItem = ({places, onSelect}) => {
    return (
        <Pressable onPress={onSelect}>
            <Image source={{uri: place.imageUri}}/>
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    );
}

export default PlaceItem;

const styles = StyleSheet.create({

});
