from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

preprocessor = joblib.load('IA/models/preprocessor.joblib')
model = joblib.load('IA/models/model.joblib')

# # Lista de valores válidos para a coluna 'jalon'
# valores_validos_jalon = ['CO']

# # Função para verificar se o valor de 'jalon' é válido
# def check_supported_jalon(value):
#     return value in valores_validos_jalon

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json

        area = input_data['area']
        projeto = input_data['projeto']
        jalon = input_data['jalon']

        problema = pd.DataFrame({
        'Área responsável pela identificação': [area],
        'Projeto': [projeto],
        'Jalón Afetado': [jalon],
        })

        print("Colunas do new_data:", problema.columns)
        print("Colunas esperadas:", preprocessor.transformers_[0][2])

        oneHotEncode = preprocessor.transform(problema)

        predictions = model.predict(oneHotEncode)
        predictions_list = predictions.tolist()

        return jsonify({'prediction': predictions_list,}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)