# React Developer - Code challenge

## Code Challenge

You are to develop a Football Manager app, where a team can be managed, players added, deleted or updated. And a view of the team’s formation is visible with the starters being shown in the field. Next you’ll be introduced to the challenge

![Screenshot_41](https://user-images.githubusercontent.com/60603371/207232735-a994a398-6e49-4b93-a49e-46291558edbd.png)

![Screenshot_42](https://user-images.githubusercontent.com/60603371/207232749-b0dfc6dc-0f4d-4ae5-9402-42c2387323f5.png)

## Challenge Resources

[Figma Prototype](https://www.figma.com/proto/Pi9hLcIryDsnlZxzTLA2HV/React-Challenge?embed_host=notion&kind=&node-id=2%3A66&page-id=0%3A1&scaling=contain&starting-point-node-id=2%3A66&viewport=1709%2C-370%2C0.55)

[Figma Design File](https://www.figma.com/file/Pi9hLcIryDsnlZxzTLA2HV/React-Challenge?node-id=0%3A1)

CSV Files: [psg-roster.csv]() and [psg-players-with-missing-field.csv]()


## Challenge rules

*   The data must be dynamically populated based on the imported file.
    *   There is no need for the data to persist, meaning no need to store it for use in between sessions
    *   Must demonstrate state management expertise


*   Adhere styling to the design reference (provided through Figma)
    *   Responsiveness is not required, your app will be tested on a 13-inch laptop

*   Component usage
    *   Feel free to use any component library you see fit to complete the challenge. The only exception is the Formation Overview, which should be fully custom made.

*   You must deploy you application using a solution of your choice (i.e. Netlify)
*   Share the source code via a private git repository (see Submission for details)



## Specifications

The specifications for each page and feature of the test are described in the Code Challenge video. However, here you’ll find written references for what was described there for each page:

### Roster Details
Here there are 4 features

1.  Editable Team Name
    *   If the name has not been changed before, the edit icon should be always visible
    *   After changing the name once, the icon should only be visible when hovering the name
2. Search field
    *   A search bar to filter players by name and/or position
    *   The search could filter based on the complete name or a substring
    *   It should handle keystrokes:
        *   `Enter`: Execute the search (same as clicking “search”);
        *   `Escape(ESC)`: Cancel the search and clear the criteria;
    *   After searching, clicking `x` should remove the search (and criteria) and show all results;
3. Roster Importer
    *   Error handling:
        *   Make sure the file contains no empty values, if one is found, return an error to the user;
    *   Ensure only .csv files can be used;
    *   If a valid file is shared, show a summary of counting the total players and count of each positions that would be added if the user accepts;
    *   Once accepted, the contents of the file should be stored in the application state;
    *   If there is already a roster added, the import button should change to “Re-Import”
        *   If used, the state should be cleared and refreshed with the new import;
4. Roster Table
    *   The Table should contain the data from the application state
        *   If the state is empty, show a message instead of the table;
    *   Along with the player name, include the country flag for the player
        *   You’ll find a column named `Flag Image` with a path to the required image;
    *   For `Height` and `Weight`, you’ll need to use the numbers to display a more readable value 
        *   (i.e. 180 → 1.80 m);
    *   Each row should have a actions menu, when used there would be the option to edit or delete a players
        *   When editing, ensure all fields are filled before allowing an edit;
        *   When deleting, ask if the user is sure before deleting;

### Formation Overview
There are 2 features:

1. Formation Preview
    *   The 4-3-3 formation should be displayed on the field. Where the players are positioned accordingly.
        *   For each player, display a circle with their jersey number and the player name;
    *   The code should check the starters of each position available on the roster:
        *   Goalkeeper, of which one is required;
        *   Defender, of which four are required;
        *   Midfielder, of which three are required;
        *   Forward, of which three are required;
    *   There are three conditions to display the formation:
        *   There is a roster;
        *   There are enough starters;
        *   There aren’t too many starters;
    *   If any of the conditions above are not met, show a respective message instead of the preview
        *   See the messages in Figma;

2. Player Details
    *   The user should see details about the players in the formation, by default the goalkeeper should be shown;
    *   The user could then click on a player to see their details;
    *   In the player detail, show the information and stats related to the player;
        *   For Goalkeepers the stats are `Clean Sheets` and `Saves`
        *   For the other positions: `Goals` and `Assists`
        *   All positions have `Appearance` and `Minutes Played`

