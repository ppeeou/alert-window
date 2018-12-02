
# Alert
This library provides the user with custom alert and confirm functions.
(study, use custom)

example
```
npm run build
npm run server
```

- promise
- async & await

### Promise
Alert
```
AlertWindow
    .alert('alert message')
    .then(()=> ...)
    .catch((error)=> ...)

AlertWindow
    .alert({
        title:'alert title',
        text :'alert text'
    })
    .then(()=> ...)
    .catch((error)=> ...)
```

Confirm
```
AlertWindow
    .confirm('confirm message')
    .then((isOk)=> {
        if(isOk){
        ...
        }else {
        ...
        }
    })
    .catch((error)=> ...)

AlertWindow
    .confirm({
        title:'confirm title',
        text :'confirm text'
    })
    .then((isOk)=> {
        if(isOk){
        ...
        }else {
        ...
        }
    })
    .catch((error)=> ...)
```

### Async & await
```
await AlertWindow.alert('alert message')
```

```
const isOk = await AlertWindow.confirm('confirm message')

if(isOk){
    ...
}
```

