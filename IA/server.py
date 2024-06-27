from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

model = joblib.load('model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:

        input_data = request.json

        reponsavel = input_data['reponsavel']
        projeto = input_data['projeto']
        jalon_Afetado = input_data['jalon_Afetado']

        data = [reponsavel, projeto, jalon_Afetado]
        prediction = model.predict([data])[0]

        return jsonify({'prediction': prediction}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)