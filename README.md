# Shui's Pounded Meal Generator

A web app that generates meal ideas based on the pounding technique inspired by global culinary traditions.

## About This Project

This is a simple, static web app that helps you generate meal ideas using the "Shui" method - using a mortar and pestle (or molcajete) to prepare ingredients through pounding, tearing, and crushing rather than chopping. The approach creates interesting textures, minimizes prep, and brings out unique flavors.

Features:
- Generate random meal ideas with a single click
- Filter by cuisine, protein, or flavor profile
- Save your favorite ideas for later
- Works offline after first visit
- Mobile-friendly design

## Live Demo

Visit the live version: [https://yourusername.github.io/pound-and-eat](https://yourusername.github.io/pound-and-eat)

## Deploying to GitHub Pages

Follow these steps to deploy this project to GitHub Pages:

1. **Fork or clone this repository**

   ```
   git clone https://github.com/yourusername/pound-and-eat.git
   cd pound-and-eat
   ```

2. **Create a GitHub repository**

   Create a new repository on your GitHub account.

3. **Push the code to your repository**

   ```
   git remote set-url origin https://github.com/yourusername/pound-and-eat.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**

   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "GitHub Pages" section
   - Select "main" branch as the source
   - Click "Save"

5. **Access your deployed site**

   Your site will be available at `https://yourusername.github.io/pound-and-eat`

## Local Development

To run this project locally:

1. Clone the repository
   ```
   git clone https://github.com/yourusername/pound-and-eat.git
   ```

2. Navigate to the project directory
   ```
   cd pound-and-eat
   ```

3. Open with a local server
   
   You can use any local web server. For example, with Python:
   ```
   python -m http.server 8000
   ```
   
   Or with Node.js:
   ```
   npx serve
   ```

4. Open your browser to `http://localhost:8000`

## Customizing

To customize the meal generator with your own components:

1. Edit `js/components.js` to add/modify:
   - Techniques
   - Cuisines
   - Proteins
   - Vegetables
   - Aromatics
   - Flavor profiles
   - Finishers
   - Eating vessels

2. Modify the workflow templates in the same file to create new patterns

## Credits

- Inspired by conversations about pounded Thai salads and global culinary techniques
- Designed for easy weeknight meal planning
- Based on Shui's cooking approach that prioritizes texture and reduces prep work

## License

MIT License 