# Birthday Invitation (Next.js)

A responsive birthday invitation built with Next.js and exported as a static site for GitHub Pages.

Live path once Pages is enabled:

```text
https://azkalhaq.github.io/kafi-4/
https://azkalhaq.github.io/kafi-4/?to=GuestName
```

## 1. Customise the invitation

Open `lib/invitation.ts` and edit the `invitation` object:

- Child's name
- Date and time
- Venue, map query, and Google Maps URL
- WhatsApp RSVP number and message
- Dress code
- Family message

Use the WhatsApp phone number in international format, digits only.  
Example for Indonesia: `6281234567890`.

## 2. Personalised guest link

Share a link with `?to=<name>` to personalise the greeting:

```text
https://azkalhaq.github.io/kafi-4/?to=Aisha
https://azkalhaq.github.io/kafi-4/?to=Uncle+Budi
```

The page shows “Dear Aisha,” and uses the name in the invitation heading and RSVP message.

## 3. Preview locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and try `/?to=YourName`.

To preview the GitHub Pages build (includes `/kafi-4` base path):

```bash
npm run build
npm start
```

Then open `http://localhost:3000/kafi-4/?to=YourName`.

## 4. Publish on GitHub Pages

1. Push this repository to GitHub (`azkalhaq/kafi-4`).
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).
5. The site will be available at:

```text
https://azkalhaq.github.io/kafi-4/
```

The Next.js config uses `output: "export"` with `basePath: "/kafi-4"` in production so assets resolve correctly under the repository subpath.

## Accessibility included

- Semantic headings and event details
- Keyboard-visible focus states
- Skip link and “View invitation” scroll CTA
- Embedded map with open-in-Maps fallback
- High-contrast controls
- Reduced-motion support
- Responsive layout
- Accommodation and dietary-arrangement note
