import React from 'react';
import SearchBar from '../../components/SearchBar';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ItemList from '../../components/ItemsList';
import PropTypes from 'prop-types';
import styles from './styles';

const Listings = ({ data, searchMethods, sortPriceState, toggleSort, navigation }) => {
  return (
    <View styles={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar />
        <TouchableOpacity onPress={() => console.log('clicked filter')}>
          <Image
            style={styles.filterIcon}
            source={require('../../assets/images/Icons/Filter.png')}
          />
        </TouchableOpacity>
      </View>
      {data.length > 0 ? (
        <ItemList data={data} navigation={navigation}/>
      ) : (
        <View style={styles.noItems}>
          <Text style={styles.noItemsText}>No Listings</Text>
        </View>
      )}
    </View>
  );
};

Listings.propTypes = {
  data: PropTypes.array.isRequired,
  searchMethods: PropTypes.object.isRequired,
  toggleSort: PropTypes.func.isRequired,
};

export default Listings;
