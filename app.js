const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');


const app = express();
const port = 3000;
apiUrl = 'https://7yrzrejnzl.execute-api.us-east-1.amazonaws.com/v1'; // Replace with your actual API endpoint

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.post('/submit', async (req, res) => {
    const inputValue = req.body.inputValue;
    const currentLength = inputValue.length;
    console.log(`Received input: ${inputValue}`);
    console.log(`Current length: ${currentLength}`);

    try {
        // Make 5 consecutive POST requests to your API endpoint with the input value
        
        const response = await axios.post(apiUrl, { "input": inputValue });
        console.log(`API Response:`, response.data);
	const indexContent = fs.readFileSync("./public/index.html", 'utf8');

      // Send the HTML content as the response
      res.send(indexContent);
        // Send a response to the client after 5 requests
        
    } catch (error) {
        // Handle errors
        console.error('Error sending data to API:', error.message);
        res.status(500).send('Error sending data to API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
