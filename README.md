# Birthday Invitation

A hero-themed birthday invitation (Spider-Man · Iron Man · Buzz Lightyear vibes) with a click-to-open envelope animation. Built for GitHub Pages — no build step, no dependencies.

## 1. Customise the invitation

Open `script.js` and edit the `invitation` object at the top:

- Child's name
- Date and time
- Venue and Google Maps URL
- WhatsApp RSVP number and message
- Dress code
- Family message

Use the WhatsApp phone number in international format, digits only.  
Example for Indonesia: `6281234567890`.

## 2. Personalise each guest link

Share a unique URL with `?to=Name`:

```text
https://YOUR-USERNAME.github.io/invitation-repo/?to=Maya
https://YOUR-USERNAME.github.io/invitation-repo/?to=Uncle%20Sam
```

That guest will see a greeting like “Hey Maya!”, a personalised invite label, and a WhatsApp RSVP message that includes their name.

## 3. Preview locally

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
http://localhost:8000/?to=Maya
```

Or open `index.html` directly in your browser.

## 4. Publish at username.github.io/invitation-repo/

1. Create a GitHub repository (e.g. `invitation-repo`, or rename this folder’s repo).
2. Push all files in this folder to the repository **root**.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then save.
6. Your invitation will be at:

```text
https://YOUR-USERNAME.github.io/invitation-repo/
```

CSS and JavaScript use relative paths (`./styles.css`, `./script.js`), so the page works from a repository subpath.

## 5. Upload using Git

```bash
git init
git add .
git commit -m "Create birthday invitation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/invitation-repo.git
git push -u origin main
```

Then enable GitHub Pages using step 3 above.

## How it works

1. Guests land on a sealed envelope page.
2. They click **Open Me** — the flap lifts and the invitation slides out.
3. Details, WhatsApp RSVP, map, and calendar download appear after opening.

Guests who prefer reduced motion see the invitation content immediately.
