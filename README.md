<h1 align="center">Prepaid Trust</h1>

![PrepaidTrust Logo](https://github.com/songyuew/PrepaidTrust/blob/Keff-4/src/assets/images/logo/logo_light.png)

PrepaidTrust is a blockchain-based one-stop decentralised prepaid card platform to facilitate the issuance, purchase, transferring and consumption of prepaid cards.![process.png](https://github.com/songyuew/PrepaidTrust/blob/Keff-4/process.png)


## Usage
#### Using a ready-made built (recommended)
Download the latest release from the [releases page](https://github.com/zuramai/mazer/releases "releases page")
Open the index HTML file and explore the source code.
#### Building yourself
- Clone the repository `git clone https://github.com/zuramai/mazer`
- Install dependencies using the node package manager of your choice. For example run `npm install` 
- Files are bundled by Laravel Mix to the dist folder.
    - Either run `npm run hot` and open `http://localhost:8080` to see a hot-reloading copy of the generated files
    - Or run `npm run watch`  (rebuilds on file changes) or `npm run production` and open `index.html` in from the dist folder.

### Building with Docker
- Clone the repository `git clone https://github.com/zuramai/mazer`
- Make sure you have Docker installed and run:
    - `docker build -t mazer-frontend .`
    - `docker run -it -d -p 8080:80 --name mazer mazer-frontend`
    - Open `http://localhost:8080`

# Acknowledgement

- Template: [Mazer](https://github.com/zuramai/mazer), created by <a href="https://saugi.me">Saugi</a>.
