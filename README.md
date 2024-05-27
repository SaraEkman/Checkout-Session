# Systemstöd och integrations med 3-partssystem:

## Beskrivning
Detta projekt är en checkout-session för systemstöd och integration.
Man kan skapa en användare, genom att logga in så skapas en customer i Stripe, lista över alla produkter från Stripe där man kan lägga till produkter i en kundvagn, samt betala för produkterna i kundvagnen, genom att använda Stripe Checkout verifiering.

## Tekniker
- Node.js
- Express.js
- Stripe API
- Cookies
- Bcrypt
- React.js
- React-Router-Dom
- React-Context

## Starta backend
För att starta backend, följ dessa steg:

1. Öppna en terminal.
2. Navigera till rotmappen för projektet.
3. Skappa .env fil i backend mappen och lägg till följande med din Stripe API key t.ex:
    ```bash
   STRIPE_KEY=sk_test_51PAYOpP46Bs56q5ICROnzjwqLmHvMjuuQUT0n4V4bKW5yTRojaEf92XeCrLt75t97ft5q3Fnvlg9VKVkO8zmP2J400w9QtRILw
    ```
4. Kör följande kommando för att installera beroenden:
    ```bash
    npm install
    ```
5. Kör följande kommando för att starta bakänden:
    ```bash
    npm start
    ```

## Starta frontend
För att starta frontend, följ dessa steg:

1. Öppna en ny terminal.
2. Navigera till rotmappen för projektet.
3. Kör följande kommando för att installera beroenden:
    ```bash
    npm install
    ```
4. Kör följande kommando för att starta frontend:
    ```bash
    npm run dev
    ```