sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes new content and clic on "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created, {"message":"note created"}
    deactivate server

    Note right of browser: The browser adds the new note to the list of notes displayed on the screen.