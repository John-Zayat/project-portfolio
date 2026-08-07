# John Zayat Engineering Portfolio

This folder is a complete static website for GitHub Pages. It uses ordinary
HTML, CSS and JavaScript, so it does not need a paid server, database, build
command or package installation.

## Publish it with GitHub Pages

1. Download and extract `John-Zayat-Portfolio-GitHub-Pages.zip`.
2. Open your GitHub repository and select **Add file → Upload files**.
3. Upload the **contents** of the extracted folder. `index.html` must appear at
   the top level of the repository, not inside another folder.
4. Commit the files to the `main` branch.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Choose `main`, select `/ (root)`, then save.
8. GitHub will show the public URL after the deployment completes.

Every later upload/commit updates the same public URL. Anyone opening the URL
will see the most recently deployed version, even while it is still in progress.

## Test before publishing

The quick check is to double-click `index.html`. For the most accurate local
test, open a terminal inside the extracted folder and run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser. If Windows does not recognise
`python`, install Python or use the **Live Server** extension in Visual Studio
Code.

Check the site at both desktop and mobile widths. Test every navigation link,
the CV download, the LinkedIn link and the contact form.

## File structure

```text
index.html                  Home page
personal-projects.html      ARCHANGEL case study
university-projects.html    Group and solo university work
about.html                  Profile, capabilities and interests
contact.html                Static email-preparation form
styles.css                  All layout, colours and responsive styling
script.js                   Mobile menu, project tabs and contact form
assets/                     Images and John-Zayat-CV.pdf
```

## Replace prototype images

The current images were cropped from the supplied Squarespace screenshots. For
the sharpest final version, export the original images from Squarespace or your
computer, give each replacement the same filename, and overwrite the matching
file in `assets/`.

## Update contact details or text

The current email and LinkedIn details were taken from the supplied CV. To
change them, use Find and Replace across the five HTML files and `script.js`.

The contact form is intentionally compatible with free static hosting. It opens
the visitor's email application with their information pre-filled; it does not
store or transmit form data through the website. A serverless form service can
be connected later if an in-page confirmation is required.

## Recommended unfinished-site approach

Keep the Home, ARCHANGEL, About and Contact pages presentable. If a section is
not ready, remove its navigation/card link or label it **Case study in
development**. Avoid blank pages, placeholder text and broken buttons.
