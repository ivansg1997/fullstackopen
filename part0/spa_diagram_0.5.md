sequenceDiagram
    participant browser
    participant server

    Note right of browser: User access to spa URL
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: 200 OK, HTML document
    deactivate server

    Note right of browser: Browser requests JS file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: 200 OK, JS file
    deactivate server

    Note right of browser: Browser runs JS and get JSON data.
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: 200 OK, [{ "content": "Comment", "date": "2025-09-12T08:04:42.516Z" }, ... ]
    deactivate server

    Note right of browser: Browser renders the notes on the page