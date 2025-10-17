# QuickPoll

**QuickPoll** is a simple Poll & Voting Dashboard built with React, Bootstrap and Chart.js.  
It uses your MockAPI endpoint to fetch polls and update votes.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. The app expects your polls resource to be available at:

```
https://68eb4b0976b3362414cd43c6.mockapi.io/polls
```

Each poll record should look like:
```json
{
  "id": "1",
  "question": "Which JavaScript framework do you prefer?",
  "options": ["React","Angular","Vue","Svelte"],
  "votes": [5,3,1,2]
}
```

## Notes
- Voting triggers a PUT request to update the poll record on MockAPI.
- To deploy to GitHub Pages, follow standard create-react-app deployment steps.

## Team
Raunak, Jinay — Subject: Web Technologies-ll
