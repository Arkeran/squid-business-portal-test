# How to run

Run `npm i`  
Run `npm start`

## Main TODOs / What would be my next steps

Change the components used for filtering: For a quick and simpler solution, I used pre-made components but they would need additional styling to avoid issues like the date picker jumping when there's a warning. The date range picker would most likely need to be a custom component to make it more streamlined with what I'd want exactly for this page.

Add an abort controller for the API calls: especially for the `/transactions` endpoint which is called every time the filter is changed.

Add `uid` for customers and transactions: I didn't want to alter the response format so I used `customername` for the filter but it's not reliable in a real-world situation.

Add unit tests: At least a first level of unit tests and then considering integration and e2e tests depending on the testing strategy we want to follow.

Remove inline css to make the code more readable and create some common components to help create a more cohesive style across the project.



