from flask import Flask, request, jsonify
import joblib

# Initialize Flask application
app = Flask(__name__)

# Load the trained machine learning model
model = joblib.load('model.joblib')

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:

        input_data = request.json

        input1 = input_data['input1']
        input2 = input_data['input2']
        input3 = input_data['input3']
        input4 = input_data['input4']

        data = [input1, input2, input3, input4]
        prediction = model.predict([data])[0]

        # Return the prediction as a JSON response
        return jsonify({'prediction': prediction}), 200
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)