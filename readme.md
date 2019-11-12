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
- [Orientation](#Orientation) 
- [KeyboardAvoidingView](#KeyboardAvoidingView)
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