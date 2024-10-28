const general = require('./router/general.js');

const apiUrl = "https://raunosiimann-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai";
const books = general.getBooks(apiUrl);
const details1 = general.getBookDetailsByIsbn(apiUrl, "1");
const details2 = general.getBookDetailsByAuthor(apiUrl, "Jane Austen");
const details3 = general.getBookDetailsByTitle(apiUrl, "The Divine Comedy");
