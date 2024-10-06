document.getElementById('url-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const originalUrl = document.getElementById('originalUrl').value;
    const shortUrl = document.getElementById('shortUrl').value;

    console.log('Original URL:', originalUrl);
    console.log('Short URL:', shortUrl);
    // Here you will later send a request to your backend to save the URL
});

git add .
git commit -m "Initial commit: Add landing, login, and signup pages"
git push origin main
