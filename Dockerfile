# Use the Docker image containing Ethereum security tools by Trail of Bits
FROM ghcr.io/trailofbits/eth-security-toolbox:nightly

# Create the working directory
WORKDIR /app

# Copy application files
COPY . .

# Install Python dependencies for Flask app
RUN pip install -r requirements.txt

# Expose the port Flask is accessible on
EXPOSE 5000

# Command to start the Flask application
CMD ["python3", "main.py"]