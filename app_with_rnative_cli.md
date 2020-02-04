
Инициализируем проект

```js
npx react-native init AwesomeProject

```

Далее настроить как в мануале Android studio 

Добавить в `.bashrc` или `.bash_profile`

```
code ~/.bash_profile 
```

[bashrc location](https://askubuntu.com/questions/127056/where-is-bashrc)
``` 
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

then 
```
source ./bash_profile
```

проверить что переменные засетились 

```
echo $PATH
```
или 
```
printenv
```