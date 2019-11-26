React Native Abstract

# Docs
- [Official Docs](https://facebook.github.io/react-native/docs/getting-started)  
- [Overview of available Components & APIs](https://facebook.github.io/react-native/docs/components-and-apis)  
- [Expo Docs](https://docs.expo.io/versions/latest/)   
- [UI. React Native Elements](https://react-native-elements.github.io/react-native-elements/docs/overview.html)
- [UI. Expo vector icons](https://expo.github.io/vector-icons/)  

# Native_Components  
- [Container components](#Container_components)
- [Dispaly components](#Dispaly_components)
- [Interactive components](#Interactive_components)  
- [Toucheable components](#Toucheable_components)  
- [Scroll components](#Scroll_components)  

# Assets_handling  
- [Styling](#Styling)  
- [Images](#Images)  
- [Fonts](#Fonts)   
- [AppLoading](#AppLoading)   
  
# Responsive issues
- [Dimensions API](#Dimensions_API)
- [Platform API](#Platform_API)
- [Orientation](#Orientation) 
- [KeyboardAvoidingView](#KeyboardAvoidingView)

# Navigation
- [Navigation API](#Navigation_API)
- [Stack Navigator](#Stack_Navigator)
- [Data transfer](#Data_transfer)
- [Dynamic Data Transfer](#Dynamic_Data_Transfer)
- [Default Navigation Options](#defaultNavigationOptions)
- [Header buttons](#header_buttons)
*** 

## Container_components

### View

[view docs ...](https://facebook.github.io/react-native/docs/view)

Компонент `View` является флекс контейнером, поэтому ко всем чилдам применяются правила флекс елементов.

[подробнее о flex...](https://facebook.github.io/react-native/docs/flexbox)

Применяется как смысловая обертка, или для группировки других элементов. Не передает наследование `css` своим чилдам.

*** 

## Dispaly_components

### Text

[text docs ...](https://facebook.github.io/react-native/docs/text)

- компонент для представления текстового содержимого  
- чилды не будут флексовыми  
- может содержать дочерние компоненты  
- поддерживает события тача  
- передает `css` своим чилдам   

```jsx
<Text style={{fontWeight: 'bold'}}>
  I am bold
  <Text style={{color: 'red'}}>
    and red
  </Text>
</Text>
```
- любое ткстовое содержимое должно быть обернуто в `<Text> Some text</Text>` 

```jsx 
// BAD: will raise exception, can't have a text node as child of a <View>
<View>
  Some text
</View>

// GOOD
<View>
  <Text>
    Some text
  </Text>
</View>
```
***

## Interactive_components

### Button

[button docs ...](https://facebook.github.io/react-native/docs/button)

Компонент простой кнопки. 
Для создания кастомных кнопок нужно использовать `TouchableOpacity` или `TouchableNativeFeedback`

Обязательные пропы 
- onPress
- title


```jsx
  <Button
    title="Press me"
    onPress={() => Alert.alert('Simple Button pressed')}
  />
```

### TextInput
[textinput docs ...](https://facebook.github.io/react-native/docs/textinput)

Компонент для ввода текста в приложение с помощью клавиатуры.
Поддерживает множество различных свойств типа автокоррекции, автокомплита, типы клавиатур для ввода, событий focus, blur

## Toucheable_components

### TouchableOpacity

[touchableopacity docs ...](https://facebook.github.io/react-native/docs/touchableopacity)

Оборачивает содержимое и делает его кликабельным. Отображая это поведение в UI эффектом прозрачности при нажатии.

```jsx
<TouchableOpacity onPress={this._onPressButton}>
  <Image
    style={styles.button}
    source={require('./myButton.png')}
  />
</TouchableOpacity>
```

### TouchableWithoutFeedback

[touchablewithoutfeedback docs...](https://facebook.github.io/react-native/docs/touchablewithoutfeedback)

Оборачивает содержимое и делает его кликабельным. Не отображая это поведение в UI.
- принимает только **одного** чилда
- если нужно обернуть более одного компонента, то оборачиваем их в View 

```jsx 
<TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
 <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
    <Text>My Component</Text>
    <Text>My Component</Text> 
  </View>
</TouchableWithoutFeedback>;
```

### TouchableNativeFeedback

[touchablenativefeedback docs ...]

Обертка работает только на `Android` 

***


## Scroll_components

### ScrollView

[scrollview docs ...](https://facebook.github.io/react-native/docs/scrollview)

Контейнер для елементов которые будут скролиться, типа списки, статьи и т.п.

- должен иметь ограниченную высоту, так как содержит рендерит **все** дочерние элементы   
- желательно не использовать для отображения большого количества содержимого, так как это влияет на производительность   
- для отображения длинных списков или контента лучше использовать `<FlatList>`, которые рендерит компоненты по мере их актуальности  

### FlatList

[flatlist](https://facebook.github.io/react-native/docs/flatlist)

Наиболее используемый компонент для рендеринга списков и контента который скроллится

- не рендерит сразу весь контент
- большое количество опций

```jsx
// в проп data передаем ссылку на массив 
// в проп renderIntem колбек который получает текущий item и возвращает компонент (аналог map)
// в проп keyExtractor колбек который получает текущий item и берет из него то, что можно использовать как уникальное значение

 <FlatList
    data={DATA}
    renderItem={({ item }) => <Item title={item.title} />}
    keyExtractor={item => item.id}
  />
```
Обязательные пропы  
- data  
- renderItem  

# Assets_handling

## Styling 

Для стилизации компонентов React Native можно использовать
- нативный способ StyleSheet.create({})
- styled components

### StyleSheet.create({})

[stylesheet docs ...](https://facebook.github.io/react-native/docs/stylesheet)

Вызваваем метод create и передаем туда объект, который содержит в себе объекты со стилями.
Используется синтаксис `camelCase` для `css` названий свойств  
Инкапсулирует стили в модуле.  

```js
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  }, 
});
```
Затем использеум созданные объекты в пропе `style` компонента, передав туда нужное свойство.  

```jsx
<View style={styles.container}>
  <Text style={styles.title} />
</View>
```
### Styled Components

[туториал по стилизации ...](https://levelup.gitconnected.com/using-styled-components-with-react-native-de645fcf4787)


## Images

### Image

[image docs ...](https://facebook.github.io/react-native/docs/image)

Компонент React для отображения различных типов изображений, включая сетевые изображения, статические ресурсы

> Отображение локальных картинок

```jsx
<Image
  style={{width: 50, height: 50}}
  source={require('../assets/images/logo.png')}
/>
```
> Отображение сетевых картинок

```jsx        
<Image
  style={{width: 50, height: 50}}
  source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
/>
```

## Fonts

[fonts docs ...](https://docs.expo.io/versions/latest/guides/using-custom-fonts/)

Для загрузки шрифтов будем использовать `expo-font`, поставляется вместе с `expo`
Импортируем все из пакета

```js
import * as Font from 'expo-font';  
```

Затем нужно создать функцию которая вызывает метод `loadAsync`, аргуметом передаем объект опций, поля которого называем так, как будет называться шрифт и в качестве значения передаем ссылку на модуль, где лежит файл шрифта

```js
const fetchFonts = () => {
  return Font.loadAsync({
    'custom-font': require('./assets/fonts/YeonSung-Regular.ttf')
  })
}
```

Или загружаем шрифт при маунте компонента

```js 
  componentDidMount() {
    Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
  }
```


## AppLoading

[apploading docs ...](https://docs.expo.io/versions/latest/sdk/app-loading/)  

Компонент предоставляемый `expo` для отображения загрузки.   
Используется при загрузке например шрифтов, картинок, и т.п 

> Пропы 
- startAsync - получает функцию которая производит загрузку ресурсов, в нешем случае ф-цию которая подгружает шрифты
- onError - получает функцию которая отлавливает ошибку при выполнении загрузки русурсов
- onFinish - получает функцию которая вызовется после резолва ф-ции загрузки


```js
 const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){ 
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={()=>setDataLoaded(true)}
        onError={(err)=>console.error(err)}
      />
    )
  }
```

## Debugging

[Expo Debugging Docs](https://docs.expo.io/versions/v34.0.0/workflow/debugging/)   


## Devices

### Dimensions_API

[dimensions docs ...](https://facebook.github.io/react-native/docs/dimensions)

Чтобы UI смотрелся хорошо на разных устройствах нужно указывать относительные величины.

Производит замеры до рендера компонента.

Для того чтобы узнать например ширину устройства можно воспользоваться объектом `Dimensions`  который имеет свои методы
- get  
- set  
- addEventListener  
- removeEventListener  

Поставляется в пакете `react-native`

```js
import { Dimesions } from  'react-native';
```

Получаем ширину устройтсва и делим ее на 4 

```js 
const styles = StylesSheet.create({
  button: {
    width: Dimensions.get('window').width / 4 
  }
})
```

Также можно получать значения в переменные и использовать где необходимо

```js
const {height, width} = Dimensions.get('window');

// Рендер компонента по условию 
if(width > 700) {
  // стили по условию 
  return <ComponentWide style={width > 300 ? styles.bigButton : styles.smallButton}/>
}else {
  return <ComponentSmall />
}

// Стилизация по условию 
const styles = StylesSheet.create({
  button: {
    width: width > 500 ? 300 : 250, 
  }
})
```

Поскольку метод вызывается до инициализации компонента, при смене режима отображения (портрет, альбом) у нас будет произведен замер того режима в которм компонент замаунтился, а при сменах режима компонент не размонтируется поэтому у нас будет всегда одна величина замеров.

Тут на помощь приходят метод `addEventListener`, который слушает призошедшие события, при наступлении которых можно триггерить перезапрос  замеров.

Для этих целей хорошо подходит lifecycle-хук `useEffect` поскольку в нем можно отписаться от слушателя.


```js
// получили начальные замеры и засетили их 
const { width } = Dimensions.get('window');
const [containerWidth, setContainerWidth] = useState(width);

// при изменениях ориентации перезапишем размеры контейнера
useEffect(()=> {
  // ф-ция которая получает текущие замеры и сетит их 
  const updateDimensions = () => {
    const { width } = Dimensions.get('window');
    setContainerWidth(width);
  }
  // подписываемся на изменения
  Dimensions.addEventListener('change', updateDimensions);

  // отписываемся при анмаунте
  return () => Dimensions.removeEventListener('change', updateDimensions);
})

```

💡 **Таким же способом получая актуальные замеры ширины и высоты рендерить определенную разметку по условию.**

### Platform_API

У `react-native` также есть свой API для определения устройства на котором запускается приложения. В зависимовти от устройтсва может применяться разный код. Например стилевое офрмление или лейаут.

[platform API...](https://facebook.github.io/react-native/docs/platform-specific-code#platform-module)

### Orientation

Девайсы отображают контент в портретном или альбомном режиме.
В каком режиме отображать наше приложение указаваем в файле конфигурации `app.json`

[app.json docs ...](https://docs.expo.io/versions/v35.0.0/workflow/configuration/)

```json 
"orientation": "portrait",
```

Значения 
- portrait
- landscape
- default 

Default значения будет работать в двух режимах. 

### KeyboardAvoidingView

[keyboardavoidingview docs ...](https://facebook.github.io/react-native/docs/keyboardavoidingview)

Для того чтобы клавиатура на перекрывала доступ к полю ввода или в других некорректных отображениях клавиатуры, используем компонент `KeyboardAvoidingView`

```js
import {KeyboardAvoidingView} from 'react-native';

<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
  ... your UI ...
</KeyboardAvoidingView>;
```

## Navigation_API

[navigation API ...](https://reactnavigation.org/docs/en/navigation-prop.html)

## Stack_Navigator 

Для навигации будем использовать `react-navigation` и `react-navigation-stack`

В корне проекта создадим директорию `navigation` в которой файл который будет управлять навигацией приложения 

`createStackNavigator` создает стопку экранов, передаем объект, значеня полей это наши экраны

[createStackNavigator API...](https://reactnavigation.org/docs/en/stack-navigator.html)

```js
// MealsNavigator.js

import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
  MealDetail: MealDetailScreen
});

export default createAppContainer(MealsNavigator);

```

Файл `App` возвращает `MealsNavigator` который оборачиает приложения и передает свой контекст всем компонентам приложения, который доступен через `props`  

```js
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MealsNavigator from './navigation/MealsNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return <MealsNavigator />;
} 
```

Навигация по экранам осуществляется вызовом `navigation.navigate()` в качестве аргумента передаем 

- `props.navigation.navigate({routeName: 'SomeIdentifier'})` 
или короткий вариант
- `props.navigation.navigate('SomeIdentifier')`

```js
<Button title="Go to Meals" onPress={()=> props.navigation.navigate('CategoryMeals')}/>   
```

Методы `navigation`

- navigate - направляет на экран, не создавая слоя на стопке
- push - ложит на стопку экран
- goBack - возвращает на предыдущий слой стопки
- pop - аналог  goBack
- popToTop - возврат на Home
- replace - заменяет слой на стопке


У компоненты есть статическое свойство `navigationOptions` которое принимает различные опции

```js
CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories', 
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTintColor: 'yellow' 
}
```
## Data_transfer

### Проброс данных в другой компонент. 

 Чтобы пробросить данные из одного компонента в другой при переходе, нужно передать вторым параметром в метод **navigate** объект, в который помещаем данные `props.navigation.navigate('ScreenTo', { key: value })`

 Ситнаксис 

**длинный**
 - navigation.navigate({
    routeName: 'ScreenTo',
    params: {
      key: value
    }
  })

**короткий**
- props.navigation.navigate('ScreenTo', { key: value })

```js 
  <Container onPress={()=> {
      props.navigation.navigate('CategoryMeals', {categoryId: itemData.item.id})
    }}> 
    ...code     
```

После этого данные достаем в компоненте куда перешли вызовом **getParam**  в который передаем нужный `key` 
`props.navigation.getParam('categoryId')` 

[getParams read ...](https://reactnavigation.org/docs/en/navigation-prop.html#getparam-get-a-specific-param-value-with-a-fallback)


```js
const CategoryMealScreen = props => {
  // передаем данные
 const catId =  props.navigation.getParam('categoryId') ;
 const selectedCategory = CATEGORIES.find(item=> item.id === catId);
  return (
    <Container  >
      <Text>Category Meal Screen!</Text> 
      <Text>{selectedCategory.title}</Text>
      <Button title="Go to Meals" onPress={()=> props.navigation.navigate('MealDetail')}/>
      <Button title="Go Back" onPress={()=> props.navigation.pop()}/>
    </Container>
  );
};
```

### Dynamic_Data_Transfer

Динамический проброс данных 

В случае когда нужно использовать данные, которые пришли с другой страницы в `navigationOptions`, нужно воспользоваться формой вызова **navigationOptions** не как объекта , а как функции которая возвращает объект. Аргументом этой функции будет объект с контекстом. Вызывав привычный `getParam()` получаем данные, извлекаем нужную информацию и сетим в возвращаемый объект.

```js
CategoryMealScreen.navigationOptions = (navData) => { 

  const catId = navData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(item=> item.id === catId);
  
  return {
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor: 'pink'
    }
  }
}
```

### defaultNavigationOptions

Настройки по умолчанию.

В файле навигаторе, для каждого экрана можно определять настройки  `navigationOptions`. 

```js
const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      headerTintColor: 'yellow' 
    }
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      headerTintColor: 'yellow' 
    }
  },
  MealDetail: MealDetailScreen
}});
```

Для того чтобы не дублировать одинаковые настройки для экранов, можно определить зачения по умолчанию.

Для этого **вторым** параметром в `createStackNavigator` передаем объект с полем `defaultNavigationOptions`, где укажем значения которые применятся ко всем эеранам.

```js
const MealsNavigator = createStackNavigator({
  Categories:  CategoriesScreen,
  CategoryMeals:  CategoryMealsScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTintColor: 'yellow' 
  }
}); 
```

ЗНАЧЕНИЯ `defaultNavigationOptions` БУДЕТ ПЕРЕЗАПИСАНЫ если передать свойства в статическом методе `navigationOptions`

```js 
CategoryMealScreen.navigationOptions = {   
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor: 'pink'
    } 
}
```
Таким образом, удобно выделить обше настроки для экранов в файле-навигации, а для каждого экрана в отдельности передавать в `navigationOptions`


### InitialRouteName

Также в объекте настроек который передается вторым параметром в `createStackNavigator`, кроме зачений по умолчанию можно передавать значение для дефолтной страницы

Для этого прописываем поле `initialRouteName`, значением которого будет тот экран который необходим 

```js
const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen, 
  CategoryMeals: CategoryMealsScreen, 
  MealDetail: MealDetailScreen
}, {
  // экран по умолчанию
  initialRouteName: 'MealDetail',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTintColor: 'yellow' 
  }
});
```
 
 ### header_buttons
 
Для навигации в хедере, поставим пакет

[docs ...](https://github.com/vonovak/react-navigation-header-buttons#readme)

```js
npm i -S react-navigation-header-buttons
```

После установки пакета, создаем компонент кноки, которая нужна.

Для этого нужно заимпортровать компонент `HeaderButton` из либы, таже для нее необходим пакет иконок, в нешем случае это будет `Ionicons` из `@expo/vector-icons`

Создаем компонент, который возвращает заимпортированный **HeaderButton** с переданными пропсами
- IconComponent - нужно передать ссылку на пакет иконок
- iconSize 
- color
- + пропсы сверху

```js
import React from 'react' 
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';  
 
const CustomHeaderButton = props => (
  <HeaderButton  {...props} IconComponent={Ionicons} iconSize={23} color="yellow"/>
  ) 

export default CustomHeaderButton
```

После создания, в том месте где будем использовать компонент нужно заимпортить `HeaderButtons`, `Item` из либы, и созданный компонент кнопки

Далее в месте использования (`headerRight`), передаем как **JSX** 

```jsx
<HeaderButtons HeaderButtonComponent={HeaderButton}>
  <Item title="Favorite" iconName="ios-star" onPress={()=> console.log('FAV')}/>
</HeaderButtons>
```
Обязательный пропс **HeaderButtonComponent**, в который передаем компонент кнопки **HeaderButton**
Как children передаем заимпорченный компонент `Item` в который как пропсы указываем title, iconName, onPress  


```js 
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import  HeaderButton from '../components/HeaderButton';

... some code

MealDetailScreen.navigationOptions = (nav) => {
   ... some code 

  return {
    headerTitle:  title, 
    headerRight:  (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Favorite" iconName="ios-star" onPress={()=> console.log('FAV')}/> 
                  </HeaderButtons>),
  } 
}
```

После этого в правой части хедера получим кнопки-иконки. Можно передавать любое количество кнопок-иконок

***

## Tab_Navigation

[github ...](https://github.com/react-navigation/tabs)

```js
npm install --save react-navigation-tabs 
```

## createBottomTabNavigator

[createBottomTabNavigator](#https://reactnavigation.org/docs/en/bottom-tab-navigator.html)

Создадим навигацию подобно "табам", которые располагаются внизу приложения. 

В файле навигации заимпортируем метод, который создает таб-навигацию

```js
import { createBottomTabNavigator } from 'react-navigation-tabs'; 
```

Затем создадим саму навигацию , вызовом метода `createBottomTabNavigator`, который как и стопка-навигация принимает объект с экранами.   
Поместим туда первым табом всю стопку-навигцию `MealsNavigator` и вторым "табом" поместим экран `Favorites`.  
Именуем этот навигатор как корневой, т.к по сути ту описана вся авигация приложения и передадим в метод `createAppContainer`     


```js
import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform} from 'react-native';

import Colors from '../constants/Colors'

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const MealsNavigator = createStackNavigator({
  Categories:  CategoriesScreen, 
  CategoryMeals:  CategoryMealsScreen ,
  MealDetail: MealDetailScreen
}, { 
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTintColor: 'yellow' 
  }
});


const RootNavigator = createBottomTabNavigator({
  Meals: MealsNavigator,
  Favorites: FavoritesScreen
})

export default createAppContainer(RootNavigator);
```