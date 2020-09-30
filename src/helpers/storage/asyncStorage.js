import AsyncStorage from '@react-native-community/async-storage';

export const getData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value) {
      console.log(`getData of ${name} from async storage`);
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

export const saveData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
    console.log(`saveData of ${name} from async storage`);
  } catch (e) {
    console.log(e);
  }
};
