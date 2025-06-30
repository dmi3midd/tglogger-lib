# tglogger-lib
A good solution for logging in a Telegram bot.

## Get started
```
npm install tglogger-lib
```
```js
const Logger = require('tglogger-lib');
const logger = new Logger(bot_token, chatIdArr, isQueue);
```
```bot_token``` - the Telegram bot token you use.  

```chatIdArr``` - an array of chat IDs where you want to send logs.  

```isQueue``` - enable(```true```) queue mode to send logs sequentially. Disable(```false```) it if you prefer faster parallel logging. Optional. Default - ```false```. 

## Usage
```js
logger.start("start msg");
logger.info("info msg");
logger.error("error msg");
// See other commands below
```
There is a default log:
```
[Date]
LEVEL
message
```
1. You can set prefix for logs:
```js
logger.setPrefix('prefix');
logger.setPrefix(null); // To reset prefix
```
There is a log with prefix: 
```
[Date]
LEVEL prefix
message
```
2. You can set the levels that are available for use(by default, all levels are enabled):
```js
logger.setLevel(level, isEnabled);
// Example
logger.info("info msg"); // Error: 'INFO' is disabled
```
3. You can disable or enable logger:
```js
logger.disable(); 
logger.info("info msg"); // Error: 'INFO' is disabled
logger.enable();
logger.info("info msg");
```
4. You can use method chaining to send multiple logs:
```js
logger.chain(); // Open chain
logger.start("start msg");
logger.info("info msg");
logger.info("info msg");
logger.info("info msg");
logger.error("error msg");
logger.close(); // Close chain
```

## API
```start()```  
```end()```  
```info()```  
```warn()```  
```error()```  
```end()```  
```setPrefix()```  
```setLevel()```  
```enable()```  
```disable()```  
```chain()```  
```close()```  

## Notes
The queue mode and log chaining were implemented to handle the asynchronous nature of sending logs to the bot. Logs may be sent slightly slower in these modes, but if you don’t have many chats, the difference is barely noticeable. Therefore, you can confidently use these features.

## LICENSE
MIT
