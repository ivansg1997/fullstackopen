sequenceDiagram
    participant browser
    participant server

    Note right of browser: User creates a new note and save.
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 Found
    deactivate server

    Note right of browser: The browser re-fetches the list of notes
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: 200 OK [{response}...]
    deactivate server
