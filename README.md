# Solidity Analyzer

Solidity Analyzer is a web application that allows you to analyze Solidity code using Slither by Trail of Bits. This project consists of a Flask backend for code analysis and a React frontend for user interaction.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following dependencies installed:

- Docker
- Node.js and npm (for React UI)

### Installation

1. Clone this repository:

```bash
git clone https://github.com/web3xDev/SolidityAnalyzer.git
```

2. Build the Docker image:

```bash
docker build -t solidity-analyzer .
```

3. Run the Docker container:

```bash
docker run -d -p 5000:5000 solidity-analyzer
```

4. Install the React UI dependencies:

```bash
cd analyzer-ui
npm install
```

5. Start the React development server:

```bash
npm run dev
```

The web application should now be accessible at http://localhost:5173 in your web browser.

## Usage

- Enter your Solidity code in the provided textarea.
- Click the "Analyze" button to submit the code for analysis.
- The analysis results will be displayed on the right side of the page, categorized by INFO, Reference, and Warning. Any errors or issues will be displayed in the error section below.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them.
- Push your changes to your fork.
- Submit a pull request to the main repository.

## License

This project is licensed under the GNU Affero General Public License (AGPL) version 3.0 - see the LICENSE file for details.

## Acknowledgments

- Trail of Bits for the eth-security-toolbox
- Contributors who participate in the ongoing maintenance
- All the developers who contribute to the Solidity community
