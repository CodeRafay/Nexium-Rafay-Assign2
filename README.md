# Blog Summariser Web App

The Blog Summariser Web App is a full-stack web application built with Next.js 14+, Tailwind CSS, and Shadcn UI. It allows users to input a blog URL, scrape its content, generate a concise English summary using a keyword-based algorithm, translate the summary into Urdu, and save the data to Supabase (summaries) and MongoDB (full blog text). The app features a clean, responsive UI and is designed for ease of use, making it accessible for beginners and developers alike.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Live Demo](#live-demo)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Contact](#contact-information)
- [License](#license)

## Features

- **Blog Scraping**: Extracts text content from a provided blog URL using Cheerio.
- **AI Summary**: Generates a concise English summary using a keyword-based sentence selection algorithm.
- **Urdu Translation**: Translates the English summary into Urdu using a custom JavaScript dictionary, leaving unmatched words as-is.
- **Data Storage**:
  - Saves English and Urdu summaries to a Supabase table (`summaries`).
  - Stores the full blog text in a MongoDB collection (`fullblogs`).
- **Responsive UI**: Built with Shadcn UI and Tailwind CSS for a modern, user-friendly interface.
- **Error Handling**: Displays clear error messages for invalid URLs or processing failures.
- **Loading States**: Shows a spinner during data processing for better UX.

## Technologies

- **Frontend**:
  - Next.js 14+ (App Router)
  - React
  - Tailwind CSS
  - Shadcn UI (Input, Button, Card, Alert components)
- **Backend**:
  - Next.js API Routes
  - Cheerio (for web scraping)
  - Axios (for HTTP requests)
- **Database**:
  - Supabase (PostgreSQL) for storing summaries
  - MongoDB for storing full blog text
- **Other**:
  - JavaScript (no TypeScript)
  - Custom JavaScript dictionary for Urdu translation
  - Environment variables for configuration

---

## Live Demo

[View the Live App on Vercel]()

---

---

## Live Demo

[View the Live App on Vercel]()

---

## Project Structure

```
/blog-summariser/
├── /app/
│   ├── /api/
│   │   ├── /scrapeBlog/
│   │   │   └── route.js        # Scrapes blog content
│   │   ├── /summariseText/
│   │   │   └── route.js        # Generates English summary
│   │   ├── /translateToUrdu/
│   │   │   └── route.js        # Translates summary to Urdu
│   │   └── /saveData/
│   │       └── route.js        # Saves data to Supabase and MongoDB
│   ├── /components/
│   │   ├── URLInputForm.jsx    # Form for entering blog URL
│   │   ├── SummaryCard.jsx     # Displays scraped text and summaries
│   │   ├── LoadingSpinner.jsx  # Custom loading spinner
│   │   └── ErrorAlert.jsx      # Error message display
│   ├── globals.css             # Tailwind and Shadcn UI styles
│   ├── layout.jsx             # Root layout with global styles
│   ├── page.jsx               # Homepage with URL input
│   ├── /summary/
│   │   └── page.jsx            # Summary page with results
│
├── /components/
│   ├── /ui/
│   │   ├── input.jsx       # Shadcn UI Input component
│   │   ├── button.jsx      # Shadcn UI Button component
│   │   ├── card.jsx        # Shadcn UI Card component
│   │   └── alert.jsx       # Shadcn UI Alert component
├── /lib/
│   ├── mongo.js               # MongoDB client setup
│   └── supabase.js            # Supabase client setup
│   └── utils.js               #
├── /utils/                    # Optional utilities (not used)
├── /public/                   # Static assets
├── .env.local                 # Environment variables
├── components.json            # Shadcn UI configuration
├── package.json               # Dependencies and scripts
├── next.config.js             # Next.js configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

## Setup Instructions

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **Supabase Account**: Create a project at [supabase.com](https://supabase.com) to get `SUPABASE_URL` and `SUPABASE_KEY`.
- **MongoDB Atlas**: Set up a cluster at [mongodb.com](https://mongodb.com) to get `MONGO_URI`.

### Installation

1. **Clone the Repository** (if applicable):

   ```bash
   git clone <repository-url>
   cd blog-summariser
   ```

   Alternatively, create a new Next.js project:

   ```bash
   npx create-next-app@latest blog-summariser
   ```

   - Select: JavaScript, ESLint, Tailwind CSS, App Router, no src/ directory, `@/*` import alias.

2. **Install Dependencies**:

   ```bash
   npm install cheerio axios @supabase/supabase-js mongodb
   ```

3. **Set Up Shadcn UI**:

   ```bash
   npx shadcn-ui@latest init
   ```

   - Style: Default
   - Base color: Slate
   - CSS variables: Yes
   - TypeScript: No
   - Global CSS: `app/globals.css`
   - Tailwind config: `tailwind.config.js`
   - Import alias: Yes (`@/*`)

   Install required components:

   ```bash
   npx shadcn-ui@latest add input button card alert
   ```

4. **Configure Environment Variables**:

   - Create a `.env.local` file in the root directory:
     ```plaintext
     SUPABASE_URL=your-supabase-url
     SUPABASE_KEY=your-supabase-anon-key
     MONGO_URI=your-mongodb-uri
     ```
   - Replace placeholders with your Supabase and MongoDB credentials.

5. **Set Up Databases**:

   - **Supabase**:
     - Create a table named `summaries` with the following SQL:
       ```sql
       CREATE TABLE summaries (
         id SERIAL PRIMARY KEY,
         blog_url TEXT NOT NULL,
         summary_en TEXT NOT NULL,
         summary_urdu TEXT NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );
       ```
   - **MongoDB**:
     - Create a database named `blogdata` with a collection named `fullblogs`.

6. **Copy Project Files**:

   - Ensure all files from the provided structure (e.g., `app/`, `lib/`, `components.json`, etc.) are in place. Refer to the project structure above.

7. **Run the Application**:
   ```bash
   npm run dev
   ```
   - Open `http://localhost:3000` in your browser.

## Usage

1. **Homepage** (`http://localhost:3000`):

   - Enter a valid blog URL (e.g., a Medium article) in the input field.
   - Click the "Submit" button.
   - The app will scrape the blog, generate summaries, and redirect to the summary page.

2. **Summary Page** (`http://localhost:3000/summary?...`):

   - Displays:
     - A preview of the scraped blog text (truncated to 500 characters).
     - An English summary (5 sentences, keyword-based).
     - An Urdu translation of the summary.
     - A success message if data is saved to Supabase and MongoDB.
   - If an error occurs (e.g., invalid URL), an alert will display.

3. **Database Verification**:
   - Check Supabase (`summaries` table) for English and Urdu summaries.
   - Check MongoDB (`blogdata.fullblogs`) for the full blog text.

## How It Works

1. **User Input**:
   - The user enters a blog URL in the `URLInputForm` component on the homepage.
2. **Scraping**:
   - The URL is sent to `/api/scrapeBlog`, which uses Cheerio to extract paragraph text.
3. **Summarization**:
   - The scraped text is sent to `/api/summariseText`, which:
     - Splits text into sentences.
     - Removes stopwords and extracts keywords.
     - Scores sentences based on keyword frequency.
     - Selects the top 5 sentences as the summary.
4. **Translation**:
   - The English summary is sent to `/api/translateToUrdu`, which translates words using a custom dictionary, leaving unmatched words unchanged.
5. **Data Storage**:
   - The `/api/saveData` route saves:
     - English and Urdu summaries to Supabase (`summaries` table).
     - Full blog text to MongoDB (`fullblogs` collection).
6. **UI Display**:
   - The `SummaryCard` component displays the results using Shadcn UI’s `Card`.
   - Errors are shown via the `ErrorAlert` component.
   - A `LoadingSpinner` appears during processing.

## Database Schema

- **Supabase** (`summaries` table):
  ```sql
  id: SERIAL PRIMARY KEY
  blog_url: TEXT NOT NULL
  summary_en: TEXT NOT NULL
  summary_urdu: TEXT NOT NULL
  created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ```
- **MongoDB** (`fullblogs` collection):
  ```json
  {
    "_id": ObjectId,
    "blog_url": String,
    "full_text": String,
    "created_at": Date
  }
  ```

## Troubleshooting

- **Styles Not Applied**:
  - Ensure `app/globals.css` is imported in `app/layout.jsx`.
  - Verify `tailwind.config.js` includes `components/**/*.{js,jsx}` in the `content` array.
  - Run `npm run dev` to rebuild.
- **Urdu Text Misaligned**:
  - Check that `globals.css` includes:
    ```css
    @import url("https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap");
    [dir="rtl"] {
      direction: rtl;
      font-family: "Noto Nastaliq Urdu", sans-serif;
    }
    ```
  - Ensure `SummaryCard.jsx` has `dir="rtl"` on the Urdu summary `<p>` tag.
- **Database Errors**:
  - Verify `.env.local` has correct `SUPABASE_URL`, `SUPABASE_KEY`, and `MONGO_URI`.
  - Check Supabase and MongoDB dashboard for table/collection setup.
- **Scraping Issues**:
  - Some websites may block scraping. Test with simple blogs (e.g., Medium articles).
  - Consider using a headless browser like Puppeteer for complex sites (not implemented here).

## Future Enhancements

- **History Table**: Add a `HistoryTable` component to display past summaries from Supabase using Shadcn UI’s `Table` component (`npx shadcn-ui@latest add table`).
- **Expanded Dictionary**: Enhance the Urdu translation dictionary in `translateToUrdu/route.js` for better coverage.
- **Navigation Bar**: Add a header with a "Back to Home" link in `layout.jsx` using Shadcn UI’s `Button`.
- **Advanced Summarization**: Integrate a more sophisticated summarization algorithm (e.g., using an external API).
- **Error Retry**: Add retry logic for failed API calls.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Contact Information

For questions, feedback, or collaboration, please contact: [Rafay Adeel](mailto:rafayadeel1999@gmail.com)

## License

This project is licensed under the [Apache 2.0 License](LICENSE).
