from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import tempfile
import os

app = Flask(__name__)

CORS(app, resources={r"/analyze": {"origins": "*"}})

@app.route('/analyze', methods=['POST'])
def analyze_solidity():
    code = request.data.decode()
    with tempfile.NamedTemporaryFile(delete=False, suffix='.sol', mode='w+') as temp_file:
        temp_file_path = temp_file.name
        temp_file.write(code)

    try:
        result = subprocess.run(['slither', temp_file_path], capture_output=True, text=True)
        os.remove(temp_file_path)
        
        combined_output = result.stdout + "\n" + result.stderr
        return jsonify({'result': combined_output})
    except Exception as e:
        print(f"Exception during Slither execution: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=int(os.getenv("PORT", 5000)))
