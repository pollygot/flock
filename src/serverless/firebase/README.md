# Notes

So far I have tried all of the firebase implementations and none are ideal for Flock

- `firebase-admin` would be good except that the user has to send over a full certificate and JSON data. It's too much data to send in each payload. I don't even know what the limits are, but the certificate JSON data is huge
- `firebase` web client would be perfect, except that it doesn't work with NodeJS. I'm guessing I'd have to shim it somehow with all the browser native libraries
- firebase REST api would also work excpet that it requires the user to send the data in a format that I can't reasonably expect each user to do:
    ```javascript
    "doc": {
      "fields": {
        "someFieldName": {
          "stringValue": "world",
        },
        "someOtherFieldName": {
          "numberValue": 0,
        }
      }
    }
    ```