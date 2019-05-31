This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Zadatak

Potrebno je napraviti naslovnu stranu Hacker Newsa. Screenshot dizajna je u prilogu.

Aplikacija treba:

Da bude napisana u Reactu
Da se povezuje sa Hacker News APIjem
Da prikazuje listu od 20 najpopularnijih postova na Hacker Newsu
Da prikaže narednih 20 postova kada se klikne na "more" link na dnu liste
Da prilikom prelaska na drugu stranu prikazuje i "prev" link koji služi za vraćanje
Da automatski osvežava listu postova na svakih 30 sekundi
Da osveži listu pritiskom na refresh dugme
Da radi lepo na Chromeu u rezoluciji 1024px i šire

Bonus:

Responsive design, da se aplikacija lepo prikazuje i na mobilnim telefonima
Da linkovi ka komentarima otvaraju komentare na Hacker News sajtu
Da radi fino na svim browserima (zanemari IE)
Svi dodatni predlozi koje nismo napomenuli ovde

Na šta ćemo najviše obratiti pažnju:

Da li aplikacija radi
Struktura aplikacije
Komponente
Na koji način se koriste React lifecycle events
Organizacija koda

Na šta ne treba gubiti vreme:

Webpack config u ovom slučaju uopšte nije bitan, nema potrebe praviti savršen setup za aplikaciju
Redux, možeš ga koristiti ako želiš, ali i ako ga izostaviš nije od ključnog značaja za test
